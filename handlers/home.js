const url = require("url")
const fs = require("fs")
const path = require("path")
const qs = require("querystring")
const database = require("../config/database.js")

module.exports = (req, res) => {
    req.pathname = req.pathname || url.parse(req.url).pathname

    if (req.pathname === "/" && req.method === "GET") {
        //"path" module is just utility module for editing file paths
        let filePath = path.normalize(
            path.join(__dirname, "../views/home/index.html")
        )

        fs.readFile(filePath, (err, data) => {
            if (err){
                console.log(err)
                res.writeHead(404, {
                    "Content-Type": "text/plan"
                })

                res.write("404 not found!")
                res.end()
                return
            }

            res.writeHead(200, {
                "Content-Type": "text/html"
            })

            let queryData = qs.parse(url.parse(req.url).query)

            let products = database.products.getAll()

            console.dir(products)

            if (queryData.query != null){
                products = products.filter(prod => {
                        return database.products.findByName(queryData.query.toLowerCase(), products)
                    }
                )
            }

            console.dir(products)

            let content = ""

            for(let product of products){
                content +=
                    `<div class="product-card">
                        <img class="product-img" src="${product.image}">
                        <h2>${product.name}</h2>
                        <p>${product.description}</p>
                     </div>`
            }

            let html = data.toString().replace("{content}", content)

            res.write(html)
            res.end()
        })
    } else {
        return true
    }

}