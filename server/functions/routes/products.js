const router = require("express").Router();
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
