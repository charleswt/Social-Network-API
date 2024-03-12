const { connect, connection } = require('mongoose');

const connectionString = 'mongodb://localhost:27017/SocialNetworkAPI';

connect(connectionString);

module.exports = connection;
