# AWS Setup Guide for Abjad Application

## Prerequisites

1. **AWS Account**: Sign up at https://aws.amazon.com/
2. **AWS CLI**: Install from https://aws.amazon.com/cli/
3. **Node.js 18+**: Already installed
4. **AWS Amplify CLI**: Install globally

```bash
npm install -g @aws-amplify/cli
```

---

## Phase 1: Initial AWS Setup (30 minutes)

### Step 1.1: Create AWS Account
1. Go to https://aws.amazon.com/
2. Click "Create an AWS Account"
3. Enter email, password, AWS account name
4. Provide payment information (free tier available)
5. Verify phone number
6. Choose "Basic Support - Free" plan

### Step 1.2: Configure AWS CLI
```bash
# Configure AWS credentials
aws configure

# Enter when prompted:
# AWS Access Key ID: [Get from IAM Console]
# AWS Secret Access Key: [Get from IAM Console]
# Default region name: us-east-1
# Default output format: json
```

**To get Access Keys:**
1. Go to AWS Console → IAM → Users → Create User
2. Username: `abjad-admin`
3. Attach policies: `AdministratorAccess` (for development)
4. Create user → Security credentials → Create access key
5. Choose "CLI" → Create
6. Copy Access Key ID and Secret Access Key

### Step 1.3: Initialize Amplify
```bash
cd c:\Developer\Abjad\Abjad

# Configure Amplify
amplify configure

# This will:
# 1. Open AWS Console in browser
# 2. Ask you to create an IAM user
# 3. Generate access keys
# 4. Save credentials locally

# Initialize Amplify in your project
amplify init

# Answer prompts:
# ? Enter a name for the project: abjad
# ? Initialize the project with the above configuration? No
# ? Enter a name for the environment: dev
# ? Choose your default editor: Visual Studio Code
# ? Choose the type of app that you're building: javascript
# ? What javascript framework are you using: react
# ? Source Directory Path: src
# ? Distribution Directory Path: dist
# ? Build Command: npm run build
# ? Start Command: npm run dev
# ? Select the authentication method: AWS profile
# ? Please choose the profile you want to use: default
```

---

## Phase 2: Authentication with Amazon Cognito (45 minutes)

### Step 2.1: Add Amplify Auth
```bash
# Add authentication
amplify add auth

# Configuration:
# ? Do you want to use the default authentication and security configuration? Default configuration
# ? How do you want users to be able to sign in? Email
# ? Do you want to configure advanced settings? No, I am done
```

### Step 2.2: Install Amplify Libraries
```bash
npm install aws-amplify @aws-amplify/ui-react
```

### Step 2.3: Deploy Auth Backend
```bash
amplify push

# Confirm:
# ? Are you sure you want to continue? Yes
```

---

## Phase 3: API & Database Setup (1 hour)

### Step 3.1: Add GraphQL API with DynamoDB
```bash
# Add API
amplify add api

# Configuration:
# ? Select from one of the below mentioned services: GraphQL
# ? Here is the GraphQL API that we will create: abjad-api
# ? Choose a schema template: Single object with fields
# ? Do you want to edit the schema now? Yes
```

This will open the schema file. We'll configure it in the next step.

### Step 3.2: Add Storage (S3)
```bash
# Add storage for receipts and images
amplify add storage

# Configuration:
# ? Select from one of the below mentioned services: Content (Images, audio, video, etc.)
# ? Provide a friendly name for your resource: abjadStorage
# ? Provide bucket name: abjad-receipts-images
# ? Who should have access: Auth users only
# ? What kind of access do you want for Authenticated users? create/update, read, delete
```

### Step 3.3: Push All Backend Resources
```bash
amplify push

# This will:
# - Create DynamoDB tables
# - Set up AppSync GraphQL API
# - Create S3 bucket
# - Configure IAM roles
```

---

## Phase 4: Email Notifications (30 minutes)

