// eslint-disable-next-line new-cap
const router = require("express").Router();
const admin = require("firebase-admin");

router.get("/", (req, res) => {
  res.send("inside user route");
});

router.get("/auth", async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(500).send({msg: "Token not found"});
  }

  const token = req.headers.authorization.split(" ")[1];
  try {
    const decodedVal = await admin.auth().verifyIdToken(token);
    if (!decodedVal) {
      return res.status(500).send({msg: "Unauthorized Access"});
    }
    return res.status(200).json({data: decodedVal});
  } catch (err) {
    return res.send({msg: `Error : ${err}`});
  }
});

const usersList = [];
const getAllUsers = async (nextPageToken) => {
  admin.auth()
      .listUsers(1000, nextPageToken)
      .then((listUsersResult) => {
        listUsersResult.users.forEach((userRecord) => {
          usersList.push(userRecord.toJSON());
        });
        if (listUsersResult.pageToken) {
        // List next batch of users.
          getAllUsers(listUsersResult.pageToken);
        }
      })
      .catch((error) => {
        console.log("Error listing users:", error);
      });
};


router.get("/all", async (req, res) => {
  try {
    if (usersList.length == 0) {
      await getAllUsers();
    }
    return res.status(200).json({data: usersList, count: usersList.length});
  } catch (err) {
    return res.status(404).send({msg: err});
  }
});

module.exports = router;
