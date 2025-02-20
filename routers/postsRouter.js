const express = require("express");
const router = express.Router();

const validationParamId = require("../middlewares/validationParamId");
const postsController = require("../controllers/postsController");

router.use("/:id", validationParamId);

//index
router.get("/", postsController.index);

//show
router.get("/:id", validationParamId, postsController.show);

//create
router.post("/", postsController.create);

// update
router.put("/:id", validationParamId, postsController.update);

//modify
router.patch("/:id", validationParamId, postsController.modify);

//destroy
router.delete("/:id", validationParamId, postsController.destroy);

module.exports = router;
