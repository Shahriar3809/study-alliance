// import { loadStripe } from "@stripe/stripe-js";
// import { Elements } from "@stripe/react-stripe-js";
// import CheckOutForm from "./CheckOutForm";
// import { useParams } from "react-router-dom";

// const stripePromise = loadStripe(`${import.meta.env.VITE_PAYMENT_GATEWAY_PK}`);

// const Payment = () => {
//   const { sessionId } = useParams();
//   // console.log(sessionId);
//   return (
//     <div>
//       <div>Payment Page</div>
//       <Elements stripe={stripePromise}>
//         <CheckOutForm id={sessionId}></CheckOutForm>
//       </Elements>
//     </div>
//   );
// };

// export default Payment;




import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "./CheckOutForm";
import { useParams } from "react-router-dom";

const stripePromise = loadStripe(`${import.meta.env.VITE_PAYMENT_GATEWAY_PK}`);

const Payment = () => {
  const { sessionId:id } = useParams();
  // console.log(sessionId);
  return (
    <div>
      <div className="text-3xl">Please Pay</div>
      <Elements stripe={stripePromise}>
        <CheckOutForm id={id}></CheckOutForm>
      </Elements>
    </div>
  );
};

export default Payment;
