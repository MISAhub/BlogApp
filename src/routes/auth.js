const express = require('express');
const router = express.Router();
const { signupController } = require('../controllers/userdatabase');  

router.post('/signup', signupController);

router.get('/signup', (req, res) => {
    res.send('Signup route is reachable');
});

module.exports = router;