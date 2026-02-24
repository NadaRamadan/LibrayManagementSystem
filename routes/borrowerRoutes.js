const express = require("express");
const router = express.Router();
const borrowerController = require("../controllers/borrowerController");

router.post("/", borrowerController.createBorrower);
router.get("/", borrowerController.GetAllBorrowers);
// router.get("/:id", borrowerController.getBorrowerById);
router.put("/:id", borrowerController.UpdateBorrower);
router.delete("/:id", borrowerController.DeleteBorrower);

module.exports = router;
