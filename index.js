import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Handle the landing page
app.get("/", async (req, res) => {
  console.log("Get reached");
  res.render("index.ejs");
});

// Once the user selects a crytocurrency, handle the response
app.post("/", async (req, res) => {
  console.log("Post reached");
    try {
      // get the crypto data associated with req.body.type which is the symbol of the cryptocurrency.
      const response = await axios.get(`https://api.blockchain.com/v3/exchange/tickers/${req.body.type}`);
      res.render("index.ejs", { cryptoData: response.data });
    } catch (error) {
      console.log(error.response.data);
      res.status(500);
    }
});

// Node.js server is listening to port 3000
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});