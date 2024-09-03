import { PaymentElement } from "@stripe/react-stripe-js";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const CheckoutForm = ({ amount, title }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isPaying, setIsPaying] = useState(false);

  console.log("errorMessage", errorMessage);
  console.log("success", success);
  console.log("isPaying", isPaying);
  console.log("=========");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsPaying(true);

      if (elements == null) {
        return;
      }

      const { error: submitError } = await elements.submit();

      if (submitError) {
        setErrorMessage(submitError.message);
        return;
      }

      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/v2/payment",
        {
          title,
          amount,
        }
      );

      const clientSecret = response.data.client_secret;

      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: "http://localhost:5173/",
        },
        redirect: "if_required",
      });

      if (error) {
        setErrorMessage(error.message);
      }
      if (paymentIntent.status === "succeeded") {
        setSuccess(true);
      }
    } catch (error) {
      console.log(error);
    }

    setIsPaying(false);
  };

  return success ? (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        gap: 30,
        marginTop: 30,
      }}
    >
      <p>Merci pour votre achat</p>

      <Link to={"/"}>
        <button>Retour vers l'accueil</button>
      </Link>
    </div>
  ) : (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button
        style={{ margin: "20px auto" }}
        disabled={!stripe || !elements || isPaying}
      >
        Payer
      </button>

      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
    </form>
  );
};

export default CheckoutForm;
