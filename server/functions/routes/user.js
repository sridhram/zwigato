// eslint-disable-next-line new-cap
const router = require("express").Router();
const admin = require("firebase-admin");

router.get("/", (req, res) => {
  res.send("inside user route");
});

router.get("/auth/apicallback", async (req, res) => {
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

module.exports = router;
