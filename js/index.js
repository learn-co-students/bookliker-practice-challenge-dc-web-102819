document.addEventListener("DOMContentLoaded", function() {
    fetchBooks()
});

function fetchBooks(){
    fetch('http://localhost:3000/books')
    .then(response => response.json())
    .then(books => {books.forEach((book) => displayBooks(book))})
}




function displayBooks(book){
    listEl = document.createElement('li')
    bookTitle = document.createElement('h1')
    bookTitle.innerText = book.title
    bookList = document.querySelector('#list')
    bookTitle.addEventListener('click',() => bookDetail(book))

    bookList.appendChild(listEl)
    listEl.appendChild(bookTitle)
}



function bookDetail(book){
   document.querySelector('#show-panel').remove()
    let body = document.querySelector('body')
    let displayPanel = document.createElement('div')
    displayPanel.setAttribute('id', 'show-panel')
    let image = document.createElement('img')
    image.src = book.img_url
    let description = document.createElement('p')
    description.innerText = book.description
    let button = document.createElement('button')
    button.innerText = 'Like'
    button.addEventListener('click',(event) => likeButton(event, book))
    let likes = document.createElement('h2')
    likes.innerText = 'Likes'

    displayPanel.append(image, description, button, likes)
    body.appendChild(displayPanel)
   
    book.users.forEach(user  => {
        let like = document.createElement('p')
        like.innerText = user.username  
        displayPanel.appendChild(like)
    })
}




function likeButton(event, book){

   
    if (!(book.users.find((user) => user.id === 1)) === true){
   book.users.push({id: 1, username: "Pancho Villa"})
    let objectConfig = {
        method:"PATCH",
        headers: {
            'Content-Type': 'application/json'
        },
    body: JSON.stringify({
       users: book.users
       
    })
}
    fetch(`http://localhost:3000/books/${book.id}`, objectConfig)
    .then(response => response.json())
    .then(book => displayLikes(event, book))
}else{
    alert('you liked it already dumy')
}
}



function displayLikes(event, book){
    
    let displayPanel = event.target.parentElement
    let newLike = book.users[book.users.length-1].username
        let like = document.createElement('p')
        like.innerText = newLike
        displayPanel.appendChild(like)
   
}