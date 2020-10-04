const router = require('express').Router();
const verify = require('./verifyToken');
const User = require('../model/user');

router.get('/', verify, async (req, res) => {
  const user = await User.findById(req.user._id)
  res.json(user)
})
router.post('/weights', verify, async (req, res) => {
  const user = await User.findById(req.user._id)
  try {
    const newWeight = { w: req.body.weightToAdd, date: new Date }
    user.body.weights.push(newWeight)
    user.save();
    res.status(200).send('Weight added to array!')
  } catch (err) {
    res.status(400).send('Something went wrong!')
  }
  console.log(user)
})




module.exports = router;