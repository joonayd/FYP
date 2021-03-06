const { customerDetails } = require('../models/customerDetails')
var { Validate } = require('../models/customerDetails')
var bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')

const _ = require('lodash')
const router = require('../routes/api/customer')
const mailgun = require('mailgun-js')
const DOMAIN = 'sandboxa18feaacac6e4aa3bd8caab73c6e4545.mailgun.org'
const mg = mailgun({ apiKey: config.get('MAILGUN_APIKEY'), domain: DOMAIN })

//Customer Register to the system

const createData = async (req, res) => {
  try {
    let user = await customerDetails.findOne({
      // user_id: { email: req.body.user_id.email },
      'user_id.email': req.body.user_id.email,
    })

    if (user) return res.status(400).send('user with given email already exist')

    const crud = await customerDetails.create(req.body)

    // let email1 = crud.user_id.email

    //res.status(201).json({ crud })
    //console.log(crud)
    res.send(_.pick(crud, ['user_id.email', 'user_id.full_name']))
  } catch (error) {
    res.status(500).json({ message: error })
  }
}
const checkUser = async (req, res) => {
  console.log(req.user)
  res.send('Working')
}
const loginUser = async (req, res) => {
  let user = await customerDetails.findOne({
    'user_id.email': req.body.email,
  })
  if (!user) return res.status(400).send('User is not Registered')

  let bodyPassword = req.body.password
  let userPassword = user.user_id.password
  let isvalid = await bcryptjs.compare(bodyPassword, userPassword)

  let token = jwt.sign(
    {
      _id: user._id,
      email: user.user_id.email,
      full_name: user.user_id.full_name,
      user_type: user.user_id.user_type,
    },
    config.get('jwtPrivateKey')
  )
  // console.log(isvalid)
  if (!isvalid) return res.status(401).send('password is Invalid')
  res.send(token)
}
//use to get all data from db
const getAllData = async (req, res) => {
  try {
    const crud = await customerDetails.find()
    res.status(200).json({ crud })
  } catch (error) {
    res.status(500).json({ message: error })
  }
}

//use to get only one data from db
const getOneData = async (req, res) => {
  try {
    const { userId: crudId } = req.params
    const crud = await customerDetails.findOne({ _id: crudId })

    if (!crud) {
      return res.status(404).json({ message: 'item does not exist' })
    }

    res.status(200).json({ crud })
  } catch (error) {
    res.status(500).json({ message: error })
  }
}

//this is use to update user in list
const updateData = async (req, res) => {
  try {
    const { userId: crudId } = req.params
    const crud = await customerDetails.findByIdAndUpdate(
      { _id: crudId },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    )

    if (!crud) {
      return res.status(404).json({ message: 'item does not exist' })
    }

    res.status(200).json({ crud })
  } catch (error) {
    res.status(500).json({ message: error })
  }
}

//delete data from id
const deleteData = async (req, res) => {
  try {
    const { userId: crudId } = req.params
    const crud = await customerDetails.findByIdAndDelete({ _id: crudId })

    if (!crud) {
      return res.status(404).json({ message: 'item does not exist' })
    }
    res.status(200).json({ crud })
  } catch (error) {
    res.status(500).json({ message: error })
  }
}

//delete data from id
const changePassword = async (req, res) => {
  try {
    console.log(req.body)

    let user = await customerDetails.findOne({
      _id: req.body._id,
    })

    if (!user) {
      return res.status(404).json({ message: 'item does not exist' })
    } else {
      let bodyPassword = req.body.password
      let userPassword = user.user_id.password

      let isvalid = await bcryptjs.compare(bodyPassword, userPassword)

      if (!isvalid) {
        return res.status(401).json({ message: 'Current Password is invalid' })
      } else {
        console.log('Check Before')
        let salt = await bcryptjs.genSalt(10)
        var new_password = await bcryptjs.hash(req.body.new_password, salt)
        console.log('Check AFter')

        user.user_id.password = new_password

        var crud = await customerDetails.findByIdAndUpdate(
          { _id: user._id },
          user,
          {
            new: true,
            runValidators: true,
          }
        )
      }
    }
    res.status(200).json({ message: 'Password Change Successfully' })
  } catch (error) {
    res.status(500).json({ message: error })
  }
}

//forget password work

module.exports = {
  getAllData,
  getOneData,
  updateData,
  deleteData,
  createData,
  loginUser,
  checkUser,
  changePassword,

  // registerCustomer,
}
