import * as logs from 'aws-cdk-lib/aws-logs';
import {StageName, VpcType} from '../lib/configs/types';
import {EnvironmentConfig} from '../lib/configs/environment';

export const mockConfig: EnvironmentConfig = {
    accountId: '123456789012',
    stage: StageName.test,
    region: 'us-east-1',
    isProd: false,
    vpcConfigs: {
        [VpcType.TCA_USER_PORTAL_VPC]: {
            cidr: '10.3.0.0/16',
            maxAzs: 2,
            enableNatGateway: true,
            enableVpcFlowLogs: true,
            logRetentionDays: logs.RetentionDays.ONE_WEEK,
        },
    },
};
