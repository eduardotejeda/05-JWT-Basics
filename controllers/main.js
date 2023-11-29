const jwt = require('jsonwebtoken')
const CustomAPIError = require('../errors/custom-error')

const login = async (req, res) => {
const {username, password} = req.body
console.log(req.body)

//mongoose
//Joi
// check in the controller

if(!username || !password) {
throw new CustomAPIError('Please provide username and password', 400)
}

// just for demo, normally privided by DB!
const id = new Date().getDate


//try to keep payload small, better experience for user
const token = jwt.sign({id, username}, process.env.JWT_SECRET, {expiresIn:'30d'})


res.status(200).json({msg:'user created', token})
}

const dashboard = async (req, res) => {

  console.log(req.user)

  const luckyNumber = Math.floor(Math.random()*100)
  res.status(200).json({
    msg:`Hello, ${req.user.username}`, 
    secret:`Here is your authorized data, your lucky number is ${luckyNumber}`})




}

module.exports = {
  login, dashboard
}