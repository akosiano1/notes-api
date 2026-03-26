const jwt = require('jsonwebtoken');

module.exports = (req,res,next) =>{
    const token = req.header('Authorization')?.split(' ')[1];
     console.log('TOKEN RECEIVED:', token);
     console.log('SECRET:', process.env.JWT_SECRET); 
    if(!token) return res.status(401).json({ message: 'No token found'});
    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        req.user = decoded.id;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Invalid token' });
    }
};