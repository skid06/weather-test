import React, { useEffect, useReducer, useState } from 'react'
import { Inertia } from '@inertiajs/inertia'
import { Head } from "@inertiajs/inertia-react";
// import {Elements, useStripe, useElements, PaymentElement} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Radiobox from '@/Components/Radiobox';
import Plan from '@/Features/Plans/Plan';


const Payment = (props) => {
    const [paymentProcessing, setPaymentProcessing] = useState(false);
    const [stripePlan, setStripePlan] = useState("");
    const [plans, setPlans] = useState([]);
    const [stripeInit, setStripeInit] = useState("");
    const [cardElementInit, setCardElementInit] = useState("");

    let cardElement;

    const loadStripeInfo = async () => {
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

    const getPlans = async () => {
        await fetch(`plans`)
            .then(response => response.json())
            .then(data => {
                setPlans(data);
            })
    };

    const processPayment = async () => {
        // setPaymentProcessing(true);
        const {paymentMethod, error} = await stripeInit.createPaymentMethod(
            'card', cardElementInit, {
                billing_details: {
                    name: props.auth.user.name,
                    email: props.auth.user.email,
                }
            }
        );

        console.log('plan', stripePlan)
        console.log('error', error)
        
        if (error) {
            // setPaymentProcessing(false);
            console.error(error);
        } else {
            console.log('paymentMethod',paymentMethod);
            // setPaymentProcessing(false);
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ "payment_method": paymentMethod.id, "plan": plans.find(plan => plan.stripe_plan === stripePlan)})
            };

            fetch('/subscribe', requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                })
                .catch((error) => {
                    // paymentProcessing = false;
                    console.log(error);
                });
        }
    };

    useEffect(() => {
        loadStripeInfo();
        getPlans();
        console.log('props', props);
    }, []);

    console.log('Plans loaded', plans)  
     
    const getStripePlan = (stripe_plan) => {
        setStripePlan(stripe_plan)
        console.log('Stripe plan loaded', stripe_plan);
    }

  return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Payment" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex flex-col bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="flex flex-row w-full justify-around mt-5">
                          {/* {plans.find(find => find.id === props.subscription)?.name ?? <div>Free Use</div>} */}
                          {plans.some(plan => plan.id === props.subscription) &&
                            plans.map(plan => 
                                (
                                    <Plan key={plan.id} getStripePlan={getStripePlan} plan={{...plan, subscription: props.subscription}} />                           
                                ) 
                          )}
                        </div>
                        <div className="flex flex-col w-full p-6 bg-white border-b border-gray-200">
                            <div className="w-full flex justify-center">
                                <div class="p-6 max-w-sm">
                                    <a href="#">
                                        <h5 class="mb-5 text-2xl font-bold tracking-tight text-black dark:text-black">Customer Details</h5>
                                    </a>
                                    <p class="mb-3 font-normal text-black">Name: {props.auth.user.name}</p>
                                    <p class="mb-3 font-normal text-black">Email: {props.auth.user.email}</p>
                                </div> 
                            </div>
                            <div className="w-full flex flex-col justify-center">
                                <div className="mx-2 mt-4 flex justify-center">
                                    <div className="p-2 w-1/2">
                                        <div className="relative">
                                            <label for="card-element" className="leading-7 text-sm text-gray-600">Credit Card Info</label>
                                            <div id="card-element"></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-center">
                                    <button
                                        className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                                        onClick={processPayment}
                                        // disabled={paymentProcessing}
                                    >{paymentProcessing ? 'Processing' : 'Pay Now'}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>    
  )
}
export default Payment