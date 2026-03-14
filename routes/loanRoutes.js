const express = require("express");
const router = express.Router();

const loanController = require("../controllers/loanController");


router.post("/borrow", loanController.borrowBook);


router.post("/return", loanController.returnBook);


router.get("/borrower/:BorrowerId", loanController.getBorrowedBooks);


router.get("/overdue", loanController.getLoansOverdue);


module.exports = router;