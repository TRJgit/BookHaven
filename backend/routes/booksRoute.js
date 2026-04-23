import express, { request, response } from 'express';
import { Book } from '../models/bookModel.js';

const router = express.Router();

//Route to save a new book
router.post('/', async (request, response) => {
    try {
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            return response.status(400).send("Send all required fields.");
        }

        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear
        };

        const book = await Book.create(newBook);

        return response.status(200).send(book);

    } catch (error) {
        console.error(error.message);
        return response.status(500).send({ message: error.message })

    }
});

// Route to get all books
router.get('/', async (request, response) => {
    try {

        const page = parseInt(request.query.page)  || 1;
        const limit = parseInt(request.query.limit) || 10;

        const skip = (page-1)*limit;

        const books = await Book.find({}).skip(skip).limit(limit);

        const totalBooks = await Book.countDocuments();

        return response.status(200).json(
            {
                count: books.length,
                totalBooks: totalBooks,
                totalPages: Math.ceil(totalBooks/limit),
                currentPage: page,
                data: books

            });

    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message })
    }
});

//Route to get a single book
router.get('/:id', async (request, response) => {
    try {

        const { id } = request.params;

        const book = await Book.findById(id);
        return response.status(200).json(book);

    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message })
    }
});

// Route to update a book
router.put('/:id', async (request, response) => {
    try {
        if (!request.body.title || !request.body.author || !request.body.publishYear) {
            return response.status(400).send("Send all required fields.");
        }

        const { id } = request.params;
        const result = await Book.findByIdAndUpdate(id, request.body);

        if (!result) {
            return response.status(404).json({ message: 'Book not found' });
        }

        return response.status(200).send({ message: 'Book successfully updated' });

    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});

router.delete('/:id', async (request, response) => {
    try {

        const { id } = request.params;
        const result = await Book.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).json({ message: 'Book not found' });
        }

        return response.status(200).send({ message: 'Book successfully deleted' });

    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});

export default router;