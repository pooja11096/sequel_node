'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config,{
    define:{
      timestamps:false
    }
  });
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config, {
    define:{
      timestamps:false
    }
  });
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.users = require('./users')(sequelize,Sequelize);
db.user_detail = require('./user_detail')(sequelize,Sequelize);
db.post_tags = require('./post_tag')(sequelize,Sequelize);
db.posts = require('./posts')(sequelize,Sequelize);
db.tags = require('./tags')(sequelize,Sequelize);


db.userDetails = db.users.hasOne(db.user_detail,{foreignKey:'user_id',as:'user_detail'});
db.user_detail.belongsTo(db.users,{foreignKey:'user_id'});

db.userPost =  db.users.hasMany(db.posts,{foreignKey:'user_id'});
db.posts.belongsTo(db.users,{foreignKey:'user_id'});


db.postTag = db.posts.belongsToMany(db.tags,{through:'post_tag', as:'tags'});
db.tags.belongsToMany(db.posts,{through:'post_tag'});


// db.tagPost = db.tags.belongsTo(db.post,{foreignKey:'user_id', as:'users'});

// db.postTag = db.posts.hasMany(db.tags,{foreignKey:'user_id', as:'tags'})


db.sequelize.sync({ force: false}).then(()=>{
  console.log("re sync");
})

module.exports = db;
