const router = require('express').Router();
const user = require('../model/user');
const verify = require('./verifyToken');
const User = require('../model/user');

router.get('/', verify, async (req, res) => {
  const user = await User.findById(req.user._id)
  res.json(user)
})

module.exports = router;