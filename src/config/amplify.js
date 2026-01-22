import { Amplify } from 'aws-amplify';

// Default/placeholder configuration
// Replace this when you add Amplify backend features
const awsExports = {
  aws_project_region: 'us-east-1',
};

// Configure Amplify with AWS backend
Amplify.configure(awsExports);

export default Amplify;
