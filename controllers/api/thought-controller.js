const Thought = require('../../models/Thought');
const User = require('../../models/User');

// Get all thoughts
const getAllThoughts = async (req, res) => {
    try {
        const thoughts = await Thought.find({});
        res.json(thoughts);
    } catch (err) {
        res.status(500).json(err);
    }
};

// Get a single thought by ID
const getThoughtById = async (req, res) => {
    try {
        const thought = await Thought.findById(req.params.thoughtId);
        if (!thought) {
            return res.status(404).json({ message: 'No thought with this ID!' });
        }
        res.json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
};

// Create a new thought
const createThought = async (req, res) => {
    try {
        const newThought = await Thought.create(req.body);
        // Also add the thought to the user's thoughts array
        await User.findByIdAndUpdate(req.body.userId, { $push: { thoughts: newThought._id } }, { new: true });
        res.json(newThought);
    } catch (err) {
        res.status(500).json(err);
    }
};

// Update a thought by ID
const updateThought = async (req, res) => {
    try {
        const updatedThought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, { new: true });
        if (!updatedThought) {
            return res.status(404).json({ message: 'No thought with this ID!' });
        }
        res.json(updatedThought);
    } catch (err) {
        res.status(500).json(err);
    }
};

// Delete a thought by ID
const deleteThought = async (req, res) => {
    try {
        const thoughtToDelete = await Thought.findByIdAndDelete(req.params.thoughtId);
        if (!thoughtToDelete) {
            return res.status(404).json({ message: 'No thought with this ID!' });
        }
        // Also remove the thought ID from the user's thoughts array
        await User.findByIdAndUpdate(thoughtToDelete.userId, { $pull: { thoughts: req.params.thoughtId } }, { new: true });
        res.json({ message: 'Thought deleted!' });
    } catch (err) {
        res.status(500).json(err);
    }
};

// Add a reaction to a thought
const addReaction = async (req, res) => {
    try {
        const updatedThought = await Thought.findByIdAndUpdate(req.params.thoughtId, { $push: { reactions: req.body } }, { new: true });
        if (!updatedThought) {
            return res.status(404).json({ message: 'No thought with this ID!' });
        }
        res.json(updatedThought);
    } catch (err) {
        res.status(500).json(err);
    }
};

// Remove a reaction from a thought
const removeReaction = async (req, res) => {
    try {
        const updatedThought = await Thought.findByIdAndUpdate(req.params.thoughtId, 
            { $pull: { reactions: { _id: req.params.reactionId } } }, 
            { new: true }
        );
        
        if (!updatedThought) {
            return res.status(404).json({ message: 'No thought with this ID!' });
        }
        
        res.json(updatedThought);
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports = {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction
};
