const Loan = require("../models/loan");
const Borrower = require("../models/borrower");
const Book = require("../models/book");

exports.borrowBook = async (req, res) => {
  try {
    const { BorrowerId, BookId, days = 14 } = req.body;

    if (!BorrowerId || !BookId) {
      return res.status(400).json({ message: "BorrowerId and BookId required" });
    }

    // Fetch borrower
    const borrower = await Borrower.findByPk(BorrowerId);
    if (!borrower) return res.status(404).json({ message: "Borrower not found" });

    // Fetch book
    const book = await Book.findByPk(BookId);
    if (!book) return res.status(404).json({ message: "Book not found" });
    if (book.quantity <= 0) return res.status(400).json({ message: "Book not available" });

    // Decrement quantity
    book.quantity -= 1;
    await book.save();

    // Create loan
    const borrowedAt = new Date();
    const dueAt = new Date(borrowedAt);
    dueAt.setDate(dueAt.getDate() + days);

    const loan = await Loan.create({ BorrowerId, BookId, borrowedAt, dueAt });

    res.status(201).json({ message: "Book borrowed successfully", loan });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.returnBook = async (req, res) => {
  try {
    const { BorrowerId, BookId } = req.body;

    if (!BorrowerId || !BookId) {
      return res.status(400).json({ message: "BorrowerId and BookId required" });
    }

    const loan = await Loan.findOne({ where: { BorrowerId, BookId } });
    if (!loan) return res.status(404).json({ message: "Loan not found" });

    const book = await Book.findByPk(BookId);
    if (!book) return res.status(404).json({ message: "Book not found" });

    book.quantity += 1;
    await book.save();

    await loan.destroy();

    res.json({ message: "Book returned successfully", loan });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};