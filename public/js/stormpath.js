var stormpath = require('stormpath');

var apiKey = new stormpath.ApiKey(
    process.env['STORMPATH_CLIENT_APIKEY_ID'],
    process.env['STORMPATH_CLIENT_APIKEY_SECRET']
);

var client = new stormpath.Client({ apiKey: apiKey });

var applicationHref = process.env['STORMPATH_APPLICATION_HREF'];

client.getApplication(applicationHref, function(err, application) {
      console.log('Application:', application);
});

var account = {
  givenName: 'Test',
  surname: 'Teeeessssttt',
  username: 'test420',
  email: 'test420@stormpath.com',
  password: 'Changeme1',
  customData: {
    favoriteColor: 'white'
  }
};

application.createAccount(account, function(err, createdAccount) {
  console.log('Account:', createdAccount);
});

application.getAccounts({ username: 'test420' }, function(err, accounts) {
    accounts.each(function(account, callback) {
        console.log('Account:', account);
        callback();
    }, function(err) {
        console.log('Finished iterating over accounts.');
    });
});

var authRequest = {
  username: 'tk421',
  password: 'Changeme1'
};

application.authenticateAccount(authRequest, function(err, result) {
  // If successful, the authentication result will have a method,
  // getAccount(), for getting the authenticated account.
  result.getAccount(function(err, account) {
    console.log('Account:', account);
  });
};
