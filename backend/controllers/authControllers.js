import User from '../models/userModel.js';

export const createOrUpdateUser = async (req, res) => {
  const { name, picture: avatar, email } = req.user;
  const user = await User.findOneAndUpdate(
    { email },
    { name, avatar },
    { new: true },
  );
  if (user) {
    res.json(user);
  } else {
    const newUser = await new User({
      email,
      name,
      avatar,
    }).save();
    res.json(newUser);
  }
};

export const getCurrentUser = async (req, res) => {
  const { email } = req.user;
  await User.findOne({ email }).exec((err, user) => {
    if (err) {
      res.status(404).json({ error: 'No user was found' });
    }
    res.status(200).json(user);
  });
};
