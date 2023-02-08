import * as cdk from 'aws-cdk-lib';
import { NestedStack } from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class RpaBotInstanceStack extends NestedStack {
  constructor(scope: Construct, id: string, sprops?: cdk.NestedStackProps) {
    super(scope, id, sprops);
    
  }
}
