import Cookies from "js-cookie";
import { Navigate, useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "../components/CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51HCObyDVswqktOkX6VVcoA7V2sjOJCUB4FBt3EOiAdSz5vWudpWxwcSY8z2feWXBq6lwMgAb5IVZZ1p84ntLq03H00LDVc2RwP"
);

const Payment = () => {
  const { state } = useLocation();
  const amount = Number((state.data.product_price * 100).toFixed(0));
  const title = state.data.product_name;

  console.log("title", title);
  console.log("amount", amount);

  const userToken = Cookies.get("userToken");

  const options = {
    mode: "payment",
    amount,
    currency: "eur",
  };

  return userToken ? (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm title={title} amount={amount} />
    </Elements>
  ) : (
    <Navigate to="/login" />
  );
};
export default Payment;
