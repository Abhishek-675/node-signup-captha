const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.authenticate = async (req, res, next) => {
    try {
        const authHeader = req.header('Authorization');
        console.log(authHeader)
        const token = authHeader.split(' ')[1]
        console.log('access token:',token);
        if (token == null) return res.status(401).json({message: 'Token not found'})

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user)=>{
            if(err) return res.status(403).json({message: 'Token invalid'})
            console.log('user:', user)
            const userDb= await User.findByPk(user.id);
            req.user = userDb;
            next();
        });
    } catch(err) {
        console.log(err);
        return res.status(500).json({success: false});
    }
}