### Step 4.1: Set Up Amazon SES
```bash
# Add function for email sending
amplify add function

# Configuration:
# ? Select which capability you want to add: Lambda function
# ? Provide an AWS Lambda function name: abjadEmailSender
# ? Choose the runtime: NodeJS
# ? Choose the function template: Hello World
# ? Do you want to configure advanced settings? Yes
# ? Do you want to access other resources in this project? No
# ? Do you want to invoke this function on a recurring schedule? No
# ? Do you want to enable Lambda layers? No
# ? Do you want to configure environment variables? Yes
# ? Enter the environment variable name: SES_EMAIL
# ? Enter the environment variable value: fulan.alfulani@example.com
# ? Select what you want to do next: I'm done
```

### Step 4.2: Verify SES Email
1. Go to AWS Console → Amazon SES
2. Click "Verified identities"
3. Click "Create identity"
4. Identity type: Email address
5. Enter: your-email@example.com
6. Create identity
7. Check email and click verification link

**Note**: SES starts in sandbox mode. To send to any email:
1. Request production access in SES console
2. Fill out the questionnaire
3. Usually approved within 24 hours

---

## Phase 5: Frontend Deployment (30 minutes)

### Option A: Deploy with AWS Amplify Hosting (Recommended)
```bash
# Add hosting
amplify add hosting

# Configuration:
# ? Select the plugin module to execute: Hosting with Amplify Console
# ? Choose a type: Manual deployment

# Publish the app
amplify publish

# This will:
# - Build your React app
# - Upload to Amplify hosting
# - Provide you with a URL (e.g., https://dev.d1234.amplifyapp.com)
```

### Option B: Deploy with S3 + CloudFront (Manual)
```bash
# Build the app
npm run build

# Create S3 bucket
aws s3 mb s3://abjad-app-frontend --region us-east-1

# Enable static website hosting
aws s3 website s3://abjad-app-frontend --index-document index.html --error-document index.html

# Upload files
aws s3 sync dist/ s3://abjad-app-frontend --acl public-read

# Your app will be at: http://abjad-app-frontend.s3-website-us-east-1.amazonaws.com
```

---

## Phase 6: Database Schema Design

Your DynamoDB tables will be:

### Table 1: Users
- **PK**: userId (String)
- **Attributes**: email, name, nameAr, phone, role, avatar, canViewBills, canManageMembers

### Table 2: Rooms
- **PK**: userId#roomId (String)
- **SK**: timestamp (Number)
- **Attributes**: name, x, y, width, height, status

### Table 3: Tasks
- **PK**: userId#roomId (String)
- **SK**: taskId (String)
- **GSI**: assignedTo-index (for filtering by user)
- **Attributes**: title, type, status, priority, assignedTo, estimatedTime, createdAt

### Table 4: HouseholdTasks
- **PK**: userId#taskId (String)
- **Attributes**: title, titleAr, type, assignedTo, dueDate, amount, priority, status

### Table 5: Tickets
- **PK**: userId#ticketId (String)
- **Attributes**: from, title, description, status, priority, createdAt

### Table 6: Assets
- **PK**: userId#assetId (String)
- **Attributes**: name, category, location, purchaseDate, warranty, value

### Table 7: MarketplaceBookings
- **PK**: userId#bookingId (String)
- **Attributes**: serviceId, serviceName, date, time, price, status

---

## Phase 7: Estimated AWS Costs

### Free Tier (First 12 months):
- **S3**: 5GB storage, 20,000 GET requests, 2,000 PUT requests
- **Lambda**: 1M requests/month, 400,000 GB-seconds compute
- **DynamoDB**: 25GB storage, 25 read/write capacity units
- **Cognito**: 50,000 MAUs (Monthly Active Users)
- **API Gateway**: 1M API calls/month
- **CloudWatch**: 10 custom metrics, 5GB logs
- **SES**: 62,000 emails/month (from EC2)

