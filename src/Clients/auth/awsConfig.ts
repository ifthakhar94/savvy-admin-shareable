export const awsConfig = () => {
  let request_parameters = JSON.stringify({
    query: `mutation IAM_USER_FEDERATED_IDENTITIES{
    regenerateIamUserIdentities{
        accessKeyId
        secretKey
        sessionToken
        expiration
    }
}`,
    variables: {}
  });
  return request_parameters;
};
