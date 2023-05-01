 
const { readFileSync, writeFileSync } = require("fs");
const { resolve, join } = require("path");

function read(fileName) {
  const data = readFileSync(join(resolve("database"), fileName + ".json"));
  return JSON.parse(data);
}

function write(fileName, data) {
  writeFileSync(
    join(resolve("database"), fileName + ".json"),
    JSON.stringify(data, null, 4)
  );
  return true;
}


class PostData {
  constructor(product_id, sub_category_id, model, product_name, color, price) {
    (this.product_id = product_id),
      (this.sub_category_id = sub_category_id),
      (this.model = model),
      (this.product_name = product_name),
      (this.color = color),
      (this.price = price);
  }
}
class PostCategory {
  constructor(category_id, category_name) {
    (this.category_id = category_id), (this.category_name = category_name);
  }
}
class PostSubCategory {
  constructor(sub_category_id, category_id , sub_category_name ) {
     this.sub_category_id = sub_category_id;
     this.category_id = category_id ;
     this.sub_category_name = sub_category_name;
  }
}
module.exports = {
  read,
  write,
  PostData,
  PostCategory,
  PostSubCategory,
};
