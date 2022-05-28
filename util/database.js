//$env:GOOGLE_APPLICATION_CREDENTIALS="D:\LICENTA\Back-end\credentials\licenta-cloud-credentials.json"
const Firestore = require("@google-cloud/firestore");

const db = new Firestore({
  projectId: "licenta-351510",
});

module.exports = db;
