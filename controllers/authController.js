

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../models/user');



const login = async (req, res, next) => {

    try{
        const {email, password} = req.body;

        if (!email || !password){
            return res.status(400).json({
                status: 'fail',
                error: 'Email and Password required'
            });
        }

        //check for existing user
        const user = await User.findOne({email: email});

        if (!user){
            return res.status(400).json({
                status: 'fail',
                error: 'User not found'
            });
        }

        try{
            //validate password
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch){
                return res.status(400).json({
                    status: 'fail',
                    error: 'Invalid credentials'
                });
            }

            jwt.sign({ id: user._id}, 'JWT_SECRET', {expiresIn: 3600}, (err, token) => {
                if (err){
                    throw err;
                }
                
                res.status(200).json({
                    status: 'success',
                    token: token,
                    data: {
                        user: user
                    }
                })
            })


        }catch(err){
            console.log(err);
            return res.status(400).json({
                status: 'fail',
                error: err
            });
        }
        

    }catch(err){
        console.log(err);
        res.status(400).json({
            status: 'fail',
            error: err
        });
    }

}


const getUser = async (req, res, next) => {

    try{

        const user = await User.findById(req.user.id)
                            .select('-password');
    
        res.status(200).json({
            status: 'success',
            data: {
                user: user
            }
        });



    }catch(err){
        console.log(err);
        res.status(400).json({
            status: 'fail',
            error: err
        });
    }


}


module.exports = {
    login: login,
    getUser: getUser
}