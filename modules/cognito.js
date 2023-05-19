import { CognitoUserPool, CognitoUserAttribute } from 'amazon-cognito-identity-js';

var poolData = {
	UserPoolId: 'us-east-1_QhU3x6mie',
	ClientId: 'in76rs7g914vem62j1je8l439'
};

export const userPool = new CognitoUserPool(poolData);

export default function testCognito() {
  var attributeList = [];

  var dataEmail = {
    Name: 'email',
    Value: 'jaimegimillo@gmail.com',
  };

  var attributeEmail = new CognitoUserAttribute(dataEmail);
  attributeList.push(attributeEmail);

  userPool.signUp('gimillo', 'Chatbabel123', attributeList, null, function(
    err,
    result
  ) {
    if (err) {
      alert(err.message || JSON.stringify(err));
      return;
    }
    var cognitoUser = result.user;
    console.log('user name is ' + cognitoUser.getUsername());
  });
}
