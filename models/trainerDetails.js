const mongoose = require('mongoose')
const { userSchema } = require('./userModel')

const Joi = require('joi')

var trainerDetailsSchema = mongoose.Schema({
  user_id: userSchema,
  dob: Date,
  gender: String,
  exercise_type: String,
  listed: String, //Trainer approved by admin or not
  qualification: String,
  company_name: String,
  designation: String,
  time_worked: Number, //In Years
  trainer_availblity: String,
  numReview: Number,
  countReview: Number,
  location: { city: String, address: String, state: String },

  trainer_desc: String, //Trainer Description

  trainer_photo: String,
  cloudinary_id: String,
  membership: Boolean,
  bank_details:{
    bank_name: String,
    account_number: String,
    account_name: String
  }
})

var trainerDetails = mongoose.model('Trainer_Details', trainerDetailsSchema)

function validateTrainer(data) {
  const schema = Joi.object({
    user_id: {
      full_name: Joi.string().min(3).max(24),
      email: Joi.string().min(3).email(),
      password: Joi.string().min(8).required(),
      user_type: Joi.string().min(3).max(30),
    },
    dob: Joi.date(),
    gender: Joi.string().min(3).max(10),
    exercise_type: Joi.string(),
    listed: Joi.string(),
    company_name: Joi.string(),
    designation: Joi.string(),
    time_worked: Joi.number().positive().max(24),
    dob: Joi.date().required(),
    trainer_desc: Joi.string(),
    trainer_availblity: Joi.string(),
    certificate_file: Joi.string(),
    numReview: Joi.number(),
    countReview: Joi.number(),
    location: {
      city: Joi.string(),
      address: Joi.string(),
      state: Joi.string(),
    },
    bank_details: {
      bank_name: Joi.string(),
      account_number: Joi.string(),
      account_name: Joi.string(),
    },
    trainer_photo: Joi.string(),
    cloudinary_id: Joi.string(),
    membership: Joi.boolean()
  })
  return schema.validate(data)
}

module.exports.trainerDetails = trainerDetails

module.exports.Validate = validateTrainer
