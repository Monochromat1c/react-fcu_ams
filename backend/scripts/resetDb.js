const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const mongoose = require('mongoose');
const User = require('../models/User');
const Role = require('../models/Role');
const Department = require('../models/Department');

const resetDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Drop all collections
    console.log('Dropping all collections...');
    await Promise.all([
      User.deleteMany({}),
      Role.deleteMany({}),
      Department.deleteMany({})
    ]);
    console.log('All collections dropped successfully');

    // Create default roles
    console.log('Creating default roles...');
    const adminRole = await Role.create({ role: 'admin' });
    const userRole = await Role.create({ role: 'user' });
    console.log('Roles created:', adminRole.role, userRole.role);

    // Create default department
    console.log('Creating default department...');
    const ccsDepartment = await Department.create({ department: 'CCS Department' });
    console.log('Department created:', ccsDepartment.department);

    // Create default admin user
    console.log('Creating default admin user...');
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

    console.log('Database reset completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error resetting database:', error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
  }
};

resetDatabase(); 