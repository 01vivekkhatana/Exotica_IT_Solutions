const express = require('express');
const router = express.Router();
const ViewCount = require('../models/ViewCount');

router.post('/increment-view', async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ error: 'Token is required' });
  }

  try {
    let viewCount = await ViewCount.findOne();
    if (!viewCount) {
      viewCount = new ViewCount();
    }

    viewCount.views += 1;  
    await viewCount.save();

    res.status(200).json({ message: 'View count incremented', views: viewCount.views });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
