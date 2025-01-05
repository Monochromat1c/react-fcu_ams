require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const masterRoutes = require('./routes/master');
const assetRoutes = require('./routes/assets');

// Import models for initialization
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

// Routes
app.use('/api', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api', masterRoutes);
app.use('/api/assets', assetRoutes);

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

// Initialize data
initializeData();

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 