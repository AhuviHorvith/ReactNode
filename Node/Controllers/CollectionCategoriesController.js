const CollectionCategories=require("../Models/CollectionCategories")

//הוספת קטגוריה
async function addCategoryForList(req, res) {
 
    try {
        // יצירת קטגוריה חדשה
        let newCategory = new CollectionCategories(req.body);
        await newCategory.save();
        res.send({ message: "created successful", category: newCategory });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}
//שליפת כל הקטגוריות
async function getAllCategories(req, res) {

    try{
        let arrC = await CollectionCategories.find()
        res.status(200).send(arrC);}
        catch (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
        }
      
}
//שליפת קטגוריה לפי הId
async function getCategoryById(req, res) {
    try {
        const id = req.params.categoryId;
        const category = await CollectionCategories.findOne({_id: id});

        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        return res.status(200).json(category);
    } catch (error) {
        console.error("Error fetching category:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}


module.exports={getAllCategories}