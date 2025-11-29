import { App } from 'aws-cdk-lib';
import { TcaUserPortalVpcStack } from '../lib/stacks/tca-user-portal-vpc-stack';
import { mockConfig } from './mock';
import * as ec2 from 'aws-cdk-lib/aws-ec2';

describe('TcaUserPortalVpcStack', () => {
    let stack: TcaUserPortalVpcStack;

    beforeAll(() => {
        const app = new App();
        
        stack = new TcaUserPortalVpcStack(app, 'TestVpcStack', {
            config: mockConfig,
            env: { account: mockConfig.accountId, region: mockConfig.region },
        });
    });

    it('should create a VPC', () => {
        expect(stack.vpc).toBeDefined();
        expect(stack.vpc).toBeInstanceOf(ec2.Vpc);
    });
});
