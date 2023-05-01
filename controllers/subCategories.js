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
exports.putSubCategories = async (req,res)=>{
  try {
      const { sub_category_id, category_name } = await req.body;
      const putCategories = read("subCategories");
      let newSubCategory = putCategories.filter(
        (e) => e.sub_category_id != sub_category_id
      );
      newSubCategory.push({ sub_category_id, category_name });
      newSubCategory.category_name = category_name || newSubCategory.category_name;
      write("categories", newSubCategory);
      res.json(200, { status: 200, success: true });
    } catch (error) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.json(400, { status: 400, message: error.message });
    }
  
}