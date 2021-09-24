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

app.get('/budget/', (req, res) => {
  res.render("index.ejs", {budgetItems: budget});
});

app.get('/budget/new', (req, res) => {
  res.render("new.ejs", {budgetArray: budget})
})

app.post("/budget", (req, res) => {
  budget.push(req.body)
  res.redirect("/budget")
  console.log(req.body)
})

app.get('/budget/:budgetIndex', (req, res) => {
  res.render("show.ejs", {budgetItem: budget[req.params.budgetIndex]});
});

app.listen(port, () => {
    console.log('"I did not come here to make friends. I came here to Budget." - the Budgtr App, probably');
});