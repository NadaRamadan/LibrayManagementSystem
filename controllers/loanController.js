const Loan = require("../models/loan");
const Borrower = require("../models/borrower");
const Book = require("../models/book");
const sequelize = require("../config/database");
const { Op } = require("sequelize");



exports.borrowBook = async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const { BorrowerId, BookId, days = 14 } = req.body;

    if (!BorrowerId || !BookId) {
      return res.status(400).json({ message: "BorrowerId and BookId required" });
    }

    const borrower = await Borrower.findByPk(BorrowerId);
    if (!borrower) return res.status(404).json({ message: "Borrower not found" });

    const book = await Book.findByPk(BookId);
    if (!book) return res.status(404).json({ message: "Book not found" });
    if (book.quantity <= 0) return res.status(400).json({ message: "Book not available" });

  
  book.quantity -= 1;
await book.save({ transaction: t });



    const borrowedAt = new Date();
    const dueAt = new Date(borrowedAt);
    dueAt.setDate(dueAt.getDate() + days);

const loan = await Loan.create(
  { BorrowerId, BookId, borrowedAt, dueAt },
  { transaction: t }
);

await t.commit();
    res.status(201).json({ message: "Book borrowed successfully", loan });

  } catch (err) {
    await t.rollback();
    res.status(500).json({ error: err.message });
  }
};

exports.returnBook = async (req, res) => {
  try {
    const { BorrowerId, BookId } = req.body;

    if (!BorrowerId || !BookId) {
      return res.status(400).json({ message: "BorrowerId and BookId required" });
    }

    const loan = await Loan.findOne({ where: { 
      BorrowerId, 
      BookId,   
      returnedAt: null
        } });
      loan.returnedAt = new Date();
      await loan.save();
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

exports.getBorrowedBooks = async (req, res) => {
  try {
    const { BorrowerId } = req.params;

    const loans = await Loan.findAll({
      where: { BorrowerId },
      include: [Book]
    });
    books= loans.map(loan =>loan.book);
    res.json(books);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getLoansOverdue = async (req, res) => {
  try {

    const loans = await Loan.findAll({
      where: {
        dueAt: { [Op.lt]: new Date() },
        returnedAt: null
      },
        include: [Borrower, Book]

    });

    res.json(loans);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};