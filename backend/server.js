require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');

// Import models
const User = require('./models/User');
const Role = require('./models/Role');
const Department = require('./models/Department');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Auth middleware
const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId)
      .populate('role')
      .populate('department');

    if (!user) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Basic Auth Routes
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    const user = await User.findOne({ username })
      .populate('role')
      .populate('department');
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        role: user.role,
        department: user.department
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create User Route (Protected, admin only)
app.post('/api/users', authMiddleware, async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const {
      username,
      password,
      email,
      first_name,
      middle_name,
      last_name,
      address,
      contact_number,
      role_id,
      department_id
    } = req.body;

    // Validate required fields
    if (!username || !password || !email || !first_name || !last_name || !address || 
        !contact_number || !role_id || !department_id) {
      return res.status(400).json({ message: 'All required fields must be provided' });
    }

    // Check if username or email already exists
    const existingUser = await User.findOne({
      $or: [{ username }, { email }]
    });

    if (existingUser) {
      return res.status(400).json({ 
        message: 'Username or email already exists' 
      });
    }

    // Create new user
    const user = await User.create({
      username,
      password,
      email,
      first_name,
      middle_name,
      last_name,
      address,
      contact_number,
      role: role_id,
      department: department_id
    });

    // Populate role and department for response
    await user.populate(['role', 'department']);

    res.status(201).json({
      message: 'User created successfully',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        first_name: user.first_name,
        middle_name: user.middle_name,
        last_name: user.last_name,
        address: user.address,
        contact_number: user.contact_number,
        role: user.role,
        department: user.department
      }
    });
  } catch (error) {
    console.error('Create user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all roles
app.get('/api/roles', authMiddleware, async (req, res) => {
  try {
    const roles = await Role.find();
    res.json(roles);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all departments
app.get('/api/departments', authMiddleware, async (req, res) => {
  try {
    const departments = await Department.find();
    res.json(departments);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all users (Protected, admin only)
app.get('/api/users', authMiddleware, async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const users = await User.find()
      .populate('role')
      .populate('department')
      .select('-password'); // Exclude password field

    res.json(users);
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user (Protected, admin only)
app.put('/api/users/:id', authMiddleware, async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const {
      username,
      email,
      first_name,
      middle_name,
      last_name,
      address,
      contact_number,
      role_id,
      department_id
    } = req.body;

    // Validate required fields
    if (!username || !email || !first_name || !last_name || !address || 
        !contact_number || !role_id || !department_id) {
      return res.status(400).json({ message: 'All required fields must be provided' });
    }

    // Check if username or email already exists for other users
    const existingUser = await User.findOne({
      _id: { $ne: req.params.id },
      $or: [{ username }, { email }]
    });

    if (existingUser) {
      return res.status(400).json({ 
        message: 'Username or email already exists' 
      });
    }

    // Update user
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        username,
        email,
        first_name,
        middle_name,
        last_name,
        address,
        contact_number,
        role: role_id,
        department: department_id
      },
      { new: true }
    ).populate(['role', 'department']);

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      message: 'User updated successfully',
      user: updatedUser
    });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete user (Protected, admin only)
app.delete('/api/users/:id', authMiddleware, async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    // Prevent deleting self
    if (req.params.id === req.user._id.toString()) {
      return res.status(400).json({ message: 'Cannot delete your own account' });
    }

    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Initialize default roles and admin user
const initializeData = async () => {
  try {
    // Create default roles if they don't exist
    const adminRole = await Role.findOneAndUpdate(
      { role: 'admin' },
      { role: 'admin' },
      { upsert: true, new: true }
    );

    const userRole = await Role.findOneAndUpdate(
      { role: 'user' },
      { role: 'user' },
      { upsert: true, new: true }
    );

    console.log('Roles created:', adminRole.role, userRole.role);
    
    // Create default department if it doesn't exist
    const ccsDepartment = await Department.findOneAndUpdate(
      { department: 'CCS Department' },
      { department: 'CCS Department' },
      { upsert: true, new: true }
    );

    console.log('Department created:', ccsDepartment.department);
    
    // Create default admin user if it doesn't exist
    const adminExists = await User.findOne({ username: 'admin' });
    
    if (!adminExists) {
      const adminUser = await User.create({
        username: 'admin',
        password: 'admin',
        email: 'admin@example.com',
        first_name: 'Admin',
        last_name: 'User',
        address: 'Admin Address',
        contact_number: '1234567890',
        role: adminRole._id,
        department: ccsDepartment._id
      });
      console.log('Default admin user created:', adminUser.username);
    }
  } catch (error) {
    console.error('Initialization error:', error);
  }
};

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await initializeData();
}); 