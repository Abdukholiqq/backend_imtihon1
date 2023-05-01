const http = require("http")
const PORT = process.env.PORT || 5000;
const Express = require("./lib/express");
const { getCategories , deleteCategories, postCategories, putCategories} = require("./controllers/categories");
const { getSubCategories , deleteSubCategories, postSubCategories, putSubCategories} = require("./controllers/subCategories");
const { getProducts, deleteProducts, queryCategories, postProducts , putProducts} = require("./controllers/products");
const { getAdminDatas } = require("./controllers/admin");
const bodyParser = require("./utils/bodyparser");

function  shopServer  (req,res) { 
/*



categoryId = category_id
categoryName = category_name;

subcategoryId = subcategory_id;
subCategoryName = sub_category_name;
 
productId = product_id;
productName = product_name;

*/

    const app = new Express(req,res);  
    app.get('/categories',  getCategories)
    app.put("/categories", putCategories);
    app.post("/categories", postCategories);
    app.delete("/categories", deleteCategories);
 
    app.get("/subcategories", getSubCategories);
    app.put("/subcategories", putSubCategories);
    app.post("/subcategories", postSubCategories);
    app.delete("/subcategories", deleteSubCategories); 

    app.put("/products", putProducts);
    app.get("/products", queryCategories);
    app.post("/products", postProducts);
    app.put("/products", putProducts);
    app.delete("/products", deleteProducts); 

    app.get("/admin", getAdminDatas);

}

http.createServer(shopServer).listen(5000 , ()=>(`server running in ${PORT}`))