const db = require("../util/database");

module.exports.findUserById = async function (uid) {
  const docRef = db.collection("users").doc(uid);
  const doc = await docRef.get();
  if(!doc.exists){
      return null;
  }
  else{
      return doc.data();
  }
};
