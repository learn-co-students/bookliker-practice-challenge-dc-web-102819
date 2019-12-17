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
    bookButton.innerText = `Like this book`
    header.innerText = `${book.title}`
    img.src = `${book.img_url}`
    pTag.innerText = `${book.description}`
    showPanel.appendChild(header)
    showPanel.appendChild(img)
    showPanel.appendChild(pTag)
    showPanel.appendChild(bookButton)
    book.users.forEach(displayUserNames)
    bookButton.addEventListener('click', () => likeThisBook(book))
}

function displayUserNames(user) {
    let usersTag = document.createElement('p')
    let showPanel = document.getElementById('show-panel')
    usersTag.innerText = `Username: ${user.username}`
    showPanel.appendChild(usersTag)
}


function likeThisBook(book) {
   const currentUsers = book.users
   currentUsers.push({'id': 1, 'username': 'pouros'})
   console.log(currentUsers)
    const configOptions = {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({'users': currentUsers})
    }
    fetch(`http://localhost:3000/books/${book.id}`, configOptions)
    .then(response => response.json())
    .then(data => {
        const likers = data.users
        displayUserNames(likers[likers.length - 1])
    })
}



// function increaseLikes(toyId, likesP) {
//     const likeCount =  parseInt(likesP.innerText)
  
//     const configOptions = {
  
//       method: 'PATCH',
//         headers: {
          
//           "Content-Type": "application/json",
//           "Accept": "application/json"
  
//         },
//         body: JSON.stringify({likes: likeCount + 1 })
//     }
  
//     fetch(`http://localhost:3000/toys/${toyId}`, configOptions)
//     .then(response => response.json())
//     .then(toy => displayNewLikes(toy, likesP))
//   }