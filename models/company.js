const { FieldValue } = require("@google-cloud/firestore");
const db = require("../util/database");

module.exports.postCompany = async function (data, uid) {
  try {
    const res = await db.collection("companies").doc(uid).set(data);
    return true;
  } catch {
    return false;
  }
};

module.exports.findCompanyById = async function (uid) {
  const docRef = db.collection("companies").doc(uid);
  const doc = await docRef.get();
  if (!doc.exists) {
    return null;
  } else {
    return doc.data();
  }
};

module.exports.uploadImageProfile = async function (imageUrl, uid) {
  const docRef = db.collection("companies").doc(uid);
  try {
    const res = await docRef.update({ imageUrl: imageUrl });
    return true;
  } catch {
    return false;
  }
};
