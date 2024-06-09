




import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "./CheckOutForm";
import { useParams } from "react-router-dom";

const stripePromise = loadStripe(`${import.meta.env.VITE_PAYMENT_GATEWAY_PK}`);

const Payment = () => {
  const { sessionId:id } = useParams();
  // console.log(sessionId);
  return (
    <div className=" p-5 md:p-20">
      <div className="text-4xl text-center font-bold text-sky-900 underline">Please Pay by Stripe</div>
      <br /><br />
      <Elements stripe={stripePromise}>
        <CheckOutForm id={id}></CheckOutForm>
      </Elements>
    </div>
  );
};

export default Payment;
