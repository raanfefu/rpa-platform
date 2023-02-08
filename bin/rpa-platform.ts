#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { RpaPlatformStack } from '../lib/rpa-platform-stack';


const cdk_environment : any = {}
Object.keys(process.env)
      .map( k => cdk_environment[k] = process.env[k] )

const app = new cdk.App();

const platform = new RpaPlatformStack(app, 'rpa-platform-stack', {
  stackName:  `${process.env['CDK_PARAM_PROJECT']}-stack-${process.env['CDK_PARAM_ENVIRONMENT']}`,
  env: {
    region: process.env['CDK_DEPLOY_REGION'],
    account: process.env['CDK_DEPLOY_ACCOUNT'],
    ... cdk_environment
  },
});




