const express = require('express');
const router = express.Router();
const Equipment = require('../models/Equipment');

// GET all equipment
router.get('/', async (req, res) => {
    try {
        const equipment = await Equipment.find().sort({ createdAt: -1 });
        res.json(equipment);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST new equipment
router.post('/', async (req, res) => {
    const equipment = new Equipment({
        name: req.body.name,
        type: req.body.type,
        status: req.body.status,
        lastCleanedDate: req.body.lastCleanedDate
    });

    try {
        const newEquipment = await equipment.save();
        res.status(201).json(newEquipment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT update equipment
router.put('/:id', async (req, res) => {
    try {
        const updatedEquipment = await Equipment.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedEquipment) return res.status(404).json({ message: 'Equipment not found' });
        res.json(updatedEquipment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE equipment
router.delete('/:id', async (req, res) => {
    try {
        const equipment = await Equipment.findByIdAndDelete(req.params.id);
        if (!equipment) return res.status(404).json({ message: 'Equipment not found' });
        res.json({ message: 'Equipment deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
