document.addEventListener("DOMContentLoaded", function() {
    fetchAllBook()
});

function fetchAllBook(){
    fetch("http://localhost:3000/books")
    .then(res => res.json())
    .then(arrayBook => {
        arrayBook.forEach(book => renderallBook(book))
    })
}

function renderallBook(e){
    const container = document.getElementById("list")
    const elLi = document.createElement("li")
    elLi.id = `book-${e.id}`
    const linkBook = document.createElement("a")
    linkBook.innerText = e.title
    linkBook.href = ""
    elLi.appendChild(linkBook)
    container.appendChild(elLi)
    linkBook.addEventListener("click", getDetails)
    
    
    // debugger

}

function getDetails(e){
    e.preventDefault()
    const getId = e.target.parentNode.id.split("-")[1]
    fetch(`http://localhost:3000/books/${getId}`)
    .then(res => res.json())
    .then(bookArray => showDetails(bookArray))
}


function showDetails(e){
    
    const users = e.users.map(x => x.username)
    const container = document.getElementById("show-panel")
    container.innerHTML = ""
    const text = document.createElement("h2")
    text.innerText = e.title
    container.appendChild(text)
    const addImage = document.createElement("img")
    addImage.src = e.img_url
    container.appendChild(addImage)
    const addDescription = document.createElement("p")
    addDescription.innerText = e.description
    container.appendChild(addDescription)
    const addUser = document.createElement("p")
    addUser.innerText = users.toString()
    container.appendChild(addUser)
    const addButton = document.createElement("button")
    addButton.innerText = "Click Like"
    addButton.id = `button-${e.id}`
    container.appendChild(addButton)
    addButton.addEventListener("click",()=>getLikeId(e))

}

function getLikeId(e){ 
   
//    debugger
   let value = e.users.map(x => x.id)
   if(!value.includes(1)){  
    const getUser = {
        "id" : 1,
        "username" : "pouros"
    }
    e.users.push(getUser)
    e.users
    data = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Accept : "application/json"
        },
        body: JSON.stringify({
           "users" : e.users
        })
    }
    fetch(`http://localhost:3000/books/${e.id}`, data)
    .then(res => res.json())
    .then(json => showDetails(json))
    }
    else{
        alert("You did already!!")
    }
}

//??????????????? need to explain
// function saveUser(e){
//     // debugger
//     const data = {
//         "users":[
//         {"id": e.id},
//         {"username": "awfef"}
//         ]}
//     fetch("http://localhost:3000/books/",{
//         method: "PATCH",
//         headers: {
//             "Content-type": "application/json",
//             Accept:"application/json"
//         },
//         body: JSON.stringify(data)
//     })
// }