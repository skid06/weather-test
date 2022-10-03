import React, { useEffect, useReducer, useState } from 'react'
import { Head } from "@inertiajs/inertia-react";
import { loadStripe } from '@stripe/stripe-js';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Plan from '@/Features/Plans/Plan';
import UserInfo from '@/Features/Users/UserInfo';


const Payment = (props) => {
    const [paymentProcessing, setPaymentProcessing] = useState(false);
    const [stripePlan, setStripePlan] = useState("");
    const [plans, setPlans] = useState([]);
    const [stripeInit, setStripeInit] = useState("");
    const [cardElementInit, setCardElementInit] = useState("");
    const [subscription, setSubscription] = useState(0);
    const [stripeNotification, setStripeNotification] = useState({
        message: "",
        status: false,
        type: "",
    });

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

    const getPlans = async () => {
        await fetch(`plans`)
            .then(response => response.json())
            .then(data => {
                setPlans(data);
            })
    };

    const processPayment = async () => {
        setPaymentProcessing(true);
        const {paymentMethod, error} = await stripeInit.createPaymentMethod(
            'card', cardElementInit, {
                billing_details: {
                    name: props.auth.user.name,
                    email: props.auth.user.email,
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
                    // console.log(error);
                });
        }
    };

    useEffect(() => {
        loadStripeInfo();
        getPlans();
        console.log('props', props);
        setSubscription(props.subscription);
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
                           {plans.map(plan => (
                                <Plan key={plan.id} getStripePlan={getStripePlan} plan={{...plan, subscription}} />                           
                                
                            ))}
                        </div>
                        <div className="flex flex-col w-full p-6 bg-white">
                            <UserInfo user={props.auth.user} />
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
                        </div>
                        <div className='stripe-notifications'>
                            <div id="toast-success" className={`${!stripeNotification.status && `hidden` } flex items-center float-right p-4 mb-4 mr-4 w-full max-w-xs text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800`} role="alert">
                                {stripeNotification.type == 'success' &&
                                    <div className='text-green-500 bg-green-100 dark:bg-green-800 dark:text-green-200 inline-flex flex-shrink-0 justify-center items-center w-8 h-8 rounded-lg'>
                                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                        <span className="sr-only">Check icon</span>                                        
                                    </div>
                                }
                                {stripeNotification.type == 'danger' &&
                                    <div className='text-red-500 bg-red-100 dark:bg-red-800 dark:text-red-200 inline-flex flex-shrink-0 justify-center items-center w-8 h-8 rounded-lg'>
                                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                        <span className="sr-only">Error icon</span>                                        
                                    </div>

                                }
                                {stripeNotification.type == 'warning' &&
                                    <div className='text-orange-500 bg-orange-100 dark:bg-orange-700 dark:text-orange-200 inline-flex flex-shrink-0 justify-center items-center w-8 h-8 rounded-lg'>
                                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                                        <span className="sr-only">Warning icon</span>                                        
                                    </div>

                                }                                                                      
                                <div className="ml-3 text-sm font-normal">
                                    {stripeNotification.type == 'success' ? `You have successfully subscribed to ${stripeNotification.message} plan` : stripeNotification.message}
                                    
                                </div>
                                <button type="button" onClick={() => setStripeNotification({message: "", status: false, type: ""})} className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-success" aria-label="Close">
                                    <span className="sr-only">Close</span>
                                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>    
  )
}
export default Payment