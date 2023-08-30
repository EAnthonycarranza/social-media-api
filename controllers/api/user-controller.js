const User = require('../../models/User');
const mongoose = require('mongoose');  // Import mongoose for ObjectId validation.

// Validate userId function
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// Get all users
const getAllUsers = async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).json(error);
    }
};

// Get a single user by ID
const getUserById = async (req, res) => {
    const userId = req.params.userId; // Updated to userId for consistency

    // Validate userId
    if (!isValidObjectId(userId)) {
        return res.status(400).json({ error: 'Invalid ID format.' });
    }

    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching user' });
    }
};

// Create a new user
const createUser = async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.json(newUser);
    } catch (err) {
        res.status(500).json(err);
    }
};

// Update a user by ID
const updateUser = async (req, res) => {
    const userId = req.params.userId;  // Use userId instead of id

    // Validate userId
    if (!isValidObjectId(userId)) {
        return res.status(400).json({ error: 'Invalid ID format.' });
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'No user with this ID!' });
        }
        res.json(updatedUser);
    } catch (err) {
        res.status(500).json(err);
    }
};

// Delete a user by ID
const deleteUser = async (req, res) => {
    const userId = req.params.userId;  // Use userId instead of id

    // Validate userId
    if (!isValidObjectId(userId)) {
        return res.status(400).json({ error: 'Invalid ID format.' });
    }

    try {
        const userToDelete = await User.findByIdAndDelete(userId);
        if (!userToDelete) {
            return res.status(404).json({ message: 'No user with this ID!' });
        }
        res.json({ message: 'User deleted!' });
    } catch (err) {
        res.status(500).json(err);
    }
};

// Add a friend to user's friend list
const addFriend = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.userId, { $addToSet: { friends: req.params.friendId } }, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'No user with this ID!' });
        }
        res.json(updatedUser);
    } catch (err) {
        res.status(500).json(err);
    }
};

// Remove a friend from user's friend list
const removeFriend = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.userId, { $pull: { friends: req.params.friendId } }, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'No user with this ID!' });
        }
        res.json(updatedUser);
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
};