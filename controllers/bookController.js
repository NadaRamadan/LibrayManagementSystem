const Book = require('../models/book')



exports.createBook = async (req, res) => {
  try {
    const { title, author, isbn, quantity, shelfLocation } = req.body;

    if (!title || !author) {
      return res.status(400).json({ message: "Title and author are required" });
    }

    const book = await Book.create({
      title,
      author,
      isbn: isbn || generateISBN(),
      quantity: quantity || 1,
      shelfLocation: shelfLocation || "unknown"
    });

    res.status(201).json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.findAll();
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Book.findByPk(id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, isbn, quantity, shelfLocation } = req.body;

    const book = await Book.findByPk(id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    await book.update({
      title: title || book.title,
      author: author || book.author,
      isbn: isbn || book.isbn,
      quantity: quantity != null ? quantity : book.quantity,
      shelfLocation: shelfLocation || book.shelfLocation
    });

    res.status(200).json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const { Op } = require("sequelize");

exports.searchBooks = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({ message: "Query parameter 'q' is required" });
    }

    const books = await Book.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.like]: `%${q}%` } },
          { author: { [Op.like]: `%${q}%` } },
          { isbn: { [Op.like]: `%${q}%` } }
        ]
      }
    });

    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



