# AWS Deployment Checklist for Abjad

## Pre-Deployment Checklist

### ✅ Phase 1: Account Setup (Day 1)

- [ ] **Create AWS Account**
  - [ ] Sign up at https://aws.amazon.com/
  - [ ] Verify email address
  - [ ] Add payment method (credit/debit card)
  - [ ] Set up billing alerts ($50, $100, $200)
  - [ ] Enable MFA on root account

- [ ] **Create IAM Admin User**
  - [ ] Go to IAM → Users → Create user
  - [ ] Username: `abjad-admin`
  - [ ] Attach `AdministratorAccess` policy
  - [ ] Create access key for CLI
  - [ ] Save credentials securely (use password manager)
  - [ ] Enable MFA on admin user

- [ ] **Install Required Tools**
  ```bash
  # Check if installed:
  node --version    # Should be 18+
  npm --version     # Should be 9+
  git --version

  # Install AWS CLI
  # Windows: choco install awscli
  # Mac: brew install awscli
  # Linux: sudo apt install awscli

  # Install Amplify CLI
  npm install -g @aws-amplify/cli

  # Verify installations
  aws --version
  amplify --version
  ```

- [ ] **Configure AWS CLI**
  ```bash
  aws configure
  # Enter Access Key ID
  # Enter Secret Access Key
  # Region: us-east-1
  # Output: json

  # Test connection
  aws sts get-caller-identity
  ```

---

### ✅ Phase 2: Amplify Setup (Day 1-2)

- [ ] **Configure Amplify**
  ```bash
  amplify configure
  # Follow prompts to create IAM user for Amplify
  # Save credentials
  ```

- [ ] **Initialize Amplify Project**
  ```bash
  cd c:\Developer\Abjad\Abjad
  amplify init

  # Project name: abjad
  # Environment: dev
  # Editor: Visual Studio Code
  # App type: javascript
  # Framework: react
  # Source dir: src
  # Distribution dir: dist
  # Build command: npm run build
  # Start command: npm run dev
  ```

- [ ] **Verify Amplify Setup**
  ```bash
  # Check created resources
  amplify status

  # Should show:
  # | Category | Resource name | Operation | Provider plugin |
  # | -------- | ------------- | --------- | --------------- |
  ```

---

### ✅ Phase 3: Authentication (Day 2)

- [ ] **Add Cognito Authentication**
  ```bash
  amplify add auth
  # Use default configuration
  # Sign in: Email
  # No advanced settings
  ```

- [ ] **Deploy Authentication**
  ```bash
  amplify push
  # Review changes
  # Confirm: Yes
  # Wait for deployment (5-10 minutes)
  ```

- [ ] **Install Amplify Libraries**
  ```bash
  npm install aws-amplify @aws-amplify/ui-react
  ```

- [ ] **Copy Generated Config**
  - [ ] File created: `src/aws-exports.js`
  - [ ] Add to `.gitignore`: `aws-exports.js`
  - [ ] Import in `src/main.jsx` or `src/App.jsx`

- [ ] **Test Authentication**
  - [ ] Create test user via Cognito console
  - [ ] Verify email works
  - [ ] Test login flow
  - [ ] Test logout
  - [ ] Test password reset

---

### ✅ Phase 4: Database & API (Day 3-4)

- [ ] **Add GraphQL API**
  ```bash
  amplify add api
  # GraphQL
  # API name: abjadapi
  # Authorization: Amazon Cognito User Pool
  # Edit schema: Yes
  ```

- [ ] **Configure Schema**
  - [ ] Copy schema from `BACKEND_INTEGRATION.md`
  - [ ] Save `amplify/backend/api/abjadapi/schema.graphql`
  - [ ] Review relationships
  - [ ] Add indexes for queries

- [ ] **Deploy API**
  ```bash
  amplify push
  # Generate code: Yes
  # Code generation language: javascript
  # File pattern: src/graphql/**/*.js
  # Max depth: 2
  ```

- [ ] **Test API**
  ```bash
  # Open AppSync console
  # Go to Queries tab
  # Run test mutation:
  mutation CreateTestRoom {
    createRoom(input: {
      name: "Living Room"
      x: 50
      y: 50
      width: 200
      height: 150
      status: "active"
    }) {
      id
      name
    }
  }
  ```

---

### ✅ Phase 5: Storage (Day 4)

- [ ] **Add S3 Storage**
  ```bash
  amplify add storage
  # Content (Images, audio, video)
  # Resource name: abjadstorage
  # Bucket name: abjad-receipts-images
  # Auth users only
  # Access: create/update, read, delete
  ```

