import React, { useEffect, useReducer, useState } from 'react'
import { Inertia } from '@inertiajs/inertia'
import { Head } from "@inertiajs/inertia-react";
import {Elements, useStripe, useElements, PaymentElement} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";


const Profile = (props) => {
    // const [data, setData] = useReducer(formReducer, {})
    const [paymentProcessing, setPaymentProcessing] = useState(false);
    // const [stripePromise, setStripePromise] = useState('');
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
            <Head title="Profile" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="flex flex-wrap -mx-2 mt-4">
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
        </AuthenticatedLayout>    
  )
}
export default Profile