const express = require('express')
const router = express.Router()
const Product = require('../models/Product')

router.post('/add',async(req,res)=>{
    try{
        const {productName,productPrice,productUnit,productDescription} = req.body
        const productExist = await Product.findOne({productName})
        if(productExist){
            return res.json({
                status:false,
                message:'Product already exists !!'
            })
        }
        const productObj = new Product({productName,productPrice,productUnit,productDescription})
        await productObj.save()
        res.json({
            status:true,
            message:'Product added successfully !!'
        })
    }catch(err){
        res.json({
            status:false,
            message:err
        })
    }
})

router.get('/get',async(req,res)=>{
    try{
        // find()
        const results = await Product.find()
        res.json({
            status:true,
            message:results
        })
        
    }catch(err){
        res.json({
            status:false,
            message:err
        })
    }
})

router.delete('/delete/:id',async(req,res)=>{
    // findByIdAndDelete
    try{
        const id = req.params.id
        await Product.findByIdAndDelete(id)
        res.json({
            status:true,
            message:'Product deleted successfully !!'
        })

    }catch(err){
        res.json({
            status:false,
            message:err
        })
    }
})

router.put('/update/:id',async(req,res)=>{
    try{
        const id = req.params.id
        // findByIdAndUpdate(id,body,{new:true})
        const updated = await Product.findByIdAndUpdate(id,req.body,{'new':true})
        res.json({
            status:true,
            message:'Product updated successfully !!'
        })
    }catch(err){
        res.json({
            status:false,
            message:err
        })
    }
})

module.exports = router