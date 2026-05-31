const express = require('express');
const router = express.Router();
const authController = require('../controllers/userdatabase');  

router.post('/signup', authController.signup);

router.get('/signup', (req, res) => {
    res.send('Signup route is reachable');
});

module.exports = router;