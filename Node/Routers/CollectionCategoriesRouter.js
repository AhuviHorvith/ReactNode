const express = require("express");
const router = express.Router();


const { getAllCategories } = require("../Controllers/CollectionCategoriesController");
router.get('/getAllCategories', getAllCategories);


module.exports = router;

