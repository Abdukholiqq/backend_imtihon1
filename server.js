const http = require("http")
const PORT = process.env.PORT || 5000;
const Express = require("./lib/express");
const { getCategories , deleteCategories, postCategories} = require("./controllers/categories");
const { getSubCategories , deleteSubCategories, postSubCategories} = require("./controllers/subCategories");
const { getProducts, deleteProducts, queryCategories, postProducts , putProducts} = require("./controllers/products");
const { getAdminDatas } = require("./controllers/admin");
const bodyParser = require("./utils/bodyparser");

function  shopServer  (req,res) { 

    

    const app = new Express(req,res);  
    app.get('/categories',  getCategories)
    app.post("/categories", postCategories);
    app.delete("/categories", deleteCategories);
///////////////////////////////////////////////////////
    app.get("/subcategories", getSubCategories);
    app.post("/subcategories", postSubCategories);
    app.delete("/subcategories", deleteSubCategories);
///////////////////////////////////////////////////////
    // app.get("/products", getProducts);
    app.get("/products", queryCategories);
    app.post("/products", postProducts);
    app.put("/products", putProducts);

    app.delete("/products", deleteProducts);
///////////////////////////////////////////////////////
    app.get("/admin", getAdminDatas);

}

http.createServer(shopServer).listen(5000 , ()=>(`server running in ${PORT}`))