const {User}=require('../models/userlogin');
const express=require('express');
const router=express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.get('/',async (require,response)=>{
    const productList=await User.find().select('-passwordHash');
    response.send(productList)
})

router.get('/:id',async (require,response)=>{
    const user=await User.findById(require.params.id).select('-passwordHash');

    if(!user){
        response.status(500).json({message:'the user with the given id'})
    }

    response.send(user)
})

router.post('/',async (require,response)=>{
    let user=new User({
        name:require.body.name,
        email:require.body.email,
        passwordHash:bcrypt.hashSync(require.body.passwordHash, 10),
        phone:require.body.phone,
        isAdmin:require.body.isAdmin,
    })
    user=await user.save();
    if(!user){
        return response.send(404).send('the user cannot be created')
    }

    response.send(user)
})

router.post('/login',async (require,response)=>{
    
   const user=await User.findOne({email:require.body.email});
    if(!user){
        return response.send(400).send('the user not found')
    }
    if(user && bcrypt.compareSync(require.body.password, user.passwordHash)){
        const token=jwt.sign(
            {
                userId:user.id
            },
            'secret'
        )
        response.status(200).send({user:user.email,token:token})
    }else{
        response.status(400).send('password is wrong')
    }
    
})

module.exports=router; 