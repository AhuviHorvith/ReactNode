const express=require("express");
const router=express.Router();

const { getAllRevenueById, addRevenue,deleteRevenue } = require("../Controllers/RevenueController");
const {verifyToken} =require("../Middleware/auth") 

router.get("/getAllRevenueById/:id", verifyToken,getAllRevenueById);        
router.post("/addRevenue/:id",verifyToken, addRevenue);
router.delete("/deleteRevenue/:id/:revenueId",deleteRevenue);

module.exports=router;       