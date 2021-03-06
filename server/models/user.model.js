import mongoose from 'mongoose'

var validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email)
};


const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: 'String',
    required: true,
    trim: true,
    unique: true,
    required: 'Email address is required',
    validate: [validateEmail, 'Please enter valid email address']
  },
  password: {
    type: 'String',
    trim: true
  },
  token: {
    type: 'String'
  }
}, {
  timestamps: {
    createdAt: 'created_at'
  }
})

export default mongoose.model('User', UserSchema)