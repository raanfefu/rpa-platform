import * as cdk from 'aws-cdk-lib';
import { Duration } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { bots } from '../assets/cfg/config.json' 
import { RpaBotInstanceStack } from './rpa-bot-instance-stack';

export class RpaPlatformStack extends cdk.Stack {
  constructor(scope: Construct, id: string, sprops?: cdk.StackProps) {
    super(scope, id, sprops);

    const props : any = sprops?.env;

    const SQSQueue = new cdk.aws_sqs.Queue(this, `${props['CDK_PARAM_PROJECT']}-sqs-${props['CDK_PARAM_ENVIRONMENT']}`, {
      queueName: `${props['CDK_PARAM_PROJECT']}-sqs-${props['CDK_PARAM_ENVIRONMENT']}`,
      visibilityTimeout: Duration.seconds(300)
    });

    bots.forEach( e => {
      new RpaBotInstanceStack( this, `rpa-platform-bot-${e.name}-stack`,{
        stackName:  `rpa-platform-bot-${e.name}-stack`,
        env: {
          region: props['CDK_DEPLOY_REGION'],
          account: props['CDK_DEPLOY_ACCOUNT'],
          ... props
        },
      })
    });

    
  }
}
