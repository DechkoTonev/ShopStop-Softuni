const Category = require("../models/Category")
const Product = require("../models/Product")

module.exports.addGet = (req, res) => {
    res.render("category/add")
}

module.exports.getProductsByCategory = (req, res) => {
    let products = []

    Category.findOne({name: req.params.name})
        .populate("products")
        .then((categoryProducts) => {
            if(!categoryProducts){
                res.sendStatus(404)
                return
            }
            res.render("category/productByCategory", {category: categoryProducts})
        })
}

module.exports.addPost = (req, res) => {
    let category = req.body
    Category.create(category).then(() => {
        res.redirect("/")
    })
}
