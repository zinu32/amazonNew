// require express, cors, stripe(sk)
// seting up middleware
// accept post request
// take id-> req.body and total-price -> req.query
// paymentIntents.create({amount, payment_method, currency})
// take client_secret -> response and send it to the front-end
// res.send({secret-key: value})

// listening on random port

const express = require("express");
const cors = require("cors");

const stripe = require("stripe")(
  "sk_test_51McVOhCaUskB85IqtKNP3S7vDea4i9UD53LkAxtTovmIEmatvgEOpSSGRuNk1LfF5pWprhGHZlo5gWQZLBHTGRGR00Rpa7zTP2"
);

const app = express();

app.use(cors());
app.use(express.json());

app.post("/charge", (req, res) => {
  const { id } = req.body;
  const { amount } = req.query;

  stripe.paymentIntents
    .create({
      amount: Number(amount),
      payment_method: id,
      currency: "usd",
    })
    .then((response) => {
      res.send({ secret_key: response.client_secret });
    });
});

app.listen(4444, () => console.log("listening on port 4444"));
