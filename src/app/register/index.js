import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../../../backend/models/User';
import connectDB from '../../../backend/config/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Connect to the database
      await connectDB();

      const { username, password, role } = req.body;

      // Ensure all fields are provided
      if (!username || !password || !role) {
        return res.status(400).json({ message: 'All fields are required' });
      }

      // Check if a user already exists with the same role
      if (role === 'admin') {
        const existingAdmin = await User.findOne({ role: 'admin' });
        if (existingAdmin) {
          return res.status(403).json({ message: 'Admin already exists' });
        }
      }

      // Check if the user already exists
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      const newUser = new User({ username, password: hashedPassword, role });
      await newUser.save();

      // Generate a JWT token
      const token = jwt.sign(
        { id: newUser._id, username: newUser.username, role: newUser.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      // Respond with the token
      res.status(201).json({
        message: 'User registered successfully',
        token,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
