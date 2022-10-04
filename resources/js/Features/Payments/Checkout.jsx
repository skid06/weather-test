import { useEffect, useState } from "react";
import { loadStripe } from '@stripe/stripe-js';

const Checkout = ({ user, setSubscription, setStripeNotification, stripePlan, plans }) => {
    const [paymentProcessing, setPaymentProcessing] = useState(false);
    const [stripeInit, setStripeInit] = useState("");
    const [cardElementInit, setCardElementInit] = useState("");

    const loadStripeInfo = async () => {
        let cardElement;
        const stripe = await loadStripe('pk_test_6U1m46jdZGhMLQRn2fF2SHna');
        setStripeInit(stripe);
    
        const elements = stripe.elements();
        cardElement = elements.create('card', {
            classes: {
                base: 'bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 text-base outline-none text-gray-700 p-3 leading-8 transition-colors duration-200 ease-in-out'
            }
        });
        cardElement.mount('#card-element');
    
        setCardElementInit(cardElement);
    }; 
    
    const processPayment = async () => {
        setPaymentProcessing(true);
        const {paymentMethod, error} = await stripeInit.createPaymentMethod(
            'card', cardElementInit, {
                billing_details: {
                    name: user.name,
                    email: user.email,
                }
            }
        );
        
        if (error) {
            setPaymentProcessing(false);
            setStripeNotification({message: error.message, status: true, type: 'warning' });
            return;
        } else {
            if(!stripePlan) {
                setPaymentProcessing(false);
                setStripeNotification({message: "Choose a plan.", status: true, type: 'warning' });
                return;
            }
            // console.log('paymentMethod',paymentMethod);
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ "payment_method": paymentMethod.id, "plan": plans.find(plan => plan.stripe_plan === stripePlan)})
            };
    
            fetch('/subscribe', requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    setPaymentProcessing(false);
                    setStripeNotification({message: data.name, status: true, type: 'success' });
                    setSubscription(plans.find(plan => plan.name === data.name).id)
                })
                .catch((error) => {
                    setPaymentProcessing(false);
                    setStripeNotification({message: error, status: true, type: 'danger' });
                    console.log(error);
                });
        }
    };
    
    useEffect(() => {
        loadStripeInfo();
        // setSubscription(user_subscription);
    }, []);

  return (
    <div className="w-full flex flex-col justify-center">
        <div className="mx-2 mt-4 flex justify-center">
            <div className="p-2 w-1/2">
                <div className="relative">
                    <label htmlFor="card-element" className="leading-7 text-sm text-gray-600">Credit Card Info</label>
                    <div id="card-element"></div>
                </div>
            </div>
        </div>
        <div className="flex justify-center">
            <button
                className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                onClick={processPayment}
                disabled={paymentProcessing}
            >{paymentProcessing ? 'Processing' : 'Pay Now'}</button>
        </div>
    </div>
  )
}

export default Checkout