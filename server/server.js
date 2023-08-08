const express = require("express");
const app = express();

app.use(express.json());

let myBooks = [];

// create a new Booklog given the book id and book info.
app.post("/create", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const myBook = {
    id: req.body.id,
    start_date: new Date(),
    end_date: new Date(),
    rating: 0,
    review: "Write your review here"
  }
  myBooks.push(myBook);
  res.json(myBook);
  })

// deletes a specific book from the list of booklogs.
app.post("/delete/:id", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  // finds the book log, if it exists
  const hasId = myBooks.find(({ id }) => id === req.params.id);

  if (hasId !== undefined) {
    myBooks.splice(myBooks.indexOf(hasId), 1);
    res.json(hasId);
    console.log("Booklog deleted");
  } else {
    res.json("No book to delete");
    console.log("No book to delete");
  }
})

// deletes all current booklogs. 
app.post("/delete", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  myBooks = [];
  res.json("All booklogs deleted");
  console.log("All booklogs deleted");
})

// update and save the edited booklog.
app.post("/edit", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const myBook = {
    id: req.body.id,
    start_date: new Date(req.body.start_date),
    end_date: new Date(req.body.end_date),
    rating: req.body.rating,
    review: req.body.review
  }
  // find old book
  const hasId = myBooks.find(({id}) => id === req.params.id);
  // remove old book
  myBooks.splice(myBooks.indexOf(hasId), 1);
  // add newly edited book
  myBooks.push(myBook);
  res.json(myBook);
  console.log(myBook);
})

// send the book log of a specific book by book ID. If book 
// is not registered in booklog, return undefined.
app.get('/mybook/:id', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  // finds the booklog, if it exists
  const hasId = myBooks.find(({ id }) => id === req.params.id);
  
  if (hasId !== undefined) {
    res.json(hasId);
    console.log(hasId);
  } else {
    res.json("No book logged");
    console.log("No book logged");
  }
})

// send the complete my book list. 
app.get("/mybooks", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.json(myBooks);
  console.log(myBooks);
});

app.get("/message", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.listen(8000, () => {
  console.log(`Server is running on port 8000.`);
});