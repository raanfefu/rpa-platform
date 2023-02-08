import * as cdk from 'aws-cdk-lib';
import { Duration } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { bots } from '../assets/cfg/config.json' 
import { RpaBotInstanceStack } from './rpa-bot-instance-stack';

export class RpaPlatformStack extends cdk.Stack {
  constructor(scope: Construct, id: string, sprops?: cdk.StackProps) {
    super(scope, id, sprops);

    const props : any = sprops?.env;
    
    


    bots.forEach( e => {
      new RpaBotInstanceStack( this, `bot-${e.name}-stack`, {
        ...props
      })
    });

    
  }
}
