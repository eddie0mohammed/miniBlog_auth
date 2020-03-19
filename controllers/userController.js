
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');



//GET ALL USERS
const getAllUsers = async (req, res, next) => {

    try{

        const users = await User.find();
    
        res.status(200).json({
            status: 'success',
            data: {
                users: users
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


const createUser = async (req, res, next) => {


    try{


        const {email, password, name} = req.body;

        if (!email || !password || !name){
            return res.status(400).json({
                status: 'fail',
                error: 'Name, Email and Passowrd required'
            });
        }

        //check for existing user
        const user = await User.findOne({email: email});
        if (user){
            return res.status(400).json({
                status: 'fail',
                error: 'User already exists'
            });
        }

        const newUser = new User({
            name: name,
            email: email,
            password: password
        });

        //hash pw
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, async (err, hash) => {
                if (err){
                    throw err;
                }
                newUser.password = hash;

                try{
                    const user = await newUser.save();

                    jwt.sign( {id: user._id}, 'JWT_SECRET', {expiresIn: 3600}, (err, token) => {
                        if (err){
                            throw err;
                        }

                        res.status(201).json({
                            status: 'success',
                            token: token,
                            data: {
                                user: user
                            }
                        });
                    });

                }catch(err){
                    console.log(err);
                    res.status(400).json({
                        status: 'fail',
                        error: err
                    });
                }
                
            });
        })

    }catch(err){
        console.log(err);
        res.status(400).json({
            status: 'fail',
            error: err
        });
    }
}





module.exports = {
    getAllUsers: getAllUsers,
    createUser: createUser,
}