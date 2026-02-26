const Loan = require("../models/loan");
const Borrower = require("../models/borrower");
const Book = require("../models/book");
const { Op } = require("sequelize");

exports.borrowBook = async (req, res) => {
  try {
    const { BorrowerId, BookId, days = 14 } = req.body;

    if (!BorrowerId || !BookId) {
      return res.status(400).json({ message: "BorrowerId and BookId required" });
    }

    const borrowedAt = new Date();
    const dueDate = new Date(borrowedAt);
    dueDate.setDate(dueDate.getDate() + days);

    const loan = await Loan.create({ BorrowerId, BookId, borrowedAt, dueDate });

    res.status(201).json(loan);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};