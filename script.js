const bookLink = "https://striveschool-api.herokuapp.com/books"
const filterInput = document.querySelector(".form-control")
const addToCartBtns = document.querySelectorAll(".btn-success")

let allBooks = []

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
            const cartUl = document.getElementById("cartList")
            const emptyMsg = document.getElementById("emptyCartMsg")
            //se il carrello è vuoto, cancella il msg appena viene aggiunto un li
            if (emptyMsg) {
                emptyMsg.remove()
            }

            //creazione dei li e loro sotto-elementi
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
            cartUlElem.remove()
            })


            cartUlElem.append(titleDiv, priceDiv, deleteBtn)
            cartUl.append(cartUlElem)

            addToCart.innerHTML = '<i class="bi bi-check2"></i> Added to cart!'
        })

        const hide = document.createElement("button")
        hide.classList.add("btn", "btn-secondary")
        hide.innerHTML = '<i class="bi bi-eye-slash"></i>'

        cardBody.append(cardTitle, genre, price, addToCart, hide)
        card.append(img, cardBody)
        results.append(card)

    }
    
)
}

function filterBooks() {
    const filterValue = filterInput.value

    const filteredBooks = allBooks.filter((book) => {
        if (
            book.price === Number(filterValue) || 
            book.title.toLowerCase().includes(filterValue.toLowerCase()) ||
            book.category.toLowerCase().includes(filterValue.toLowerCase())
        ) {
            return true
        }
        return false
    })
    renderBooks(filteredBooks) 
}



fetchBooks()
