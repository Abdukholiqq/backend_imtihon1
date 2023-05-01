const { read, write, PostCategory } = require("../utils/model");

exports.getCategories = (req, res) => {
  const categories = read("categories");
  const subCategories = read("subCategories");
  try {
    const result = categories.map((item) => {
      return {
        ...item,
        subCategories: subCategories.filter(
          (Id) => Id.category_id == item.category_id
        ),
      };
    });
    res.end(JSON.stringify(result));
  } catch (error) {
    if (error) {
      new Error(error);
    }
  }
};

exports.postCategories = async (req, res) => {
  try {
    const data = read("categories");
    const { category_name } = JSON.parse(await req.body);
    const category_id = data.at(-1).category_id + 1;
    const newCategory = new PostCategory(category_id, category_name);
    write("categories", [...data, newCategory]);
  } catch (error) {
    if (error) new Error(error);
  }
};
///
exports.deleteCategories = async (req, res) => {
  try {
    const { categoryId } = JSON.parse(await req.body);

    const categories = read("categories");

    const unDelCategories = categories.filter(
      (c) => c.category_id != categoryId
    );
    write("categories", unDelCategories);
    res.setHeader("Content-type", "application/json");
    res.end(JSON.stringify({ status: 200, message: "ok" }));

  } catch (error) {
    res.end(JSON.stringify({ status: 500, message: error.message }));
  } 
};
