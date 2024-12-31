const mongoose = require('mongoose');

const captainSchema = new mongoose.Schema({
    fullname:{
        firstname:{
            type:String,
            required:true,
            minlength:[3, 'First name should be at least 3 characters long'],
        },
        lastname:{
            type:String,
            required:true,
            minlength:[3, 'Last name should be at least 3 characters long'],
        }
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
    },
    password:{
        type:String,
        required:true,
        select:false,
        minlength:[6, 'Password should be at least 6 characters long'],
    },
    socketId:{
        type:String,
    },
    status:{
        type:String,
        enum:['active','inactive'],
        default:'inactive',
    },

    vehicle:{
        color:{
            type:String,
            required:true,
            minlength:[3, 'Color should be at least 3 characters long'],
        },
        plate:{
            type:String,
            required:true,
            minlength:[3, 'Plate should be at least 3 characters long'],
        },
        capacity:{
            type:Number,
            required:true,
            min:[1, 'Capacity should be at least 1 person'],
        },
        vehicleType:{
            type:String,
            required:true,
            enum:['car','motorcycle','auto'],
        }
    },
    
    location:{
        lat:{
            type:Number
        },
        lng:{
            type:Number
        }
    }
});



const Captain = mongoose.model('Captain', captainSchema);

module.exports = Captain;