const db = require("../util/database");

module.exports.createJob = async function (uid, data) {
  try {
    const res = await db
      .collection("companies")
      .doc(uid)
      .collection("jobs")
      .add(data);
    return true;
  } catch {
    return false;
  }
};

module.exports.findJobsByCompanyId = async function (uid, lastDate) {
  let query;
  if (lastDate) {
    query = db
      .collection(`companies/${uid}/jobs`)
      .orderBy("date", "desc")
      .startAt(lastDate)
      .limit(4);
  } else {
    query = db
      .collection(`companies/${uid}/jobs`)
      .orderBy("date", "desc")
      .limit(4);
  }
  try {
    const snapshot = await query.get();
    // console.log(snapshot.docs[0].data());
    return snapshot.docs.map((doc) => {
      const id = doc.id;
      return { id, ...doc.data() };
    });
  } catch (err) {
    console.log(err);
    return null;
  }
};

module.exports.findAllJobs = async function (lastDate) {
  let query;
  if (lastDate) {
    query = db
      .collectionGroup("jobs")
      .orderBy("date", "desc")
      .startAfter(+lastDate)
      .limit(4);
  } else {
    query = db.collectionGroup("jobs").orderBy("date", "desc").limit(4);
  }

  try {
    const querySnapshot = await query.get();
    return querySnapshot.docs.map((doc) => {
      const id = doc.id;
      console.log(doc.data().jobTitle);
      return { id, ...doc.data() };
    });
  } catch (err) {
    console.log(err);
    return null;
  }
};

module.exports.deleteJobById = async function (companyId, jobId) {
  const docRef = db
    .collection("companies")
    .doc(companyId)
    .collection("jobs")
    .doc(jobId);
  try {
    const res = await docRef.delete();
    return true;
  } catch (err) {
    return false;
  }
};

module.exports.updateJobById = async function (companyId, jobId, data) {
  try {
    const res = await db
      .collection("companies")
      .doc(companyId)
      .collection("jobs")
      .doc(jobId)
      .set(data);
    return true;
  } catch {
    return false;
  }
};
