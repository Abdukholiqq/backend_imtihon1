const url = require("url");
const queryString = require("querystring");
const bodyParser = require("../utils/bodyparser");
class Express {
  constructor(req, res) {
    this.req = req;
    this.res = res;

    this.req.body = new Promise((resolve, reject) => {
      let str = "";
      this.req.on("data", (chunk) => (str += chunk));
      this.req.on("end", () => {
        resolve(str);
      });
    });
  }
  get(route, callback) {
    const { pathname, query } = url.parse(this.req.url);

    this.req.query = queryString.parse(query);
    if (pathname == route && this.req.method == "GET") {
      callback(this.req, this.res);
    }
  }
  post(route, callback) {
    if (this.req.url == route && this.req.method == "POST") {
      callback(this.req, this.res);
    }
  }
    put(route, callback) {
      if (this.req.url.split("/")[1] == route && this.req.method == "PUT") {
        callback(this.req, this.res);
      }
    }


  delete(route, callback) {
    if (this.req.url == route && this.req.method == "DELETE") {
      callback(this.req, this.res);
    }
  }

  
}
module.exports = Express;
