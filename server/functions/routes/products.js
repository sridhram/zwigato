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
    return res.status(200).send({success: true, data: data});
  } catch (err) {
    return res.send({success: false, msg: err});
  }
});

router.get("/all", async (req, res) => {
  try {
    const query = db.collection("products");
    const resp = [];
    const queryResp = await query.get();
    queryResp.forEach((value) => {
      resp.push(value.data());
    });
    return res.status(200).send({success: true, data: resp});
  } catch (err) {
    return res.send({error: err, success: false});
  }
});

router.delete("/:productId", async (req, res) => {
  const productId = req.params.productId;
  try {
    const result = await db.collection("products")
        .doc(`/${productId}/`)
        .delete();
    return res.status(200).send({success: true, msg: result});
  } catch (err) {
    return res.send({success: false, error: err});
  }
});

module.exports = router;