- [ ] **Deploy Storage**
  ```bash
  amplify push
  ```

- [ ] **Test File Upload**
  - [ ] Upload test image via console
  - [ ] Verify file appears in S3 bucket
  - [ ] Test file download
  - [ ] Test file deletion

---

### ✅ Phase 6: Email Notifications (Day 5)

- [ ] **Verify Email in SES**
  - [ ] Go to SES Console
  - [ ] Verify identity: your-email@example.com
  - [ ] Click verification link in email
  - [ ] Test send email

- [ ] **Add Lambda Function**
  ```bash
  amplify add function
  # Function name: abjadEmailSender
  # Runtime: NodeJS
  # Template: Hello World
  # Advanced settings: Yes
  # Access other resources: No
  # Environment variables: Yes
  # Variable: SES_EMAIL = your-verified-email@example.com
  ```

- [ ] **Update Lambda Code**
  - [ ] Edit `amplify/backend/function/abjadEmailSender/src/index.js`
  - [ ] Add SES send email logic
  - [ ] Save and deploy

- [ ] **Deploy Function**
  ```bash
  amplify push
  ```

- [ ] **Request SES Production Access**
  - [ ] SES Console → Account dashboard
  - [ ] Request production access
  - [ ] Fill questionnaire
  - [ ] Wait for approval (24-48 hours)

---

### ✅ Phase 7: Frontend Integration (Day 6-7)

- [ ] **Update React Code**
  - [ ] Create `src/aws-config.js`
  - [ ] Create auth components (`LoginForm.jsx`, `SignUpForm.jsx`)
  - [ ] Create API service layer (`src/services/api.js`)
  - [ ] Create storage service (`src/services/storage.js`)
  - [ ] Update existing components to use real data

- [ ] **Replace Mock Data**
  - [x] ~~DigitalTwin.jsx~~ → Use `fetchRooms()` from API
  - [x] ~~Tasks.jsx~~ → Use `fetchTasks()` from API
  - [x] ~~Assets.jsx~~ → Use `fetchAssets()` from API
  - [x] ~~Marketplace.jsx~~ → Store bookings in DynamoDB
  - [x] ~~Cart.jsx~~ → Process orders via API
  - [x] ~~Account.jsx~~ → Fetch user data from Cognito

- [ ] **Test All Features**
  - [ ] User registration
  - [ ] Login/logout
  - [ ] Create room
  - [ ] Add task
  - [ ] Complete task
  - [ ] Upload receipt
  - [ ] Book service
  - [ ] Send email notification

---

### ✅ Phase 8: Hosting & Deployment (Day 8)

- [ ] **Add Hosting**
  ```bash
  amplify add hosting
  # Amplify Console
  # Manual deployment
  ```

- [ ] **Build & Deploy**
  ```bash
  # Build the app
  npm run build

  # Publish to Amplify
  amplify publish

  # Wait for deployment (5-10 minutes)
  # Note the URL: https://dev.dXXXXXXXXX.amplifyapp.com
  ```

- [ ] **Configure Custom Domain (Optional)**
  - [ ] Buy domain (Namecheap, GoDaddy, Route 53)
  - [ ] Amplify Console → Domain management
  - [ ] Add domain: abjad.app
  - [ ] Wait for DNS propagation (15-60 minutes)
  - [ ] Verify SSL certificate

- [ ] **Update CORS & Redirects**
  - [ ] API Gateway → CORS settings
  - [ ] Allow origin: https://your-domain.com
  - [ ] Add redirects in Amplify console for SPA routing

---

### ✅ Phase 9: Security Hardening (Day 9)

- [ ] **Enable CloudTrail**
  - [ ] CloudTrail Console → Create trail
  - [ ] Name: abjad-audit-trail
  - [ ] Apply to all regions: Yes
  - [ ] S3 bucket: Create new
  - [ ] Enable log file validation

- [ ] **Set Up WAF (Web Application Firewall)**
  - [ ] WAF Console → Create web ACL
  - [ ] Associate with API Gateway
  - [ ] Add rate limiting rule (1000 req/5min)
  - [ ] Add geo-blocking if needed
  - [ ] Enable logging

- [ ] **Configure Security Headers**
  ```javascript
  // In Amplify Console → Rewrites and redirects
  // Add custom headers:
  {
    "headers": {
      "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "DENY",
      "X-XSS-Protection": "1; mode=block",
      "Referrer-Policy": "strict-origin-when-cross-origin"
    }
  }
  ```

