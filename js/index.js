document.addEventListener("DOMContentLoaded", function() {
    getBooks();
});



function getBooks() {
    fetch(`http://localhost:3000/books`)
    .then(response => response.json())
    .then(books => {books.forEach(book => renderBooks(book))})
}


function renderBooks(book) {
    let bookPanel = document.getElementById('list')
    let li = document.createElement('li')
    li.id = book.id
    li.description = book.description
    li.image = book.img_url
    li.innerText = book.title
    bookPanel.appendChild(li)
    li.addEventListener('click', () => showBookInfo(book))
}


function showBookInfo(book) {
    let showPanel = document.getElementById('show-panel')
    let header = document.createElement('h2')
    let pTag = document.createElement('p')
    let img = document.createElement('img')
    let bookButton = document.createElement('button')
    header.innerText = `${book.title}`
    img.src = `${book.img_url}`
    pTag.innerText = `${book.description}`
    showPanel.appendChild(header)
    showPanel.appendChild(img)
    showPanel.appendChild(pTag)
    book.users.forEach(displayUserNames)
}

function displayUserNames(user) {
    let usersTag = document.createElement('p')
    let showPanel = document.getElementById('show-panel')
    usersTag.innerText = `Username: ${user.username}`
    showPanel.appendChild(usersTag)
}