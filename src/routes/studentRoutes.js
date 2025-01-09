const express = require('express');
const router = express.Router();

// Exemple de route
router.get('/', (req, res) => {
    res.send('Student routes are working!');
});

module.exports = router;