- [ ] **Enable MFA for All Users**
  - [ ] Cognito → User Pool → MFA
  - [ ] Enable optional MFA
  - [ ] SMS or TOTP

- [ ] **Review IAM Policies**
  - [ ] Remove unused permissions
  - [ ] Apply least privilege principle
  - [ ] Rotate access keys

---

### ✅ Phase 10: Monitoring & Alerts (Day 10)

- [ ] **CloudWatch Dashboard**
  - [ ] Create dashboard: Abjad-Production
  - [ ] Add widgets:
    - [ ] API Gateway request count
    - [ ] Lambda errors
    - [ ] DynamoDB throttles
    - [ ] Cognito sign-ups
    - [ ] S3 bucket size

- [ ] **Set Up Alarms**
  ```bash
  # High API error rate
  aws cloudwatch put-metric-alarm \
    --alarm-name abjad-api-errors \
    --metric-name 5XXError \
    --namespace AWS/ApiGateway \
    --statistic Sum \
    --period 300 \
    --threshold 10 \
    --comparison-operator GreaterThanThreshold

  # High Lambda duration
  aws cloudwatch put-metric-alarm \
    --alarm-name abjad-lambda-slow \
    --metric-name Duration \
    --namespace AWS/Lambda \
    --statistic Average \
    --period 60 \
    --threshold 3000 \
    --comparison-operator GreaterThanThreshold
  ```

- [ ] **Enable X-Ray Tracing**
  - [ ] Lambda → Configuration → Monitoring
  - [ ] Enable active tracing
  - [ ] View traces in X-Ray console

- [ ] **Set Up SNS Alerts**
  - [ ] Create SNS topic: abjad-alerts
  - [ ] Subscribe email: your-email@example.com
  - [ ] Link alarms to SNS topic

---

### ✅ Phase 11: Backup & Disaster Recovery (Day 11)

- [ ] **Enable DynamoDB Backups**
  ```bash
  # Enable point-in-time recovery
  aws dynamodb update-continuous-backups \
    --table-name Room-dev \
    --point-in-time-recovery-specification PointInTimeRecoveryEnabled=true
  ```

- [ ] **S3 Versioning**
  ```bash
  # Enable versioning on receipts bucket
  aws s3api put-bucket-versioning \
    --bucket abjad-receipts-images-xxxxx \
    --versioning-configuration Status=Enabled
  ```

- [ ] **Create Backup Plan**
  - [ ] AWS Backup → Create backup plan
  - [ ] Name: abjad-daily-backup
  - [ ] Frequency: Daily
  - [ ] Retention: 30 days
  - [ ] Resources: DynamoDB tables

- [ ] **Test Restore Process**
  - [ ] Restore DynamoDB table from backup
  - [ ] Restore S3 object version
  - [ ] Document restore procedure

---

### ✅ Phase 12: Performance Optimization (Day 12)

- [ ] **Enable CloudFront CDN**
  - [ ] Create CloudFront distribution
  - [ ] Origin: Amplify app or S3 bucket
  - [ ] Enable HTTPS only
  - [ ] Set cache behaviors
  - [ ] Add custom domain

- [ ] **Configure API Caching**
  - [ ] API Gateway → Stages → dev
  - [ ] Enable caching
  - [ ] Cache size: 0.5GB
  - [ ] TTL: 300 seconds (5 minutes)

- [ ] **DynamoDB Auto Scaling**
  - [ ] Enable auto scaling on tables
  - [ ] Min capacity: 5 RCU/WCU
  - [ ] Max capacity: 100 RCU/WCU
  - [ ] Target utilization: 70%

- [ ] **Lambda Performance**
  - [ ] Increase memory if needed (256MB → 512MB)
  - [ ] Enable SnapStart for faster cold starts
  - [ ] Add reserved concurrency if needed

---

### ✅ Phase 13: Testing (Day 13-14)

- [ ] **Functional Testing**
  - [ ] Test all user flows end-to-end
  - [ ] Test on desktop (Chrome, Firefox, Safari)
  - [ ] Test on mobile (iOS, Android)
  - [ ] Test on tablet

- [ ] **Load Testing**
  ```bash
  # Use artillery or k6
  npm install -g artillery

  # Create test script
  artillery quick --count 100 --num 10 https://your-app.com
  ```

