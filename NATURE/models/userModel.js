const mongoose=require('mongoose');
const validator=require('validator');
const bcrypt=require('bcryptjs')
const userSchema=new mongoose.Schema({
    name:{
      type:String,
      required:[true,'Please Tell us Your Name'],
    },
    email:{
        type:String,
        required:[true,'Please Tell us Your'],
        unique:true,
        lowercase:true,
        validate:[validator.isEmail,'Please enter a valid email']           
    },
    photo:{
        type:String,
    },
    password:{
        type:String,
        required:[true,'Please provide a password'],
        minlength:8
    },
    passwordConfirm:{
        type:String,
        required:[true,'Please confirm your password'],
        validate:{
            validator:function(el){
                return el===this.password;
            },
            message:'Passwords are not the same'
        }
    }
});

userSchema.pre('save',async function(next){
    if(!this.isModified('password')) return next();
    this.password=await bcrypt.hash(this.password,12);
    this.passwordConfirm=undefined;
    next();
})


const User=mongoose.model('User',userSchema);

module.exports=User;