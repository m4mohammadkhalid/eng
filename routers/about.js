const {About}=require('../models/about');
const express=require('express');
const router=express.Router();


router.get('/',async (require,response)=>{
    const productList=await About.find();
    response.send(productList)
})

router.post('/',(require,response)=>{
    const product=new About({
        name:require.body.name,
        description:require.body.description,
       
    })
    product.save().then((createdProduct=>{
        response.status(201).json(createdProduct)
    })).catch((err)=>{
        response.status(500).json({
            error:err,
            success:false
        })
    })
    
})

router.delete('/:id',async (require,response)=>{
    About.findByIdAndRemove(require.params.id).then(about=>{
        if(!about){
            return response.status(200).json({success:true,message:'about delete'})
        }else{
            return response.status(200).json({success:false,message:'about not found'})   
        }
    }).catch(err=>{
        return response.status(200).json({success:false,error:err})   

    })    

})
router.put('/:id',async (require,response)=>{
    const about=await About.findByIdAndUpdate(
     require.params.id,
     {
        name:require.body.name,
        description:require.body.description,
     }
    )
    
    if(!about){
        return response.send(404).send('the about cannot be created')
    }

    response.send(about)
})
module.exports=router;