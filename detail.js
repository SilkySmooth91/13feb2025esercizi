// Endpoint

const bookLink = "https://striveschool-api.herokuapp.com/books/"

// Elementi DOM

const infoBox = document.getElementById("infobox")

// Funzioni

function getBook() {

    const query = window.location.search
    const params = new URLSearchParams(query)
    const bookAsin = params.get("q")

    fetch(bookLink + bookAsin)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            renderInfo(data)        
        })
        .catch((err) => console.log(err))
}

function renderInfo(book) {
    const coverDiv = document.createElement("div")
    coverDiv.classList.add("col-6", "col-md-4")

    const coverImg = document.createElement("img")
    coverImg.classList.add("img-fluid")
    coverImg.src = book.img

    coverDiv.append(coverImg)

    const details = document.createElement("div")
    details.classList.add("col-6", "col-md-8", "d-flex", "flex-column", "justify-content-center")

    const title = document.createElement("h5")
    title.classList.add("fs-2")
    title.innerText = book.title

    const category = document.createElement("h6")
    category.innerText = book.category

    const price = document.createElement("p")
    price.classList.add("fs-4")
    price.innerText = book.price + " " + "€"

    details.append(title, category, price)
    infoBox.append(coverDiv, details) 
    
}

getBook()