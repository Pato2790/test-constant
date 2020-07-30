const User = require('../models/User');
const Meet = require('../models/Meet');
const UserMeet = require('../models/UserMeet');

const initModel = async () => {
  
  //  Relations
  User.belongsToMany(Meet, {
    through: 'UserMeet',
    as: 'user',
    foreignKey: 'userId',
    otherKey: 'meetId'
  });

  Meet.belongsToMany(User, {
    through: 'UserMeet',
    as: 'meet',
    foreignKey: 'meetId',
    otherKey: 'userId'
  });

  await User.sync();
  await Meet.sync();
  await UserMeet.sync();
}

module.exports = initModel