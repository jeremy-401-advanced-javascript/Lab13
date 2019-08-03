'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('./roles-models.js');

const useToken = new Set();

const users = new mongoose.Schema({
  username: {type:String, required:true, unique:true},
  password: {type:String, required:true},
  email: {type: String},
  role: {type: String, default:'user', enum: ['admin','editor','user']},
}, { toObject: {virtuals:true}, toJSON: {virtuals:true}});

users.virtual('acl', {
  ref: 'roles',
  localField: 'role',
  foreignField: 'role',
  justOne: true
});

users.pre('findeOne', function() {
  try {
    this.populate('acl');
  }
  catch(e) {
    throw new Error(e.message);
  }
});

users.methods.can = function(capability) {
  return this.acl.capabilities.includes(capability);
}

users.pre('save', function(next) {
  bcrypt.hash(this.password, 10)
    .then(hashedPassword => {
      this.password = hashedPassword;
      next();
    })
    .catch(console.error);
});

users.statics.authenticateToken = function(token) {

  if (useToken.has(token) ) {
    return Promise.reject('Invalid Token');
  }

  useToken.add(token);

  let parsedToken = jwt.verify(token, process.env.SECRET);
  let query = {_id:parsedToken.id};
  return this.findOne(query);
};

users.statics.authenticateBasic = function(auth) {
  let query = {username:auth.username};
  return this.findOne(query)
    .then( user => user && user.comparePassword(auth.password) )
    .catch(error => {throw error;});
};

users.methods.comparePassword = function(password) {
  return bcrypt.compare( password, this.password )
    .then( valid => valid ? this : null);
};

users.methods.generateToken = function() {
  
  let secret = process.env.SECRET;
  let expires = { expiresIn: '15m' };

  let token = {
    id: this._id,
    role: this.role,
  };
  console.log(token);
  return jwt.sign(token, secret, expires);
};

module.exports = mongoose.model('users', users);