### After Free Tier (Estimated for 100 users):
- **Amplify Hosting**: ~$15-20/month
- **DynamoDB**: ~$5-10/month
- **S3**: ~$1-5/month
- **Lambda**: ~$0-5/month (with free tier)
- **Cognito**: Free up to 50k users
- **SES**: $0.10 per 1,000 emails
- **CloudWatch**: ~$5/month

**Total estimated cost**: $25-50/month for 100 active users

---

## Phase 8: Security Best Practices

### 8.1: Enable MFA on Root Account
1. AWS Console → IAM → Dashboard
2. Security recommendations → Add MFA
3. Use Google Authenticator or Authy

### 8.2: Create Separate IAM Users
Never use root account for daily operations:
```bash
# Create developer user
aws iam create-user --user-name abjad-developer

# Attach policies
aws iam attach-user-policy --user-name abjad-developer --policy-arn arn:aws:iam::aws:policy/PowerUserAccess
```

### 8.3: Enable CloudTrail
1. AWS Console → CloudTrail
2. Create trail
3. Enable for all regions
4. Store logs in S3

### 8.4: Set Up Budget Alerts
1. AWS Console → Billing → Budgets
2. Create budget
3. Set monthly limit (e.g., $50)
4. Add email alerts at 50%, 80%, 100%

---

## Phase 9: Monitoring & Logging

### 9.1: CloudWatch Dashboards
```bash
# View logs
aws logs tail /aws/lambda/abjadEmailSender --follow

# Create dashboard
aws cloudwatch put-dashboard --dashboard-name AbjadMonitoring --dashboard-body file://dashboard.json
```

### 9.2: Set Up Alarms
```bash
# Alarm for API errors
aws cloudwatch put-metric-alarm \
  --alarm-name abjad-api-errors \
  --alarm-description "Alert when API error rate is high" \
  --metric-name 5XXError \
  --namespace AWS/ApiGateway \
  --statistic Sum \
  --period 300 \
  --evaluation-periods 1 \
  --threshold 10 \
  --comparison-operator GreaterThanThreshold
```

---

## Phase 10: CI/CD Pipeline (Optional)

### 10.1: GitHub Actions Integration
Amplify Console can automatically deploy when you push to GitHub:

1. Connect your GitHub repository
2. Amplify will auto-detect build settings
3. Every git push triggers a new deployment

### 10.2: Multiple Environments
```bash
# Create production environment
amplify env add

# Configuration:
# ? Do you want to use an existing environment? No
# ? Enter a name for the environment: prod
# ? Select the authentication method: AWS profile

# Deploy to production
amplify publish --environment prod
```

---

## Quick Start Commands Summary

```bash
# 1. Install Amplify CLI
npm install -g @aws-amplify/cli

# 2. Configure Amplify
amplify configure

# 3. Initialize project
cd c:\Developer\Abjad\Abjad
amplify init

# 4. Add authentication
amplify add auth

# 5. Add API and database
amplify add api

# 6. Add storage
amplify add storage

# 7. Add email function
amplify add function

# 8. Deploy everything
amplify push

# 9. Add hosting
amplify add hosting

# 10. Publish app
amplify publish
```

---

## Troubleshooting

### Issue: "AWS CLI not found"
```bash
# Windows
choco install awscli

# Or download from: https://aws.amazon.com/cli/
```

### Issue: "Region not supported"
Use one of these regions:
- us-east-1 (N. Virginia) - Recommended
- eu-west-1 (Ireland)
- ap-southeast-1 (Singapore)

### Issue: "Amplify command not found"
```bash
npm install -g @aws-amplify/cli --force
```

### Issue: "Authentication failed"
```bash
# Reconfigure AWS credentials
aws configure
amplify configure
```

---

## Next Steps

After AWS setup, you'll need to:
1. Update React components to use Amplify Auth
2. Replace mock data with API calls
3. Implement file upload to S3
4. Set up email notifications
5. Test thoroughly
6. Launch! 🚀

See `BACKEND_INTEGRATION.md` for code examples.
