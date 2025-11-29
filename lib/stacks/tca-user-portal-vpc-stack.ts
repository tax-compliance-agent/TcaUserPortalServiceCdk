import { Construct } from "constructs";
import { BaseStack, BaseStackProps } from "./base-stack";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as logs from "aws-cdk-lib/aws-logs";
import { RemovalPolicy } from "aws-cdk-lib";
import { ResourceUtils } from "../utils/resource-utils";
import { VpcType } from "../configs/types";

export interface TcaUserPortalVpcStackProps extends BaseStackProps {}

export class TcaUserPortalVpcStack extends BaseStack {
  public readonly vpc: ec2.Vpc;

  constructor(scope: Construct, id: string, props: TcaUserPortalVpcStackProps) {
    super(scope, id, props);

    const config = props.config;
    const vpcConfig = config.vpcConfigs[VpcType.TCA_USER_PORTAL_VPC];

    this.vpc = new ec2.Vpc(this, "TcaUserPortalVpc", {
      vpcName: ResourceUtils.getResourceName(
        "tca-user-portal-vpc",
        config.stage,
        config.region
      ),
      ipAddresses: ec2.IpAddresses.cidr(vpcConfig.cidr),
      maxAzs: vpcConfig.maxAzs,
      natGateways: vpcConfig.enableNatGateway ? 1 : 0,
      subnetConfiguration: [
        {
          cidrMask: 24,
          name: "Public",
          subnetType: ec2.SubnetType.PUBLIC,
        },
        {
          cidrMask: 24,
          name: "Private",
          subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS,
        },
      ],
    });

    if (vpcConfig.enableVpcFlowLogs) {
      const flowLogGroup = new logs.LogGroup(this, "TcaUserPortalVpcFlowLogGroup", {
        logGroupName: ResourceUtils.getResourceName(
          "/aws/vpc/tca-user-portal-vpc-flow-logs",
          config.stage,
          config.region
        ),
        retention: vpcConfig.logRetentionDays,
        removalPolicy: RemovalPolicy.RETAIN,
      });

      new ec2.FlowLog(this, "VpcFlowLog", {
        resourceType: ec2.FlowLogResourceType.fromVpc(this.vpc),
        destination: ec2.FlowLogDestination.toCloudWatchLogs(flowLogGroup),
        trafficType: ec2.FlowLogTrafficType.ALL,
        maxAggregationInterval: ec2.FlowLogMaxAggregationInterval.ONE_MINUTE,
      });
    }

    this.vpc.addInterfaceEndpoint("EcrApiEndpoint", {
      service: ec2.InterfaceVpcEndpointAwsService.ECR,
      subnets: {
        subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS,
      },
    });

    this.vpc.addInterfaceEndpoint("EcrDkrEndpoint", {
      service: ec2.InterfaceVpcEndpointAwsService.ECR_DOCKER,
      subnets: {
        subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS,
      },
    });

    this.vpc.addInterfaceEndpoint("CloudWatchLogsEndpoint", {
      service: ec2.InterfaceVpcEndpointAwsService.CLOUDWATCH_LOGS,
      subnets: {
        subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS,
      },
    });

    this.vpc.addInterfaceEndpoint("SecretsManagerEndpoint", {
      service: ec2.InterfaceVpcEndpointAwsService.SECRETS_MANAGER,
      subnets: {
        subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS,
      },
    });

    this.vpc.addInterfaceEndpoint("CloudWatchEndpoint", {
      service: ec2.InterfaceVpcEndpointAwsService.CLOUDWATCH_MONITORING,
      subnets: {
        subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS,
      },
    });

    this.vpc.addGatewayEndpoint("S3Endpoint", {
      service: ec2.GatewayVpcEndpointAwsService.S3,
    });

    this.vpc.addGatewayEndpoint("DynamoDbGatewayEndpoint", {
      service: ec2.GatewayVpcEndpointAwsService.DYNAMODB,
    });
  }
}
