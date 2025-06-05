const express = require("express")
const router = express.Router()

const{addUser,IfUserExists,addReportTime}=require("../Controllers/UserController")
const {verifyToken,createToken,getUserByToken,} =require("../Middleware/auth") 

router.post("/IfUserExists", IfUserExists,createToken)
router.post("/addUser", addUser,createToken)
router.get("/getUserByToken",getUserByToken)
router.post('/addReportTime/:id', verifyToken,addReportTime);


module.exports= router
