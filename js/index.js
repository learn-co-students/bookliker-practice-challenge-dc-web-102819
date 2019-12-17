


document.addEventListener("DOMContentLoaded", function() {

getBooks()
makeBookPage()

});

function getBooks() {
	fetch('http://localhost:3000/books')
	.then(resp => resp.json())
	.then(data => data.forEach(book => renderBookBar(book)))

}

function renderBookBar(book) {
	let ul = document.getElementById('list')
	let li = document.createElement('li')
	li.innerText = book.title
	ul.appendChild(li)
	li.addEventListener('click', (e, bookId) => getBook(event, book.id))
}

function getBook(event, bookId) {
	fetch(`http://localhost:3000/books/${bookId}`)
	.then(resp => resp.json())
	.then(book => renderBook(book))
}

function renderBook(book) {
	let title = document.getElementById('book-title')
	let img = document.getElementById('book-cover')
	let desc = document.getElementById('book-description')
	let ul = document.getElementById('user-list')
	let button = document.getElementById('like-button')
	let bookContainer = document.getElementById('show-panel')
	button.remove()
	//removes all the previous ul elements before repopulating
	while (ul.hasChildNodes()) {
		ul.removeChild(ul.firstChild)
	}

	title.innerText = book.title
	img.src = book.img_url
	desc.innerText = book.description

	let likeButton = document.createElement('button')
	likeButton.id = 'like-button'
	likeButton.innerText = "Read"
	likeButton.addEventListener('click', (e, bookUsers) => addBookUser(event, book.users))
	bookContainer.append(likeButton)
	

	likeButton.dataset.id = book.id

	book.users.forEach(user => userListItem(user, ul))

}

function userListItem(user, ul) {
	let li = document.createElement('li')
	li.innerText = user.username
	ul.append(li)
}

function addBookUser(event, bookUsers) {
	let ul = document.getElementById('user-list')
	bookUsers.push({'id':1, 'username':"pouros"})
	console.log(bookUsers)
	bookId = event.currentTarget.dataset.id

	configObject = {
		method: "PATCH",
		headers: {
			'content-type': "application/json",
			'Accept': 'application/json'
		},
		body: JSON.stringify({users: bookUsers})
	}

	fetch(`http://localhost:3000/books/${bookId}`, configObject)
	.then(resp => resp.json())
	.then(book => userListItem(book.users[book.users.length -1], ul))



}

function makeBookPage() {
	let bookContainer = document.getElementById('show-panel')
	let header = document.createElement('h1')
	header.id = 'book-title'
	bookContainer.append(header)

	let image = document.createElement('img')
	image.id = 'book-cover'
	bookContainer.append(image)

	let desc = document.createElement('p')
	desc.id = "book-description"
	bookContainer.append(desc)

	let ul = document.createElement('ul')
	ul.id = 'user-list'
	bookContainer.append(ul)

	let button = document.createElement('button')
	button.id = 'like-button'
	bookContainer.append(button)

}


	




