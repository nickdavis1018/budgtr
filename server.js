const express = require('express');
const app = express();
const budget = require('./models/budget.js')

// START MIDDLEWARE //
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"))
// END MIDDLEWARE //

app.get("/", (req, res) => {
    res.render("index.ejs", {budgetItems: budget});
  });

app.listen(3000, () => {
    console.log('"I did not come here to make friends. I came here to Budget." - the Budgtr App, probably');
});