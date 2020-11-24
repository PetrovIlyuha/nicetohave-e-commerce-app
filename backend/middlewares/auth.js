import admin from '../firebase/index.js';
import User from '../models/userModel.js';

export const authCheck = async (req, res, next) => {
  const { token } = req.headers;
  try {
    const firebaseUser = await admin.auth().verifyIdToken(token);
    req.user = firebaseUser;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid or expired security token' });
  }
};

export const adminRoleCheck = async (req, res, next) => {
  const { email } = req.user;
  const adminUser = await User.findOne({ email }).exec();
  if (adminUser.role !== 'admin') {
    return res.status(403).json({ error: 'Admin router. Access Restricted!' });
  } else {
    next();
  }
};
