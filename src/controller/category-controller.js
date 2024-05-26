const Category = require('../models/category-model')
const logger = require("../config/logger");

const addCategory = async(req, res) => {
    const name = req?.body?.name
    const topLevelCategoryId = req?.body?.topLevelCategoryId
    if (topLevelCategoryId){
        const topLevelCategory = await Category.findById(topLevelCategoryId)

        if (!topLevelCategory) {
            return res.status(409).json({
                message : `Top Level Category Id is not valid`
            })
        }
    }
    
    const category = new Category({
        name : name,
        topLevelCategoryId : topLevelCategoryId
    })

    try {
        const createdCategory = await category.save();
        logger.info(`New category created with Id: ${createdCategory._id}`);
        return res.status(201).json({
          categoryId: createdCategory._id,
          message: "Category created successfully",
        });
    } catch (error) {
        logger.error(`Error: ${error.message}`);
        return res.status(500).json({
          message: "An error occured!",
          error: error.message,
        });
    }
}

module.exports = {
    addCategory
}