import { Duration, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { SubnetType, Vpc } from "aws-cdk-lib/aws-ec2";
import { Cluster, ContainerImage, FargatePlatformVersion, LogDriver } from "aws-cdk-lib/aws-ecs";
import { ScheduledFargateTask } from "aws-cdk-lib/aws-ecs-patterns";
import { Repository } from "aws-cdk-lib/aws-ecr";
import { Schedule } from "aws-cdk-lib/aws-events";
import * as kms from 'aws-cdk-lib/aws-kms';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as ecr from 'aws-cdk-lib/aws-ecr';

export class CdkEcsScheduledTaskStack extends Stack {

    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        //Creating the VPC
        const vpc = new Vpc(this, 'VPCForECS', {
            maxAzs: 1,
            natGateways: 1
        });

        //Creating the S3 Bucket
        const S3Data = new s3.Bucket(this, "S3DataTaken", {
            bucketName: "S3Data",
            accessControl: s3.BucketAccessControl.PRIVATE,
            encryption: s3.BucketEncryption.S3_MANAGED,
            versioned: false,
            blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
            encryptionKey: new kms.Key(this, 's3BucketKMSKey')
        });

        // Provision ECR Repository - Note if the repo contains an image inside the destroy process will not succeed, then should be destroyed manually
        const ecrRepo = new ecr.Repository(this, 'ECRRepo', {
            repositoryName: 'ecr-repo'
          });
    
        const SQSQueue = new sqs.Queue(this, 'SQSQueue', {
            visibilityTimeout: Duration.seconds(300)
        });

        //Creating the ECS cluster 
        const cluster = new Cluster(this, 'ECSCluster', {
            vpc
        });

        //Creating a Fargate schedueld task
        const scheduledTask = new ScheduledFargateTask(this, 'ScheduledTask', {
            cluster: cluster,
            platformVersion: FargatePlatformVersion.LATEST,
            desiredTaskCount: 1,
            schedule: Schedule.expression('cron(0/10 * * * ? *)'),
            subnetSelection: { subnetType: SubnetType.PRIVATE_WITH_EGRESS },
            scheduledFargateTaskImageOptions: {
                image: ContainerImage.fromEcrRepository(Repository.fromRepositoryName(this, `ECR-Image`, 'test-cron-job')),
                memoryLimitMiB: 512,
                cpu: 256,
                command: ['node', 'app.js', 'exit'],
                logDriver: LogDriver.awsLogs({ streamPrefix: 'ScheduledTaskLogs' })
            }
        });
    }
}
