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

// we use batch writes to make sure that we don't have inconsistent data in case of interruption
module.exports.updateDuplicateProfile = async function (imageUrl, uid) {
  const batch = db.batch();
  const docRef = db.collection("companies").doc(uid).collection("jobs").where("companyId", "==", uid);
  docRef.get().then((response) => {
    response.docs.forEach((doc) => {
      const documentRef = db.collection("companies").doc(uid).collection("jobs").doc(doc.id);
      batch.update(documentRef, { imgUrl: imageUrl });
    });
    batch.commit().then((res) => {
      return true;
    });
  });
};

module.exports.updateCompanyFields = async function (uid, fieldName, obj) {
  const docRef = db.collection("companies").doc(uid);
  try {
    let res;
    switch (fieldName) {
      case "mainInfo":
        res = await docRef.update({
          name: obj.name,
          companyVideo: obj.companyVideo,
          industry: obj.industry,
          salesPitch: obj.salesPitch,
          headquarters: obj.headquarters,
        });
        break;
      case "about":
        res = await docRef.update({
          industry: obj.industry,
          headquarters: obj.headquarters,
          aboutUs: obj.aboutUs,
          companySize: obj.companySize,
          founded: obj.founded,
          contact: obj.contact,
          companyAboutVideo: obj.companyAboutVideo,
          website: obj.website,
        });
        break;
    }
    return true;
  } catch {
    return false;
  }
};
