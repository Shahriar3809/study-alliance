import PropTypes from "prop-types";

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CheckOutForm = ({ id }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const axiosSecure = useAxiosSecure();
  const [clientSecret, setClientSecret] = useState("");
  const { user, loading } = useAuth();
  const [transactionId, setTransactionId] = useState("");
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const { data = {}, error: queryError } = useQuery({
    queryKey: ["paymentItem"],
    enabled: !loading && !!id,
    queryFn: async () => {
      try {
        const { data } = await axiosSecure.get(`/my-payment-item-data/${id}`);
        return data;
      } catch (err) {
        throw new Error("Error fetching payment item data");
      }
    },
  });

  const {
    title,
    tutorName,
    tutorEmail,
    description,
    startDate,
    endDate,
    classStartDate,
    classEndDate,
    duration,
    fee = 0,
    _id: sessionId,
  } = data;

  if (queryError) {
    console.error("Error fetching data:", queryError.message);
  }

  useEffect(() => {
    if (fee > 0) {
      axiosSecure
        .post("/create-payment-intent", { price: fee })
        .then((res) => {
          console.log("Client Secret:", res.data.clientSecret);
          setClientSecret(res.data.clientSecret);
        })
        .catch((error) =>
          console.error("Error creating payment intent:", error)
        );
    }
  }, [axiosSecure, fee]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
      return;
    } else {
      setError("");
      console.log(paymentMethod);
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      console.log("Confirm Error:", confirmError);
      setError(confirmError.message);
    } else {
      if (paymentIntent.status === "succeeded") {
        setTransactionId(paymentIntent.id);
        const detailsOfSession = {
          title,
          tutorName,
          tutorEmail,
          description,
          startDate,
          endDate,
          classStartDate,
          classEndDate,
          duration,
          fee,
          sessionId: sessionId,
        };

        const purchaseData = { ...detailsOfSession, studentEmail: user?.email };
        const res = await axiosPublic.post("/booked-session", purchaseData);
        if (res.data.insertedId) {
          Swal.fire({
            title: "Successful!",
            text: "Your Booking is Successful",
            icon: "success",
          });
          navigate("/dashboard/user/my-booked-session");
        } else if (res.data.exist) {
          Swal.fire({
            title: "Sorry!",
            text: "Already Booked this session",
            icon: "error",
          });
          navigate("/dashboard/user/my-booked-session");
        }
      }
    }
  };

  useEffect(() => {
    console.log("Stripe or ClientSecret changed", stripe, clientSecret);
  }, [stripe, clientSecret]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className="btn bg-sky-950 text-white font-bold mt-5"
          type="submit"
          disabled={!stripe || !clientSecret}
        >
          Pay
        </button>
        <p className="text-red-600">{error}</p>
        {transactionId && (
          <p className="text-green-500">Transaction Id: {transactionId}</p>
        )}
      </form>
    </div>
  );
};


CheckOutForm.propTypes = {
  id: PropTypes.any,
};
export default CheckOutForm;
