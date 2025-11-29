import * as cdk from "aws-cdk-lib";
import { ENVIRONMENT_CONFIGS, EnvironmentConfig } from "./configs/environment";
import { TcaUserPortalVpcStack } from "./stacks/tca-user-portal-vpc-stack";

const app = new cdk.App();

Object.values(ENVIRONMENT_CONFIGS).forEach((config) => {
  createStacksForEnvironment(app, config);
});

function createStacksForEnvironment(
  app: cdk.App,
  config: EnvironmentConfig
): void {
  const baseProps = {
    env: {
      account: config.accountId,
      region: config.region,
    },
    config,
  };

  new TcaUserPortalVpcStack(app, `TcaUserPortalVpcStack-${config.stage}`, {
      ...baseProps,
      description: `TCA User Portal VPC for ${config.stage} environment`,
  });
}