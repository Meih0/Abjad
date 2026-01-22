# AWS Cost Calculator for Abjad

## Monthly Cost Breakdown by User Scale

### Scenario 1: Development/Testing (10 Users)

| Service | Usage | Free Tier | Paid | Monthly Cost |
|---------|-------|-----------|------|--------------|
| **Amplify Hosting** | 1 app, 100 builds/month | ✅ First build/month | 99 builds @ $0.01 | **$1.00** |
| **Cognito** | 10 active users | ✅ Up to 50k MAUs | - | **$0.00** |
| **API Gateway** | 50k requests | ✅ 1M requests | - | **$0.00** |
| **Lambda** | 100k requests, 1GB RAM | ✅ 1M requests | - | **$0.00** |
| **DynamoDB** | 1GB storage, 100k reads/writes | ✅ 25GB, 200M requests | - | **$0.00** |
| **S3** | 5GB storage, 10k requests | ✅ 5GB, 20k GET, 2k PUT | - | **$0.00** |
| **CloudWatch** | 10 metrics, 1GB logs | ✅ 10 metrics, 5GB logs | - | **$0.00** |
| **SES** | 1k emails/month | ❌ (0.3M from EC2) | 1k @ $0.10/1k | **$0.10** |
| **Data Transfer** | 5GB outbound | ✅ 1GB | 4GB @ $0.09/GB | **$0.36** |
| **TOTAL** | | | | **$1.46/month** |

---

### Scenario 2: Small Business (100 Users)

| Service | Usage | Free Tier | Paid | Monthly Cost |
|---------|-------|-----------|------|--------------|
| **Amplify Hosting** | 1 app, 200 builds/month | ✅ First build | 199 builds | **$2.00** |
| **Cognito** | 100 active users | ✅ Up to 50k MAUs | - | **$0.00** |
| **API Gateway** | 500k requests | ✅ 1M requests | - | **$0.00** |
| **Lambda** | 1M requests, 1GB RAM, 1s avg | ✅ 1M req, 400k GB-s | 600k GB-s @ $0.0000166667 | **$10.00** |
| **DynamoDB** | 10GB storage, 2M reads, 500k writes | ❌ On-demand | 2M RCU, 500k WCU | **$3.75** |
| **S3** | 50GB storage, 100k requests | ❌ | 45GB @ $0.023, 80k req | **$1.08** |
| **CloudWatch** | 20 metrics, 5GB logs | ❌ | 10 metrics @ $0.30, 4GB @ $0.50 | **$5.00** |
| **SES** | 10k emails/month | ❌ | 10k @ $0.10/1k | **$1.00** |
| **Data Transfer** | 100GB outbound | ✅ 1GB | 99GB @ $0.09/GB | **$8.91** |
| **Route 53** | 1 hosted zone, 100k queries | ❌ | Zone + queries | **$0.50** |
| **CloudFront** (optional) | 50GB, 500k requests | ✅ 1TB, 10M req | - | **$0.00** |
| **TOTAL** | | | | **$32.24/month** |

---

### Scenario 3: Medium Business (1,000 Users)

| Service | Usage | Free Tier | Paid | Monthly Cost |
|---------|-------|-----------|------|--------------|
| **Amplify Hosting** | 1 app, 500 builds/month | ❌ | 500 builds @ $0.01 | **$5.00** |
| **Cognito** | 1,000 active users | ✅ Up to 50k MAUs | - | **$0.00** |
| **API Gateway** | 5M requests | ❌ | 4M @ $1.00/M | **$4.00** |
| **Lambda** | 10M requests, 1GB RAM, 1s avg | ❌ | 10M req + 9.6M GB-s | **$18.00** |
| **DynamoDB** | 100GB storage, 20M reads, 5M writes | ❌ On-demand | 20M RCU, 5M WCU | **$37.50** |
| **S3** | 500GB storage, 1M requests | ❌ | 495GB @ $0.023, 980k req | **$11.68** |
| **CloudWatch** | 50 metrics, 20GB logs | ❌ | 40 metrics, 15GB logs | **$19.50** |
| **SES** | 100k emails/month | ❌ | 100k @ $0.10/1k | **$10.00** |
| **Data Transfer** | 1TB outbound | ❌ | 1023GB @ $0.09/GB | **$92.07** |
| **Route 53** | 1 hosted zone, 1M queries | ❌ | Zone + 1M queries | **$1.00** |
| **CloudFront** | 500GB, 5M requests | ❌ | 500GB @ $0.085/GB | **$42.50** |
| **Backup** | DynamoDB + S3 snapshots | ❌ | 100GB @ $0.05/GB | **$5.00** |
| **WAF** (security) | 1 web ACL, 10M requests | ❌ | ACL + requests | **$10.00** |
| **TOTAL** | | | | **$256.25/month** |

