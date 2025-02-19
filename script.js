const bookLink = "https://striveschool-api.herokuapp.com/books"
const filterInput = document.querySelector(".form-control")
const addToCartBtns = document.querySelectorAll(".btn-success")

let allBooks = []
let cartBooks = []

function fetchBooks() {
    return fetch(bookLink)
    .then(response => response.json())
    .then(books => {
         //console.log(books)
         allBooks = books
         renderBooks(books)
         return books    
        })
    .catch(err => console.log(err))
}

function renderBooks(books) {
    const results = document.getElementById("results")
    results.innerHTML = ""
    books.forEach((book) => {
        const newNode = createTemplate(book)
        results.append(newNode)
    })
}

function createTemplate(book) {

        // creazione delle card e dei loro sotto-elementi
        const card = document.createElement("div")
        card.classList.add("card", "bg-transparent", "border-0", "mb-3", "h-100")

        const img = document.createElement("img")
        card.classList.add("img-fluid")
        img.src = book.img

        const cardBody = document.createElement("div")
        cardBody.classList.add("card-body", "h-100")

        const cardTitle = document.createElement("h5")
        cardTitle.classList.add("card-title")
        cardTitle.innerText = book.title

        const genre = document.createElement("p")
        genre.classList.add("card-text")
        genre.innerText = book.category

        const price = document.createElement("p")
        price.classList.add("card-text")
        price.innerText = book.price + "" + "€"

        const addToCart = document.createElement("button")
        addToCart.classList.add("btn", "btn-success", "me-2")
        addToCart.innerHTML = '<i class="bi bi-cart"></i> Add to cart'

        //event listener per l'evento aggiungi al carrello
        addToCart.addEventListener("click", () => {
            const cartBook = cartBooks.find((element) => element.asin === book.asin)
            if (cartBook) {
                cartBook.quantity++
            } else { 
                cartBooks.push({...book, quantity: 1})
                addToCart.innerHTML = '<i class="bi bi-check2"></i> Added to cart!'
            }

            createCartList()
        })

        const hide = document.createElement("button")
        hide.classList.add("btn", "btn-secondary", "me-2")
        hide.innerHTML = '<i class="bi bi-eye-slash"></i>'

        hide.addEventListener("click", () => {
            allBooks = allBooks.filter((element) => element.asin !== book.asin)
            renderBooks(allBooks)
        }
        )

        const details = document.createElement("a")
        details.classList.add("btn", "btn-primary")
        details.innerText = "Details"
        details.setAttribute("href", "detail.html?q=" + book.asin)

        cardBody.append(cardTitle, genre, price, addToCart, hide, details)
        card.append(img, cardBody)
        
        return card
    
}

function createCartList() {
    const cartUl = document.getElementById("cartList")
    cartUl.innerHTML= ""

    const emptyMsg = document.getElementById("emptyCartMsg")
    //se il carrello è vuoto, cancella il msg appena viene aggiunto un li
    if (!emptyMsg.classList.contains("d-none") && (cartBooks.length > 0)) {
        emptyMsg.classList.add("d-none")
    } else if (cartBooks.length === 0 && emptyMsg.classList.contains("d-none")) {
        emptyMsg.classList.remove("d-none")
    }

    //creazione dei li e loro sotto-elementi
    cartBooks.forEach((book) => {
        const cartUlElem = document.createElement("li")
        cartUlElem.classList.add("row", "align-items-center", "mb-2")
    
        const titleDiv = document.createElement("div")
        titleDiv.classList.add("text-truncate", "col-6", "ms-1")
        titleDiv.innerText = book.title

        const priceDiv = document.createElement("div")
        priceDiv.classList.add("col-3")
        priceDiv.innerText = book.price + "" + "€"

        const deleteBtn = document.createElement("button")
        deleteBtn.classList.add("btn", "btn-danger", "col-2", "me-1")
        deleteBtn.innerHTML = '<i class="bi bi-trash3"></i>'

        //event listener per eliminare l'elemento dal carrello
        deleteBtn.addEventListener("click", () => {
           cartBooks = cartBooks.filter((element) => element.asin !== book.asin)
           createCartList()   
        })


        cartUlElem.append(titleDiv, priceDiv, deleteBtn)
        cartUl.append(cartUlElem)
    })
}

function filterBooks() {
    const filterValue = filterInput.value

    const filteredBooks = allBooks.filter((book) => {
        if ( 
            book.title.toLowerCase().includes(filterValue.toLowerCase())   
        ) {
            return true
        }
        return false
    })
    renderBooks(filteredBooks) 
}



fetchBooks()
