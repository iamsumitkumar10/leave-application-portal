const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const role = require('../middleware/role');
const Leave = require('../models/Leave');

// Employee apply for leave
router.post('/', auth, role('employee'), async (req, res) => {
  try {
    const { leaveType, startDate, endDate, reason } = req.body;
    if(!startDate || !endDate) return res.status(400).json({ message: 'startDate and endDate required' });
    const leave = new Leave({
      employeeId: req.user._id,
      leaveType: leaveType || 'casual',
      startDate,
      endDate,
      reason
    });
    await leave.save();
    res.json(leave);
  } catch(err){
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Employee: get own leaves
router.get('/my', auth, role('employee'), async (req, res) => {
  try {
    const leaves = await Leave.find({ employeeId: req.user._id }).sort({ appliedAt: -1 });
    res.json(leaves);
  } catch(err){
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Employee: edit own leave (only if pending)
router.put('/:id', auth, role('employee'), async (req, res) => {
  try {
    const leave = await Leave.findById(req.params.id);
    if(!leave) return res.status(404).json({ message: 'Leave not found' });
    if(leave.employeeId.toString() !== req.user._id.toString()) return res.status(403).json({ message: 'Not allowed' });
    if(leave.status !== 'pending') return res.status(400).json({ message: 'Only pending leaves can be edited' });
    const { leaveType, startDate, endDate, reason } = req.body;
    if(leaveType) leave.leaveType = leaveType;
    if(startDate) leave.startDate = startDate;
    if(endDate) leave.endDate = endDate;
    if(reason) leave.reason = reason;
    await leave.save();
    res.json(leave);
  } catch(err){
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Employee: cancel own leave (only if pending)
router.delete('/:id', auth, role('employee'), async (req, res) => {
  try {
    const leave = await Leave.findById(req.params.id);
    if(!leave) return res.status(404).json({ message: 'Leave not found' });
    if(leave.employeeId.toString() !== req.user._id.toString()) return res.status(403).json({ message: 'Not allowed' });
    if(leave.status !== 'pending') return res.status(400).json({ message: 'Only pending leaves can be cancelled' });
    await leave.remove();
    res.json({ message: 'Leave cancelled' });
  } catch(err){
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin: get all leaves
router.get('/', auth, role('admin'), async (req, res) => {
  try {
    const leaves = await Leave.find().populate('employeeId','name email').sort({ appliedAt: -1 });
    res.json(leaves);
  } catch(err){
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin: approve
router.put('/:id/approve', auth, role('admin'), async (req, res) => {
  try {
    const leave = await Leave.findById(req.params.id);
    if(!leave) return res.status(404).json({ message: 'Leave not found' });
    if(leave.status !== 'pending') return res.status(400).json({ message: 'Only pending leaves can be reviewed' });
    leave.status = 'approved';
    leave.reviewedBy = req.user._id;
    leave.reviewedAt = new Date();
    await leave.save();
    res.json(leave);
  } catch(err){
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin: reject
router.put('/:id/reject', auth, role('admin'), async (req, res) => {
  try {
    const leave = await Leave.findById(req.params.id);
    if(!leave) return res.status(404).json({ message: 'Leave not found' });
    if(leave.status !== 'pending') return res.status(400).json({ message: 'Only pending leaves can be reviewed' });
    leave.status = 'rejected';
    leave.reviewedBy = req.user._id;
    leave.reviewedAt = new Date();
    await leave.save();
    res.json(leave);
  } catch(err){
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