---

### Scenario 4: Large Business (10,000 Users)

| Service | Usage | Free Tier | Paid | Monthly Cost |
|---------|-------|-----------|------|--------------|
| **Amplify Hosting** | 1 app, 1000 builds/month | ❌ | 1000 builds | **$10.00** |
| **Cognito** | 10,000 active users | ✅ Up to 50k MAUs | - | **$0.00** |
| **API Gateway** | 50M requests | ❌ | 49M @ $1.00/M | **$49.00** |
| **Lambda** | 100M requests, 1GB RAM, 1s avg | ❌ | 100M req + 96M GB-s | **$180.00** |
| **DynamoDB** | 1TB storage, 200M reads, 50M writes | ❌ Provisioned capacity | Reserved capacity | **$450.00** |
| **S3** | 5TB storage, 10M requests | ❌ | 4.995TB @ $0.023 | **$117.38** |
| **CloudWatch** | 100 metrics, 100GB logs | ❌ | 90 metrics, 95GB logs | **$74.50** |
| **SES** | 1M emails/month | ❌ | 1M @ $0.10/1k | **$100.00** |
| **Data Transfer** | 10TB outbound | ❌ | 10,239GB @ $0.085/GB | **$870.32** |
| **Route 53** | 1 hosted zone, 10M queries | ❌ | Zone + 10M queries | **$4.00** |
| **CloudFront** | 5TB, 50M requests | ❌ | 5TB @ $0.085/GB | **$435.20** |
| **Backup** | Automated snapshots | ❌ | 1TB @ $0.05/GB | **$50.00** |
| **WAF** | 1 web ACL, 100M requests | ❌ | ACL + requests | **$15.00** |
| **ElastiCache** (Redis) | r6g.large, for caching | ❌ | Reserved instance | **$85.00** |
| **CloudTrail** | Audit logging | ❌ | 10M events | **$2.00** |
| **TOTAL** | | | | **$2,442.40/month** |

---

## Cost Optimization Tips

### 1. Use Reserved Capacity for DynamoDB
- **Savings**: Up to 53% compared to on-demand
- **Best for**: Predictable workloads
```bash
# Example: 10 RCU + 10 WCU reserved (1-year)
# On-demand: $18.25/month
# Reserved: $8.54/month
# Savings: $9.71/month (53%)
```

### 2. Enable S3 Intelligent-Tiering
```bash
# Automatically moves unused files to cheaper storage
# Savings: 40-60% on storage costs
```

### 3. Use CloudFront for Static Assets
- Reduces origin requests to S3
- Faster performance
- Lower data transfer costs

### 4. Implement API Caching
```javascript
// Cache frequently accessed data
const cache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

export async function fetchRoomsWithCache() {
  const cacheKey = 'rooms';
  const cached = cache.get(cacheKey);

  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }

  const data = await fetchRooms();
  cache.set(cacheKey, { data, timestamp: Date.now() });
  return data;
}
```

### 5. Batch DynamoDB Operations
```javascript
// Instead of 100 separate reads (100 RCUs)
// Use BatchGetItem (10 RCUs)
const results = await client.graphql({
  query: batchGetItems,
  variables: { ids: [1, 2, 3, 4, 5] }
});
```

### 6. Use Lambda SnapStart
- Reduces cold start times
- Lower costs due to faster execution
```bash
# In Lambda configuration:
# Enable SnapStart → Yes
```

### 7. Set S3 Lifecycle Policies
```json
{
  "Rules": [
    {
      "Id": "DeleteOldReceipts",
      "Status": "Enabled",
      "Prefix": "receipts/",
      "Expiration": {
        "Days": 365
      }
    },
    {
      "Id": "ArchiveOldFiles",
      "Status": "Enabled",
      "Transitions": [
        {
          "Days": 90,
          "StorageClass": "GLACIER"
        }
      ]
    }
  ]
}
```

