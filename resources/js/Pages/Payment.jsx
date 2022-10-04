import { useEffect, useState } from "react";
import { Head } from "@inertiajs/inertia-react";
import { loadStripe } from '@stripe/stripe-js';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Plan from '@/Features/Plans/Plan';
import UserInfo from '@/Features/Users/UserInfo';
import StripeNotifications from '@/Features/Notifications/StripeNotifications';
import Checkout from '@/Features/Payments/Checkout';



const Payment = (props) => {
    // const [paymentProcessing, setPaymentProcessing] = useState(false);
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

    const getPlans = async () => {
        await fetch(`plans`)
            .then(response => response.json())
            .then(data => {
                setPlans(data);
            })
    };

    const getStripePlan = (stripe_plan) => {
        setStripePlan(stripe_plan)
        console.log('Stripe plan loaded', stripe_plan);
    }

    const closePopUpNotification = (notification) => {
        setStripeNotification(notification);
    }

    useEffect(() => {
        getPlans();
        console.log('props', props);
        setSubscription(props.subscription);
    }, []);

    console.log('Plans loaded', plans)  

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
                                <Plan 
                                    key={plan.id} 
                                    getStripePlan={getStripePlan} 
                                    plan={{...plan, subscription}} 
                                />                           
                                
                            ))}
                        </div>
                        <div className="flex flex-col w-full p-6 bg-white">
                            <UserInfo user={props.auth.user} />
                            <Checkout 
                                user={props.auth.user} 
                                setSubscription={setSubscription} 
                                setStripeNotification={setStripeNotification}
                                plans={plans}
                            />
                        </div>
                        <StripeNotifications closePopUpNotification={closePopUpNotification} notifications={stripeNotification} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>    
  )
}
export default Payment