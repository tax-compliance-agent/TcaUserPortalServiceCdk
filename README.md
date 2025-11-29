# TCA User Portal Service CDK

AWS CDK infrastructure for TCA User Portal Service.

## Prerequisites

- Node.js (v24+)
- Install AWS CLI -> `brew install awscli`
- AWS CLI with credentials: `aws configure` (use --profile, if configured)
- CDK CLI: `npm install -g aws-cdk`

### Multiple AWS Accounts

```bash
# Set up profiles for different accounts
aws configure --profile tca-dev-account
aws configure --profile tca-prod-account

# Use specific profile
cdk deploy {stack-name} --profile dev-account
cdk bootstrap --profile prod-account
```

## Setup

```bash
npm install
```

## Build

```bash
npm run build
```

## Deploy

```bash
# Deploy to test environment
cdk deploy --all --profile <your-profile>

# Deploy specific stack
cdk deploy TcaUserPortalVpcStack-test --profile <your-profile>
```

## Useful Commands

- `npm run build` - Build (auto-installs dependencies)
- `npm run build:clean` - Clean build artifacts then build
- `npm run build:clean-all` - Remove everything including node_modules then build
- `npm run clean` - Remove dist/ and build/ directories
- `npm run clean:all` - Remove everything including node_modules
- `npm run watch` - Watch for changes and rebuild automatically
- `cdk diff` - Compare deployed stack with current state
- `cdk synth` - Emit the synthesized CloudFormation template
- `cdk list` - List all the stacks