- [ ] **Security Testing**
  - [ ] Run OWASP ZAP scan
  - [ ] Check for SQL injection
  - [ ] Test XSS vulnerabilities
  - [ ] Verify HTTPS everywhere

- [ ] **Accessibility Testing**
  - [ ] Run Lighthouse audit
  - [ ] Target score: 90+ accessibility
  - [ ] Test with screen reader
  - [ ] Check keyboard navigation

---

### ✅ Phase 14: Documentation (Day 15)

- [ ] **Create User Guide**
  - [ ] How to register
  - [ ] How to manage household
  - [ ] How to create tasks
  - [ ] How to upload receipts
  - [ ] FAQ section

- [ ] **Create Admin Guide**
  - [ ] How to monitor costs
  - [ ] How to view logs
  - [ ] How to handle incidents
  - [ ] Backup/restore procedures

- [ ] **API Documentation**
  - [ ] Generate GraphQL schema docs
  - [ ] Add code examples
  - [ ] Publish to team

---

### ✅ Phase 15: Launch Preparation (Day 16-17)

- [ ] **Create Launch Checklist**
  - [ ] All features working
  - [ ] No critical bugs
  - [ ] Performance acceptable
  - [ ] Security hardened
  - [ ] Monitoring in place
  - [ ] Backups configured
  - [ ] Documentation complete

- [ ] **Prepare Marketing Materials**
  - [ ] Landing page updated
  - [ ] Screenshots/videos ready
  - [ ] Social media posts drafted
  - [ ] Email announcement ready

- [ ] **Set Up Support Channels**
  - [ ] Create support email
  - [ ] Set up feedback form
  - [ ] Create WhatsApp group (optional)
  - [ ] Prepare canned responses

---

### ✅ Phase 16: Go Live! (Day 18)

- [ ] **Final Checks**
  - [ ] Run full test suite
  - [ ] Check all API endpoints
  - [ ] Verify email sending
  - [ ] Test payment flow (if applicable)

- [ ] **Switch to Production**
  ```bash
  # Create prod environment
  amplify env add prod

  # Deploy to prod
  amplify publish --environment prod
  ```

- [ ] **Announce Launch**
  - [ ] Send email to beta testers
  - [ ] Post on social media
  - [ ] Submit to app directories
  - [ ] Update website

- [ ] **Monitor Closely**
  - [ ] Watch CloudWatch dashboard
  - [ ] Check error logs every hour
  - [ ] Respond to user feedback
  - [ ] Fix critical bugs immediately

---

## Post-Launch Checklist (First Month)

### Week 1
- [ ] Daily monitoring of errors
- [ ] Respond to all user feedback within 24 hours
- [ ] Fix critical bugs
- [ ] Monitor costs daily

### Week 2
- [ ] Review CloudWatch metrics
- [ ] Optimize slow queries
- [ ] Add missing features based on feedback
- [ ] Write blog post about launch

### Week 3
- [ ] Implement analytics (Google Analytics, Mixpanel)
- [ ] A/B test key features
- [ ] Optimize onboarding flow
- [ ] Plan next features

### Week 4
- [ ] Monthly cost review
- [ ] Security audit
- [ ] Performance optimization
- [ ] Plan v1.1 release

---

## Success Metrics

### Technical Metrics
- [ ] API response time < 200ms (p95)
- [ ] Error rate < 0.1%
- [ ] Uptime > 99.9%
- [ ] Page load time < 2 seconds

### Business Metrics
- [ ] 100 sign-ups in first month
- [ ] 60% activation rate (completed onboarding)
- [ ] 40% weekly active users
- [ ] < $0.50 cost per active user

---

## Emergency Contacts

**AWS Support**: https://console.aws.amazon.com/support/

**Amplify Discord**: https://discord.gg/amplify

**Your Team**:
- Lead Developer: [Your name]
- AWS Admin: [Your name]
- Support: support@abjad.app

---

## Rollback Plan

If something goes wrong:

```bash
# Rollback to previous environment
amplify env checkout dev

# Revert specific resource
amplify remove api
amplify push

# Emergency: Delete all resources
amplify delete
```

**Before rollback**:
1. Take screenshot of error
2. Export CloudWatch logs
3. Notify users
4. Document issue

---

## Congratulations! 🎉

You've successfully deployed Abjad to AWS!

**Next steps**:
1. Celebrate! 🥳
2. Monitor for first 48 hours closely
3. Gather user feedback
4. Iterate and improve

**Remember**:
- Start small, scale gradually
- Monitor costs weekly
- Listen to users
- Keep iterating

You've got this! 💪
