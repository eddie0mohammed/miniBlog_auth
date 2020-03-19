
const jwt = require('jsonwebtoken');



const checkAuth = (req, res, next) => {

    const token = req.header('x-auth-token');

    if (!token){
        return res.status(401).json({
            status: 'fail',
            error: 'Unauthorized'
        });
    }


    try{
    
        //verify token
        const decoded = jwt.verify(token, 'JWT_SECRET');
        
        //add user from payload
        req.user = decoded;
        next();
    }catch(err){
        console.log(err);
        res.status(400).json({
            status: 'fail',
            error: err,
            msg: 'Invalid token'
        });
    }
}

module.exports = checkAuth;