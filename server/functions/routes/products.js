const router = require("express").Router();
const {response} = require("express");
const admin = require("firebase-admin");
const db = admin.firestore();

router.post("/create", async (req, res) => {
  try {
    const id = Date.now();
    const data = {
      productId: id,
      productName: req.body.name,
      productCategory: req.body.categories,
      productPrice: req.body.price,
      productImgs: req.body.imgURLs,
    };

    const response = await db.collection("products").doc(`/${id}/`).set(data);
    return res.status(200).send({success: true, data: response});
  } catch (err) {
    return res.send({success: false, msg: err});
  }
});

app.get("/all", async (req, res) => {
  try {
    const query = db.collection("products");
    const resp = [];
    const queryResp = await query.get();
    queryResp.docs.map((value) => {
      resp.push({...value.data()});
    });
    return res.status(200).send({success: true, data: response});
  } catch (err) {
    return res.send({error: err, success: false});
  }
});

module.exports = router;
