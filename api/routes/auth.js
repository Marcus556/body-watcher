const router = require('express').Router();
const User = require('../model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation } = require('../validation');


router.post('/register', async (req, res) => {
  //Validate data from request
  const validation = false;
  //if validation pass:
  if (!validation.error) {
    // destructure req.body
    const { name, email, password, body } = req.body

    //check if user is already registered
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send('Email already exists in our database')

    //Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create new user
    const user = new User({
      name: name,
      email: email,
      password: hashedPassword,
      body: {
        weight: body.weight,
        waist: body.waist,
        arms: body.arms
      }
    })
    //save the new user to database
    try {
      const savedUser = await user.save()
      res.send(`user with id: '${savedUser._id}' created! ${savedUser.body.weight}`)

      //catch error
    } catch (error) {
      res.status(400).send(error)
    }
    //if validation dont pass:
  } else {
    res.status(400).send(validation.error.details[0].message)
  }

});

router.post('/login', async (req, res) => {
  const validation = loginValidation(req.body)
  if (!validation.error) {
    //check if email exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('this email/password combination does not exist.')
    //Password is correct:
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('this email/password combination does not exist.')
    //Create and assign jwt-token
    const token = jwt.sign({ _id: user._id }, process.env.SECRET_TOKEN);
    res.header('auth-token', token).send(token)
  } else {
    //validation dont pass:
    res.status(400).send(validation.error.details[0].message)
  }
})

// router.post('/login', (req, res) => {
//   res.send('LOGIN')
// });


module.exports = router;