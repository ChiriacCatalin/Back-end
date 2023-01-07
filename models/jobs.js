const { use } = require("../routes/jobs");
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
      .startAfter(+lastDate)
      .limit(5);
  } else {
    query = db
      .collection(`companies/${uid}/jobs`)
      .orderBy("date", "desc")
      .limit(5);
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

module.exports.findAllJobs = async function (queryParams) {
  let query = setQuery(queryParams);
  try {
    const querySnapshot = await query.get();
    return querySnapshot.docs.map((doc) => {
      const id = doc.id;
      // console.log(doc.data().jobTitle);
      return { id, ...doc.data() };
    });
  } catch (err) {
    console.log(err);
    return null;
  }
};

function setQuery(queryParams) {
  let query = db.collectionGroup("jobs");

  if (queryParams.date && queryParams.date !== 'null') {
    let dateLimit = Date.now() - +queryParams.date;
    query = query.where("date", ">=", dateLimit);
  }
  if (queryParams.experienceLevel && queryParams.experienceLevel !== 'null')
    query = query.where("experienceLevel", "==", queryParams.experienceLevel);
  if (queryParams.jobType && queryParams.jobType !== 'null') {
    query = query.where("jobType", "==", queryParams.jobType);
  }
  if (queryParams.onSiteRemote && queryParams.onSiteRemote !== 'null') {
    query = query.where("onSiteRemote", "==", queryParams.onSiteRemote);
  }
  if (queryParams.country && queryParams.country !== 'null' && queryParams.country !== 'Any') {
    query = query.where("country", "==", queryParams.country);
  }
  if (queryParams.city && queryParams.city !== 'null' && queryParams.city !== 'Any') {
    query = query.where(
      "filterCity",
      "==",
      queryParams.city.toLowerCase().replace(/\s+/g, " ").trim()
    );
  }

  query = query.orderBy("date", "desc");
  if (queryParams.lastDate) {
    query = query.startAfter(+queryParams.lastDate);
  }
  return query.limit(5);
}

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

module.exports.addApplicant = async function (companyId, jobId, userId, data) {
  try {
    const res = await db
      .collection("companies")
      .doc(companyId)
      .collection("jobs")
      .doc(jobId)
      .collection("applicants")
      .doc(userId)
      .set(data);
    return true;
  } catch {
    return false;
  }
};

module.exports.deleteApplicantById = async function (companyId, jobId, userId) {
  const docRef = db
    .collection("companies")
    .doc(companyId)
    .collection("jobs")
    .doc(jobId)
    .collection("applicants")
    .doc(userId);
  try {
    const res = await docRef.delete();
    return true;
  } catch (err) {
    return false;
  }
};

module.exports.getAllJobAplicants = async function (
  companyId,
  jobId,
  lastDate
) {
  let query = db
    .collection("companies")
    .doc(companyId)
    .collection("jobs")
    .doc(jobId)
    .collection("applicants")
    .orderBy("date", "desc");
  if (lastDate) {
    query = query.startAfter(+lastDate);
  }
  query = query.limit(5);
  try {
    const snapshot = await query.get();
    return snapshot.docs.map((doc) => {
      const id = doc.id;
      return { id, ...doc.data() };
    });
  } catch (err) {
    console.log(err);
    return null;
  }
};

//for testing purposes
module.exports.getAllAplicants = async function (jobId) {
  query = db.collectionGroup("applicants");
  try {
    const querySnapshot = await query.get();
    return querySnapshot.docs.map((doc) => {
      return doc.data();
    });
  } catch (err) {
    console.log(err);
    return null;
  }
};
