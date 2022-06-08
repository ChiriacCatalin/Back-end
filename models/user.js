const { FieldValue } = require("@google-cloud/firestore");
const db = require("../util/database");

module.exports.findUserById = async function (uid) {
  const docRef = db.collection("users").doc(uid);
  const doc = await docRef.get();
  if (!doc.exists) {
    return null;
  } else {
    return doc.data();
  }
};

module.exports.postUser = async function (data, uid) {
  try {
    const res = await db.collection("users").doc(uid).set(data);
    return true;
  } catch {
    return false;
  }
};

module.exports.uploadImageProfile = async function (imageUrl, uid) {
  const docRef = db.collection("users").doc(uid);
  try {
    const res = await docRef.update({ "mainInfo.imageUrl": imageUrl });
    return true;
  } catch {
    return false;
  }
};

module.exports.updateUserFields = async function (uid, fieldName, obj) {
  const docRef = db.collection("users").doc(uid);
  try {
    let res;
    switch (fieldName) {
      case "jobs":
        res = await docRef.update({ jobs: FieldValue.arrayUnion(obj) });
        break;
      case "projects":
        res = await docRef.update({ projects: FieldValue.arrayUnion(obj) });
        break;
      case "schools":
        res = await docRef.update({ schools: FieldValue.arrayUnion(obj) });
        break;
    }
    return true;
  } catch {
    return false;
  }
};

module.exports.deleteUserFields = async function (uid, fieldName, obj) {
  const docRef = db.collection("users").doc(uid);
  try {
    let res;
    switch (fieldName) {
      case "jobs":
        res = await docRef.update({ jobs: FieldValue.arrayRemove(obj) });
        break;
      case "projects":
        res = await docRef.update({ projects: FieldValue.arrayRemove(obj) });
        break;
      case "schools":
        res = await docRef.update({ schools: FieldValue.arrayRemove(obj) });
        break;
    }
    return true;
  } catch (err) {
    return false;
  }
};
