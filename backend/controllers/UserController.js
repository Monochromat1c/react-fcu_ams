const User = require('../models/User');

const getAllUsers = async (req, res) => {
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
};

const createUser = async (req, res) => {
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
};

const updateUser = async (req, res) => {
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
};

const deleteUser = async (req, res) => {
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
};

module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser
}; 