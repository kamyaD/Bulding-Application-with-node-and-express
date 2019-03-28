const express =require('express');
const db = require("../config/database");
const debug = require("debug")("app:adminRouter");
const ChildrenModel = require('../modules/ChildrenModel');

const adminRouter = express.Router();

const children = {
    child_id: 13,
    name: 'Carolyn Atieno',
    age: 8,
    gender: 'Female',
    back_ground:
     'Save the Children comprises Save the Children International and 28 member organisations working to deliver change for children in around 120 countries.Save the Children International delivers our programmes internationally to ensure we achieve the greatest possible impact for children. We have a small centre and five regional offices./n Our members work together to campaign for better outcomes for children, and to deliver programmes at scale to support children.',
    image: 'child4.jpg'
}

function router(nav){
    adminRouter.route('/')
    .get((req,res)=>{
        let {child_id,name,age,gender,back_ground,image}=children;

        // Inserting data into children table in the library database
        ChildrenModel.create({
            child_id,
            name,
            age,
            gender,
            back_ground,
            image,
        })
        .then(children=> res.render("adminView",{
            nav,
            title: "Love the Children ",
            children: children,
        }))
        .catch(err=>console.log(err));

    });
    return adminRouter;

}

module.exports =  router;
