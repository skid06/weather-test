import React, { useEffect, useReducer, useState } from 'react'
import { Inertia } from '@inertiajs/inertia'
import { Head } from "@inertiajs/inertia-react";
import {Elements, useStripe, useElements, PaymentElement} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Radiobox from '@/Components/Radiobox';


const Payment = (props) => {
    const [paymentProcessing, setPaymentProcessing] = useState(false);
    const [plan, setPlan] = useState('');

    let cardElement;

    useEffect(() => {
        const stripeInfo = async () => {
            const stripe = await loadStripe('pk_test_6U1m46jdZGhMLQRn2fF2SHna');
            // setStripePromise(stripe);
            const elements = stripe.elements();
            cardElement = elements.create('card', {
                classes: {
                    base: 'bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 text-base outline-none text-gray-700 p-3 leading-8 transition-colors duration-200 ease-in-out'
                }
            });
            cardElement.mount('#card-element');
        };

        stripeInfo();

    }, []);

    // const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

    const processPayment = async () => {
        alert('fd');
        setPaymentProcessing(true);
        const stripe = await loadStripe('pk_test_6U1m46jdZGhMLQRn2fF2SHna');
        const elements = stripe.elements();
        cardElement = elements.create('card', {
            classes: {
                base: 'bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 text-base outline-none text-gray-700 p-3 leading-8 transition-colors duration-200 ease-in-out'
            }
        });
        cardElement.mount('#card-element');
        const {paymentMethod, error} = await stripe.createPaymentMethod(
            'card', cardElement, {
                billing_details: {
                    name: props.auth.user.name,
                    email: props.auth.user.email,
                }
            }
        );
        // stripe.confirmCardSetup(
        //     props.intent.client_secret,
        //     {
        //         payment_method: {
        //             card: cardElement,
        //             billing_details: {
        //                 name: props.auth.user.name,
        //                 email: props.auth.user.email
        //             }
        //         }
        //     }
        // ).then(function (result) {
        //     if (result.error) {
        //         console.error(result.error.message)
        //         // $('#card-errors').text(result.error.message)
        //         // $('button.pay').removeAttr('disabled')
        //     } else {
        //         paymentMethod = result.setupIntent.payment_method
        //         console.log(paymentMethod)
        //         // $('.payment-method').val(paymentMethod)
        //         // $('.card-form').submit()
        //     }
        // })
        // .catch(error => console.log('error', error, props.intent.client_secret))
        // return;
        if (error) {
            setPaymentProcessing(false);
            console.error(error);
        } else {
            console.log(paymentMethod);
            setPaymentProcessing(false);
            // alert(paymentMethod)
            // this.customer.payment_method_id = paymentMethod.id;
            // this.customer.amount = this.$store.state.cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
            // this.customer.cart = JSON.stringify(this.$store.state.cart);
            // axios.post('/api/purchase', this.customer)
            //     .then((response) => {
            //         this.paymentProcessing = false;
            //         console.log(response);
            //         this.$store.commit('updateOrder', response.data);
            //         this.$store.dispatch('clearCart');
            //         this.$router.push({ name: 'order.summary' });
            //     })
            //     .catch((error) => {
            //         this.paymentProcessing = false;
            //         console.error(error);
            //     });
        }
    };
    const options = {
        // passing the client secret obtained from the server
        clientSecret: props.intent.client_secret,
      };
    console.log('props',props)
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
                        <div className="flex flex-row w-full m-5">
                          <div class="p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md">
                              <a href="#">
                                  <h5 class="mb-2 text-2xl font-bold tracking-tight text-black dark:text-black">Noteworthy technology acquisitions 2021</h5>
                              </a>
                              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                              <Radiobox
                                  type="radio"
                                  name="plan"
                                  id="plan1"
                                  value={plan}
                                  className="mt-1 block w-full"
                                  // handleChange={onHandleChange}
                                  
                              />
                          </div>   
                          <div class="p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md">
                              <a href="#">
                                  <h5 class="mb-2 text-2xl font-bold tracking-tight text-black dark:text-black">Noteworthy technology acquisitions 2021</h5>
                              </a>
                              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                              <Radiobox
                                  type="radio"
                                  name="plan"
                                  id="plan2"
                                  value={plan}
                                  className="mt-1 block w-full"
                                  // handleChange={onHandleChange}
                                  
                              />
                          </div>   
                          <div class="p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md">
                              <a href="#">
                                  <h5 class="mb-2 text-2xl font-bold tracking-tight text-black dark:text-black">Noteworthy technology acquisitions 2021</h5>
                              </a>
                              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                              <Radiobox
                                  type="radio"
                                  name="plan"
                                  id="plan3"
                                  value={plan}
                                  className="mt-1 block w-full"
                                  // handleChange={onHandleChange}
                                  
                              />
                          </div>                      
                        </div>
                        <div className="flex flex-row w-full p-6 bg-white border-b border-gray-200">
                            <div className="w-full">
                                <div class="p-6 max-w-sm">
                                    <a href="#">
                                        <h5 class="mb-5 text-2xl font-bold tracking-tight text-black dark:text-black">Payment Details</h5>
                                    </a>
                                    <p class="mb-3 font-normal text-black">Name: {props.auth.user.name}</p>
                                    <p class="mb-3 font-normal text-black">Email: {props.auth.user.email}</p>
                                    <p class="mb-3 font-normal text-black">Chosen Plan: $10 per month - Standard</p>
                                </div> 
                            </div>
                            <div className="w-full">
                                <div className="mx-2 mt-4">
                                        <div className="p-2 w-full">
                                            <div className="relative">
                                                <label for="card-element" className="leading-7 text-sm text-gray-600">Credit Card Info</label>
                                                <div id="card-element"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-2 w-full">
                                        <button
                                            className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                                            onClick={processPayment}
                                            disabled={paymentProcessing}
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