let products = []
let count = 1

module.exports.products = {}

module.exports.products.getAll = () =>{
    return products
}

module.exports.products.add = (product) =>{
    product.id = count++;
    products.push(product)
}

module.exports.products.findByName = (name, products) => {
    let product = null
    for(let p of products){
        if (p.name.toLowerCase().indexOf(name) > -1){
            return p
        }
    }

    return product
}