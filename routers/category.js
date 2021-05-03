const {Category}=require('../models/category')

const express=require('express');
const router=express.Router();

router.get('/',async (require,response)=>{
    const categoryList=await Category.find();

    if(!categoryList){
        response.status(500).json({success:false})
    }

    response.send(categoryList)
})

router.post('/',async (require,response)=>{
    let category=new Category({
        name:require.body.name,
        icon:require.body.icon,
        color:require.body.color,
       
    })
    category=await category.save();
    if(!category){
        return response.send(404).send('the category cannot be created')
    }

    response.send(category)
})

router.put('/:id',async (require,response)=>{
    const category=await Category.findByIdAndUpdate(
     require.params.id,
     {
        name:require.body.name,
        icon:require.body.icon,
        color:require.body.color,
     }
    )
    
    if(!category){
        return response.send(404).send('the category cannot be created')
    }

    response.send(category)
})

router.delete('/:id',async (require,response)=>{
        Category.findByIdAndRemove(require.params.id).then(category=>{
            if(!category){
                return response.status(200).json({success:true,message:'category delete'})
            }else{
                return response.status(200).json({success:false,message:'category not found'})   
            }
        }).catch(err=>{
            return response.status(200).json({success:false,error:err})   

        })    

})
module.exports=router;