const express = require('express');
const app = express();
const methodOverride = require('method-override')
const budget = require('./models/budget.js')
const port = 3000

// START MIDDLEWARE //
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static("public"))
app.use(methodOverride('_method'))
// END MIDDLEWARE //

// MAIN ROUTE //

app.get('/', (req, res) => {
  res.send("<html>Re-directing to your budget...<script>window.location.href = 'http://localhost:3000/budget'</script></html>")
  console.log("Redirecting to http://localhost:3000/budget")
});

// INDEX ROUTE //

app.get('/budget/', (req, res) => {
  let bankAccount = 0
  for(let i=0; i < budget.length; i++){
  bankAccount = bankAccount + budget[i].amount}
  res.render("index.ejs", {budgetItems: budget, bankAccount: bankAccount})
});

// NEW ROUTE //

app.get('/budget/new', (req, res) => {
  res.render("new.ejs", {budgetArray: budget})
})

// CREATE ROUTE //

app.post("/budget", (req, res) => {
  if(req.body.name == ""){
    req.body.name = "Not Entered"
  }
  if(req.body.from == ""){
    req.body.from = "Not Entered"
  }
  if(req.body.date == ""){
    req.body.date = "Not Entered"
  }
  if(req.body.amount == ""){
    req.body.amount = "0"
  }
  req.body.amount = Number(req.body.amount)
  req.body.tags = req.body.tags.split(',');
  budget.push(req.body)
  res.redirect("/budget")
})

// SHOW ROUTE

app.get('/budget/:budgetIndex', (req, res) => {
  res.render("show.ejs", {budgetItem: budget[req.params.budgetIndex]});
});

app.listen(port, () => {
    console.log('"I did not come here to make friends. I came here to Budget." - the Budgtr App, probably');
});