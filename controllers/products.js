const { read, write, PostData } = require("../utils/model");
const { json } = require("stream/consumers");
exports.getProducts = (req, res) => {
  const products = read("products");
  res.end(JSON.stringify(products));
};
exports.postProducts = async (req, res) => {
  try {
    const data = read("products");
    const { sub_category_id, model, product_name, color, price } = JSON.parse(
      await req.body
    );
    const product_id = data.at(-1).product_id + 1;
    const newData = new PostData(
      product_id,
      sub_category_id,
      model,
      product_name,
      color,
      price
    );
    write("products", [...data, newData]);
  } catch (error) {
    if (error) new Error(error);
  }
};

exports.deleteProducts = async (req, res) => {
  try {
    const { product_id } = JSON.parse(await req.body);

    const products = read("products");

    const unDelCategories = products.filter((c) => c.product_id != product_id);
    write("products", unDelCategories);
    res.setHeader("Content-type", "application/json");
    res.end(JSON.stringify({ status: 200, message: "ok" }));
  } catch (error) {
    res.end(JSON.stringify({ status: 500, message: error.message }));
  }
};

exports.queryCategories = async (req, res) => {
  const category = read("categories");
  const subCategories = read("subCategories");
  const products = read("products");

  if (req.query.sub_category_id && !req.query.model) {
    if (req.query && req.query.sub_category_id != undefined) {
      const subCategoryFilter = await subCategories.filter(
        (items) => items.sub_category_id == req.query.sub_category_id
      );
      subCategoryFilter.map((subId) => {
        subId.categor = category.find(
          (categor) => categor.category_id == category.category_id
        );
        subId.product = products.find(
          (product) => product.sub_category_id == products.sub_category_id
        );
      });
      res.setHeader("Access-control-allow-origin", "*");
      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify(subCategoryFilter));
    }
  }
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  if (req.query.model) {
    if (req.query && req.query.model != undefined) {
      const productFilter = products.filter(
        (items) => items.model == req.query.model
      );
      productFilter.map((productId) => {
        productId.categor = category.find(
          (categor) => categor.category_id == productId.category_id
        );
        productId.subCategor = subCategories.find(
          (subCategor) =>
            subCategor.sub_category_id == productId.sub_category_id
        );
      });
      res.setHeader("Access-control-allow-origin", "*");
      res.writeHead(200, { "content-type": "application/json" });

      res.end(JSON.stringify(productFilter));
    }
  }
  ///////////////////////////////////////////////////////////////////////////////////////////
  if (req.query.category_id) {
    if (req.query && req.query.category_id != undefined) {
      const CategoryFilter = category.filter(
        (items) => items.category_id == req.query.category_id
      );
      CategoryFilter.map((categoryId) => {
        categoryId.categor = subCategories.find(
          (categor) => categor.sub_category_id == categoryId.sub_category_id
        );
        categoryId.product = products.find(
          (product) => product.sub_category_id == categoryId.sub_category_id
        );
      });
      res.setHeader("Access-control-allow-origin", "*");
      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify(CategoryFilter));
    }
  }
  ///////////////////////////////////////////////////////////////////////////////////////////////
  if (req.query.sub_category_id && req.query.model) {
    if (req.query && req.query.sub_category_id != undefined) {
      const subCategoryFilter = subCategories.filter(
        (items) => items.sub_category_id == req.query.sub_category_id
      );
 
      subCategoryFilter.map((subId) => {
        subId.categor = category.find(
          (categor) => categor.category_id == category.category_id
        );
        subId.product = products.find(
          (product) => product.sub_category_id == products.sub_category_id
        );
      });
      res.setHeader("Access-control-allow-origin", "*");
      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify(subCategoryFilter));
    }
  }
};

exports.putProducts = async (req, res) => {
  try {
    const { product_id, product_name } = await req.body;
    const putCategories = read("products");
    let newCategory = putCategories.filter((e) => e.product_id != product_id);
    newCategory.push({ product_id, product_name });
    newCategory.product_name = product_name || newCategory.product_name;
    write("categories", newCategory);
    res.json(200, { status: 200, success: true });
  } catch (error) {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.json(400, { status: 400, message: error.message });
  }
};
