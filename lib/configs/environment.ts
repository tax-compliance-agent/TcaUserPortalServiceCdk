import {StageName, VpcType} from "./types";
import * as logs from 'aws-cdk-lib/aws-logs';

export interface VpcConfig {
    cidr: string;
    maxAzs: number;
    enableNatGateway: boolean;
    enableVpcFlowLogs: boolean;
    logRetentionDays: logs.RetentionDays;
}

export interface EnvironmentConfig {
    accountId: string;
    stage: StageName;
    region: string;
    vpcConfigs: Record<VpcType, VpcConfig>;
    isProd: boolean;
}

export const ENVIRONMENT_CONFIGS: Record<StageName, EnvironmentConfig> = {
    [StageName.test]: {
        accountId: '076516536093',
        stage: StageName.test,
        region: 'me-central-1',
        vpcConfigs: {
            [VpcType.TCA_USER_PORTAL_VPC]: {
                cidr: "10.2.0.0/16",
                maxAzs: 3,
                enableNatGateway: true,
                enableVpcFlowLogs: true,
                logRetentionDays: logs.RetentionDays.ONE_YEAR,
            },
        },
        isProd: false,
    },
};
