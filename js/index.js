var session = {
	id: 1,
	username: "pouros"
}

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

function showBook(event, book_id) {
	let bookId = event ? Number(event.currentTarget.id.split('-')[1]) : Number(book_id)

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
			likeContainer.id = `book-${book.id}`
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

function getCurrentLikeList(id) {
	//get current like list
	let likedUserList = {
		users: [
		]
	}

	fetch(`http://localhost:3000/books/${id}`)
		.then(res => res.json())
		.then(json => {
			json.users.forEach(user => {
				likedUserList.users.push(user)
			})
			likedUserList.users.push(session)
			return likedUserList
		})
		.catch(e => console.log(e.message))
}

function likeBook(event) {
	let bookId = event.currentTarget.parentElement.id.split('-')[1]

	//get current like list
	let likedUserList = {
		users: [
		]
	}

	fetch(`http://localhost:3000/books/${bookId}`)
		.then(res => res.json())
		.then(json => {
			//add existing likes to list
			json.users.forEach(user => {
				likedUserList.users.push(user)
			})
			//add new like to list
			likedUserList.users.push(session)

			let configOptions = {
			    method: "PATCH",
			    headers: {
			      "Content-Type": "application/json",
			      "Accept": "application/json"
			    },
			    body: JSON.stringify(likedUserList)
			}

			fetch(`http://localhost:3000/books/${bookId}`,configOptions)
				.then(response => response.json())
				.then(book => {
					//function expects an event, setting to false
					showBook(false,book.id)
				})
				.catch(error => console.log(error.message))
		})
		.catch(e => console.log(e.message))



	let bookLikes = getCurrentLikeList(bookId)
}