### 8. Monitor and Set Billing Alarms
```bash
# AWS CLI command to create billing alarm
aws cloudwatch put-metric-alarm \
  --alarm-name "MonthlyBillingAlert" \
  --alarm-description "Alert when monthly charges exceed $50" \
  --metric-name EstimatedCharges \
  --namespace AWS/Billing \
  --statistic Maximum \
  --period 21600 \
  --evaluation-periods 1 \
  --threshold 50 \
  --comparison-operator GreaterThanThreshold
```

---

## Free Tier Summary (First 12 Months)

### Always Free
- **Cognito**: 50,000 MAUs
- **Lambda**: 1M requests + 400k GB-seconds/month
- **DynamoDB**: 25GB storage + 25 RCU + 25 WCU
- **S3**: First 5GB (always free tier)
- **CloudWatch**: 10 metrics + 5GB logs

### 12-Month Free Tier
- **S3**: 5GB storage, 20k GET, 2k PUT
- **Lambda**: 1M requests, 400k GB-seconds
- **API Gateway**: 1M API calls/month
- **CloudFront**: 1TB outbound, 10M requests
- **Data Transfer**: 1GB/month (always free)

---

## Break-Even Analysis

### When is AWS Worth It?

**Manual Management** (No AWS):
- Hosting: $10/month (Vercel/Netlify)
- Database: $15/month (MongoDB Atlas)
- Auth: $0 (self-implemented)
- Storage: Included in hosting
- **Total**: $25/month (but limited scalability)

**AWS (100 users)**:
- All services: ~$32/month
- Full scalability
- Enterprise-grade security
- Auto-scaling
- **Total**: $32/month

**Recommendation**:
- < 50 users: Traditional hosting might be cheaper
- 50-500 users: AWS becomes competitive
- 500+ users: AWS is significantly better value

---

## ROI Calculator

### Cost Per User (Monthly)

| Users | Total AWS Cost | Cost Per User | Revenue Needed @ 10% margin |
|-------|---------------|---------------|---------------------------|
| 10 | $1.46 | $0.15 | $1.50/user |
| 100 | $32.24 | $0.32 | $3.20/user |
| 1,000 | $256.25 | $0.26 | $2.60/user |
| 10,000 | $2,442.40 | $0.24 | $2.40/user |

**Pricing Strategy Suggestions**:
- **Freemium**: Free for basic, $5/month for premium
- **Family Plan**: $10/month (up to 5 users)
- **Business**: $20/month (unlimited users + support)

---

## Payment Methods in Saudi Arabia

### 1. Direct Credit Card
```javascript
// Use Stripe with Saudi cards
import { loadStripe } from '@stripe/stripe-js';

const stripe = await loadStripe('pk_live_YOUR_KEY');
// Stripe supports: Visa, Mastercard, Mada
```

### 2. AWS Activate Credits
- Apply for AWS Activate
- Get $1,000-$100,000 in credits
- Perfect for startups
- Apply at: https://aws.amazon.com/activate/

### 3. STC Pay / Mada Integration
```javascript
// Use Moyasar (Saudi payment gateway)
import Moyasar from '@moyasar/moyasar-js';

Moyasar.init({
  amount: 5000, // in halalas (50 SAR)
  currency: 'SAR',
  description: 'Abjad Premium Subscription',
  publishable_api_key: 'pk_test_YOUR_KEY',
  callback_url: 'https://your-app.com/payment/callback',
  methods: ['creditcard', 'stcpay', 'applepay']
});
```

---

## Conclusion

### Recommended Starting Point
1. **Month 1-3**: Development with free tier (~$2/month)
2. **Month 4-6**: Beta with 50-100 users (~$30/month)
3. **Month 7-12**: Launch with 500 users (~$150/month)
4. **Year 2+**: Scale to 1000+ users (optimize costs)

### Budget Recommendation
- **Development**: $50/month budget (plenty of room)
- **Beta**: $100/month budget
- **Production**: Start with $200/month, scale as needed

**Your current free tier will cover development completely!** 🎉
