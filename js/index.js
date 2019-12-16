document.addEventListener("DOMContentLoaded", function() {
	console.log("connected")
	getBooks()
});

function getBooks(page=1, limit=0) {
	fetch('http://localhost:3000/books')
		.then(response => response.json())
		.then(books => books.forEach(book => {
			renderBook(book)
			// console.log(book)
		}))
		.catch(error => console.log(error.message))
}

function renderBook(book) {
	let bookList = document.querySelector('ul#list')

	let bookItem = document.createElement('li')
	bookItem.id = `book-${book.id}`
	bookItem.addEventListener('click', showBook)
	bookList.appendChild(bookItem)

	let bookTitle = document.createElement('h3')
	bookTitle.innerText = book.title
	bookItem.appendChild(bookTitle)

	// let bookDescription = document.createElement('p')
	// bookDescription.innerText = book.description
	// bookItem.appendChild(bookDescription)

}

function clearInnerHTML(selector) {
	let element = document.querySelector(selector)
	element.innerHTML = ''
	return element
}

function showBook(event) {
	let bookId = Number(event.currentTarget.id.split('-')[1])

	fetch(`http://localhost:3000/books/${bookId}`)
		.then(response => response.json())
		.then(book => {
			let showPanel = clearInnerHTML('#show-panel')
			showPanel.classList.add('enabled')

			showPanel.innerHTML = `
				<img src="${book.img_url}">
				<div>
					<h1>${book.title}</h1>
					<p>${book.description}</p>
				</div>
				<h3>This book has been liked by:</h3>
			`

			let likeContainer = document.createElement('div')
			showPanel.appendChild(likeContainer)

			let buttonLike = document.createElement('button')
			buttonLike.addEventListener('click', likeBook)
			buttonLike.innerText = "Like Book"
			likeContainer.appendChild(buttonLike)

			let likes = document.createElement('ul')
			likes.id = "likes"
			showPanel.appendChild(likes)
			book.users.forEach(user => {
				let like = document.createElement('li')
				like.innerText = user.username
				likes.appendChild(like)
			})

			likeContainer.appendChild(likes)

		})
		.catch(error => console.log(error.message))
}

function likeBook(event) {
	console.log(event.currentTarget.parentElement)
}



