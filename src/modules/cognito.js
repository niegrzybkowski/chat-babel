import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
	UserPoolId: 'us-east-1_QhU3x6mie',
	ClientId: 'in76rs7g914vem62j1je8l439'
};

const userPool = new CognitoUserPool(poolData);

export default userPool;
