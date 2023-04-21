import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom';
// import Carrousel from '../../components/Carrousel/Carrousel';
import CheckoutForm from "../../CheckoutForm/CheckoutForm";
// import socket from "../../helpers/socketHelper";
import { paymentIntent } from "../../../services/CartService";
// import { getOneProperty } from '../../services/Properties.services';
import { getOneBeat } from "../../../services/BeatsService";
// import './ReservePaymentScreen.css';

const stripePromise = loadStripe("pk_test_51LxA2OAzYaaEnlBj4Br2dKk5iw4g8dqA2HdkVdV3zabPPH01r6XQ1IFGZTXZ0gPVaJuVYxG8d1Y5nMcZOURpp3BR00yH9lfgGB");

export default function CheckoutContainer() {
  const [clientSecret, setClientSecret] = useState('');
  const [price, setPrice] = useState('');
  const [beat, setBeat] = useState({});
  const [successfulMessage, setSuccessfulMessage] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    paymentIntent(id)
      .then((data) => {
        setClientSecret(data.clientSecret)
        setPrice(data.reservationPrice)
      })

    getOneBeat(id)
      .then((beat) => {
        setBeat(beat)
      })
  }, [id, navigate]);

//   const appearance = {
//     theme: 'night',
//     variables: {
//       colorPrimary: '#ffd166',
//     },
//   };

//   const options = {
//     clientSecret,
//     appearance
//   }

  const handleSuccessfulPayment = (boolean) => {
    if (boolean) {
      setSuccessfulMessage(true)
    } else {
      setSuccessfulMessage(false)
    }
  }

  return (
    <>
      {clientSecret && price && (
        <div className="CheckoutContainer">
          {successfulMessage ? (
            <Link to="/account/downloads">
              <h2>Success in your Purchase</h2>
              <span>
                <b>Click here</b> to go to your personal area.
              </span>
            </Link>
          ) : (
            <h2>
              You are about to buy your music with exclusive license!
              <br></br>
              <br></br>
              Please, verify carefully the following information:
            </h2>
          )}
          <div className="details-container">
            <div className="beats-details-container">
              <div>
                <p>{beat.name}</p>
                 <p>{beat.price}</p>
              </div>
            </div>
            {!successfulMessage && (
              <div className="payment-details-container">
                <h6>contract information: EXCLUSIVE LICENSE</h6>
                <p>
                  We will make available to you the download of your beat along with a license agreement for royalty and copyright information<br />
                  *If the reservation is not accepted by the owner, the amount
                  Tanks for your buy!
                </p>
                <Elements options={options} stripe={stripePromise}>
                  <CheckoutForm
                    id={property.id}
                    handleSuccessfulPayment={handleSuccessfulPayment}
                  />
                </Elements>
              </div>
            )}
          </div>
        </div>
      )}
//     </>
  );
}