const books_url = 'http://localhost:3000/books'
let list = document.getElementById('list')

document.addEventListener("DOMContentLoaded", function() {
    fetch(books_url)
    .then(response => response.json())
    .then(data => populateList(data));

});

function populateList(db) {
    db.forEach(book => { appendBook(book) });
}

function appendBook(book) {
    let li = document.createElement('li');
    li.innerText = book.title;
    li.id = 'book-' + book.id;
    li.addEventListener('click', () => grabBook(book.id));
    list.appendChild(li);
}

function grabBook(bookId) {
    let bookUrl = books_url + '/' + bookId;
    fetch(bookUrl)
    .then(response => response.json())
    .then(data => displayBook(data))
}

function displayBook(book) {
    const container = document.getElementById('show-panel');
    container.innerHTML = "";

    let header = document.createElement('h1');
    header.innerText = book.title;

    let img = document.createElement('img');
    img.src = book.img_url;

    let description = document.createElement('p');
    description.innerHTML = book.description;

    let readerList = document.createElement('ul');
    readerList.id = 'reader-list';
    let userCollection = generateReaderList(book.users);
    userCollection.forEach(li => readerList.append(li));

    let displayLikesBtn = document.createElement('button');
    displayLikesBtn.innerText = "Display Likes: ON";
    displayLikesBtn.dataset.status = 'on';
    displayLikesBtn.addEventListener('click', displayLikesSwap);

    let btnDiv = document.createElement('div');

    let likeBtn = document.createElement('button');
    likeBtn.innerText = "Read Book";
    likeBtn.addEventListener('click', (e) => addLike(e, book.id, book.users));

    let unlikeBtn = document.createElement('button');
    unlikeBtn.innerText = "Unlike Book";
    unlikeBtn.addEventListener('click', (e) => removeLike(e, book.id, book.users));

    if (!!book.users.find(user => user.id === 1)) {
        likeBtn.style.display = 'none';
    } else {
        unlikeBtn.style.display = 'none';
    }

    btnDiv.append(likeBtn, unlikeBtn);

    container.append(header, img, description, readerList, displayLikesBtn, btnDiv);
}

function displayLikesSwap(event) {
    let btn = event.target;
    let readerList = document.getElementById('reader-list');
    if (btn.dataset.status === 'on') {
        btn.innerText = 'Display Likes: OFF';
        btn.dataset.status = 'off';
        for (let li of readerList.children) {
            li.style.display = 'none'
        }
    } else {
        btn.innerText = 'Display Likes: ON';
        btn.dataset.status = 'on';
        for (let li of readerList.children) {
            li.style.display = 'list-item'
        }
    }
}

function generateReaderList(users) {
    return users.map(user => {
        let li = document.createElement('li');
        li.innerText = user.username;
        return li;
    })
}

function addLike(event, bookId, usersArr) {
    if (!!usersArr.find(user => user.id === 1)) {
        alert("You've already have read this book!")
    } else {
        let addedUser = { "id": 1, "username":"pouros" };
        usersArr.push(addedUser);
        updateBooks(event, bookId, usersArr)
    }
}

function removeLike(event, bookId, usersArr) {
    if (!usersArr.find(user => user.id === 1)) {
        alert("Something is wrong. This button has the wrong listener!")
    } else {
        newUsersArr = usersArr.filter(user => user.id !== 1);
        updateBooks(event, bookId, newUsersArr)
    }
}

function updateBooks(event, bookId, usersArr) {
    let bookUrl = books_url + '/' + bookId;
    
    const configObj = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify ({
            users: usersArr
        })
    };
    
    fetch(bookUrl, configObj)
    .then(response => response.json())
    .then(data => { 
        displayBook(data);
        switchLikeBtn(event.target);
    }) 
}

function switchLikeBtn(button) {
    button.style.display = 'none';
    if (!!button.previousSibling) {
        button.previousSibling.style.display = 'inline';
    } else {
        button.nextSibling.style.display = 'inline';
    }
}