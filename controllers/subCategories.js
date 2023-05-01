const { read, write, PostSubCategory } = require("../utils/model");


exports.getSubCategories = (req, res) => {
  const subCategories = read("subCategories"); 
  const products = read("products") 
  try {
    const result = subCategories.map((item)=>{
      return {
        ...item,
         products: products.filter(
          (Id)=>
         Id.sub_category_id == item.sub_category_id
        )
      }
      }) 
      res.end(JSON.stringify(result));
    } catch (error) {
      if(error) { new Error(error)}
    }

};
 
exports.postSubCategories = async (req, res) => {
  try {
    const data = read("subCategories");
    const {category_id , sub_category_name } = JSON.parse(await req.body); 
    const sub_category_id = data.at(-1).sub_category_id + 1; 
    const newSubCategory = new PostSubCategory(
       sub_category_id, category_id, sub_category_name
       );
    write("subCategories", [...data, newSubCategory]);
  } catch (error) {
    if (error) new Error(error);
  }
};
///
exports.deleteSubCategories = async (req, res) => {
   try {
     const { sub_category_id } = JSON.parse(await req.body);

     const subCategories = read("subCategories");

     const unDelCategories = subCategories.filter(
       (c) => c.sub_category_id != sub_category_id
     );
     write("subCategories", unDelCategories);
     res.setHeader("Content-type", "application/json");
     res.end(JSON.stringify({ status: 200, message: "ok" }));
   } catch (error) {
     res.end(JSON.stringify({ status: 500, message: error.message }));
   } 
};