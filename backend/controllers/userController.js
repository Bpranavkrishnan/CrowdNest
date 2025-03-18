import { findById } from '../models/User';
import { genSalt, hash } from 'bcryptjs';

// Update user profile
export async function updateUserProfile(req, res) {
  const { id } = req.params;
  const { name, email, password } = req.body;

  try {
    const user = await findById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.name = name || user.name;
    user.email = email || user.email;

    if (password) {
      const salt = await genSalt(10);
      user.password = await hash(password, salt);
    }

    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}