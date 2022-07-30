import express from 'express'
import fs from 'fs'
import books from '../books.json'
import type { Book } from './interfaces/Book'
import cors from 'cors'

const app = express()
app.use(express.json({ limit: '150mb' }))
app.use(cors())

app.get('/books', (req, res) => {
	fs.readFile('books.json', (err, data) => {
		res.json(JSON.parse(data.toString()))
	})
})

app.post('/books', (req, res) => {
	const book: Book = req.body
	fs.readFile('books.json', (err, data) => {
		if (err) throw err
		var books: Book[] = JSON.parse(data.toString())
		fs.writeFile('books.json', JSON.stringify([...books, book]), err => {
			if (err) throw err
		})
	})
})

app.put('/books/:id', (req, res) => {
	const id = req.params.id
	const book = req.body
	fs.readFile('books.json', (err, data) => {
		if (err) throw err
		var books: Book[] = JSON.parse(data.toString())
		fs.writeFile(
			'books.json',
			JSON.stringify([...books.filter(book => book.id != id), book]),
			err => {
				if (err) throw err
			}
		)
	})
})

app.delete('/books/:id', (req, res) => {
	const id = req.params.id
	fs.readFile('books.json', (err, data) => {
		if (err) throw err
		var books: Book[] = JSON.parse(data.toString())
		fs.writeFile(
			'books.json',
			JSON.stringify([...books.filter(book => book.id != id)]),
			err => {
				if (err) throw err
			}
		)
	})
})

app.listen(4000, () => {
	console.log('Server listening on port 4000')
})
