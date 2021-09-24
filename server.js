const express = require('express');
const app = express();
const budget = require('./models/budget.js')

// START MIDDLEWARE //
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static("public"))
app.use(methodOverride('_method'))
// END MIDDLEWARE //

app.get('/budget/', (req, res) => {
  res.render("index.ejs", {budgetItems: budget});
});

app.get('budget/new', (req, res) => {
  res.render("new.ejs")
})

app.get('/budget/:budgetIndex', (req, res) => {
  res.render("show.ejs", {budgetItem: budget[req.params.budgetIndex]});
});

app.listen(3000, () => {
    console.log('"I did not come here to make friends. I came here to Budget." - the Budgtr App, probably');
});