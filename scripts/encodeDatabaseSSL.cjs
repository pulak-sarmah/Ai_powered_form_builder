const fs = require("fs");
const path = require("path");
const data = fs.readFileSync(path.join(__dirname, "../prod-ca-2021.crt"));
const encodedData = data.toString("base64");
console.log(encodedData);
