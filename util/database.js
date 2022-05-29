//$env:GOOGLE_APPLICATION_CREDENTIALS="D:\LICENTA\Back-end\credentials\licenta-cloud-credentials.json"
const Firestore = require("@google-cloud/firestore");

const db = new Firestore({
  projectId: "licenta-351510",
});

module.exports = db;

// async function createUser() {
//   const docRef = db.collection("users").doc("Catalin");
//   await docRef.set({
//     name: "Chiriac Catalin",
//     birtdate: "10/05/2005",
//     email: "chiriac13@yahoo.com",
//     address: "Iasi, Iasi, Romania",
//     profileImageUrl: "someUrl",
//   });
// }

// createUser();
