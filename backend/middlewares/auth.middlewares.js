const userModel = require('../models/User.models');
const captainModel = require('../models/captain.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const BlacklistToken = require('../models/blackListToken.model');

module.exports.authUser=async(req,res,next)=>{
    try{
        const token=req.cookies.token || req.headers.authorization.split(' ')[1];
        if(!token){
            return res.status(401).json({error:'Unauthorized'});
        }

        const isBlacklisted=await BlacklistToken.findOne({token:token});
        if(isBlacklisted){
            return res.status(401).json({error:'Unauthorized'});
        }


        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        if(!decoded){
            return res.status(401).json({error:'Unauthorized'});
        }
        const user=await userModel.findById(decoded._id);
        req.user=user;
        next();
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'});
    }
}

module.exports.authCaptain=async(req,res,next)=>{
    try{
        const token=req.cookies.token || req.headers.authorization.split(' ')[1];
        if(!token){
            return res.status(401).json({error:'Unauthorized'});
        }

        const isBlacklisted=await BlacklistToken.findOne({token:token});
        if(isBlacklisted){
            return res.status(401).json({error:'Unauthorized'});
        }


        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        if(!decoded){
            return res.status(401).json({error:'Unauthorized'});
        }
        const captain=await captainModel.findById(decoded._id);
        req.captain=captain;
        next();
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'});
    }
}