const books = [                                            /////////declcares two variables which are 'books' & "booklists  in a object array"
    {                                                                
        id: 0,
        name: "book 1"
    },
    {
        id: 1,
        name: "book 2"
    },
    {
        id: 2,
        name: "book 3"
    },
    {
        id: 3,
        name: "book 4"
    },
]

const booklists = [
    {
        id: 0,
        name: "book 5",
        order: 26
    },
    {
        id: 1,
        name: "book 2",
        order: 13
    }
]

// READ///

const booklistsContainer = document.getElementById("booklistsContainer")     //////getelementById brings in the booklistContainer and booksContainer from the html into javascript to be used to initaliztion are fuctions
const booksContainer = document.getElementById("booksContainer")

function renderbooklist() {                                                   /////renderbooklist() that maniputlates the content of the booklist element. Renderbooklist()uses a loop to remove the child nodes from the 'booklistcontainer.fristchild which seee if its true has to have atleast one child node.Removechild method call  to the booklistContainer element removes the frist child to be removed////
    while (booklistsContainer.firstChild) {                                  
        booklistsContainer.removeChild(booklistsContainer.firstChild)
    }

    booklists.sort((a, b) => a.order - b.order)
    for (const book of booklists) {                                         ////////creates  two html "buttons" a upbutton and a remove button. Eventlistner is added that will call the button up and removes a button.Once the move button is click the eventlistner will move the book by the id.And when the "remove button is click it will call the removefrombooklist() with book id as an arguement when both buttons are clicked.both buttons are appended to the "div element". than book container to generate a list  of books with buttons to move them up and remove from the list.////////
        const div = document.createElement("div")
        div.textContent = book.name

        const upButton = document.createElement("button")
        upButton.textContent = "^"
        upButton.classList.add("btn")
        upButton.classList.add("btn-secondary")
        upButton.addEventListener("click", () => movebookUp(book.id))
        div.appendChild(upButton)
        
        const removeButton = document.createElement("button")
        removeButton.textContent = "-"
        removeButton.classList.add("btn")
        removeButton.classList.add("btn-warning")
        removeButton.addEventListener("click", () => removeFromBooklists(book.id))
        div.appendChild(removeButton)

        booklistsContainer.appendChild(div)
    }
}

function renderbooks() {
    while (booksContainer.firstChild) {                                                //////////renderbooklist get httml elements for each book in the "booklist array,with buttons to make them up or remove them. the resulting html elements are appended to an existing html elements are appended to the existing hmtl elements with the id booklistsContainer The renderbooks functions starts by removing all child elements from existing html elements with id "bookcontainer", then for each book in the array, it creates a new html "div,"element sets to the book name.///
        booksContainer.removeChild(booksContainer.firstChild)
    }

    for (const book of books) {
        const div = document.createElement("div")
        div.textContent = book.name

        const addButton = document.createElement("button")
        addButton.textContent = "+"
        addButton.classList.add("btn")
        addButton.classList.add("btn-success")
        addButton.addEventListener("click", () => addTobooklist(book.id))
        div.appendChild(addButton)

        booksContainer.appendChild(div)
    }
}

renderbooklist()
renderbooks()

// CREATE///

let nextId = 10;                                                                       /////addtobooklist which takes a book id as a parameter .Function  is added a new book to the "booklists arrray with the unique id. a name that matches the given id and an order vaule that is higher then existing order in the arrray.The function uses the find method to search for a book in the books array thats matches the given id and an order value that is higher then existing order in the array.Booklist  array find the highest order value. by using the variable maxorder value. by using the variable maxorder negative infinity to itrate through the loop .it order is higher than max value the loop will end and max order will have the highest array. New booklist() contains id to increment the next variable the name of the book thar was founs eariler and order 10 or more will have the highest array order in the book array renderbooklist update the html  "


    function addTobooklist(bookId) {
      const book = books.find(book => book.id === bookId);
    
      let maxOrder = -Infinity;
      for (const book of booklists) {
        if (book.order > maxOrder) {
          maxOrder = book.order;
        }
      }
    
      const newBooklist = {
        id: nextId++,
        name: book.name,
        order: maxOrder + 10
      };
      booklists.push(newBooklist);
      renderbooklist();
    }
    


// DELETE///

function removeFromBooklists(booklistId) {
    const index = booklists.findIndex(                                                  /////////removefromBooklists()which takes a booklistid as a parameter.removes a booklist object with given id from the booklist array. uses findindex method to search for booklist in the "booklists array that has an id matches the bookid parameter. resulting index of the booklist object in the array -1 if no result is found.if function is found the splice method is used to modifty the orgin array. renderlist upadrtes hmtl to give update booklists "
        book => book.id === booklistId
    )
    booklists.splice(index, 1)
    renderbooklist();
}

// UPDATE///

function movebookUp(booklistsId) {
    const index = booklists.findIndex(                                                   /////movebookupfunction() which takes the boklist as a parameter this function moves the booklist id up one postion in the book array.The function by using the findindex method that matches the array if array is found, the function checks if there is a booklist above it in the array, by accessing the booklist at the index "index - 1" if there no matching the function will return not changed."renderbooklist" function is called to update the HTML elements on the page with the modified "booklists" array. The result is that the booklist with the given ID is moved up one position in the page.
        book => book.id === booklistsId
    )
    const previousBook = booklists[index - 1]
    if(previousBook === undefined) {
        return;
    }
    const book = booklists[index]
    book.order = previousBook.order - 1
    renderbooklist();
}