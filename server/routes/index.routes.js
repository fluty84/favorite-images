const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.use("/auth", require('./auth.routes'))
router.use("/user", require('./user.routes'))
router.use("/images", require('./images.routes'))


module.exports = router;
