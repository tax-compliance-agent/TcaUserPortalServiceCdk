import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { EnvironmentConfig } from "../configs/environment";

export interface BaseStackProps extends StackProps {
  config: EnvironmentConfig;
}

export abstract class BaseStack extends Stack {
  constructor(scope: Construct, id: string, props: BaseStackProps) {
    const stackName = `${id}-${props.config.region}`;

    super(scope, id, {
      ...props,
      stackName,
      tags: {
        Stage: props.config.stage,
        Project: "tca-user-portal",
        Component: id,
        ...(props.tags || {}),
      },
    });
  }
}
