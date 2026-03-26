const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');


//REGISTRATION

router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const exists = await User.findOne({ email });
        if(exists) return res.status(400).json({ message: 'Email already exist' });
    
        const hashed = await bcrypt.hash(password, 10);
        const user = await User.create({username, email, password: hashed});
        
        const token = jwt.sign({id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d'});
        res.status(200).json({ token, user: {id: user._id, username, email } });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


//LOGIN
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if(!user) return res.status(400).json({ message: 'Invalid Credentials'});

        const compare = bcrypt.compare(password, user.password);
        if(!compare) return res.status(401).json({ message: 'Invalid Password'});

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'});
        console.log('SIGN SECRET:', process.env.JWT_SECRET);
        res.json({ token, user: { id: user._id, username: user.username, email } });
        

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;