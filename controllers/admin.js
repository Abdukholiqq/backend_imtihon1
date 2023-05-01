const {read,write} = require("../utils/model")

exports.getAdminDatas = (req,res)=>{    
    const getAdminData = read("admin");
    res.end(JSON.stringify(getAdminData));
}
