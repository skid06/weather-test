import React from 'react'
import Radiobox from '@/Components/Radiobox';

const Plan = ({ plan, getStripePlan}) => {
  return (
    <div 
        key={plan.id} 
        className={`
            p-6 max-w-sm bg-white rounded-lg shadow-md 
            ${plan.id > plan.subscription ? `border border-blue-200` 
                : `border-2 border-gray-200`} 
            ${plan.id === plan.subscription && `bg-green-500`}
        `}
    >
        {plan.id === plan.subscription && <div className='mb-2 text-2xl font-bold '>Active Subscription</div>}
        <h5 
            className={`
                mb-2 text-2xl font-bold tracking-tight text-black dark:text-black 
                ${plan.id < plan.subscription && `line-through`}
            `}
        >
                {plan.name} - ${plan.price}/mo
        </h5>
        <p className={`
                mb-3 font-normal text-black 
                ${plan.id < plan.subscription ? `line-through`: ``}
            `}
        >
                {plan.description}
        </p>
        {plan.id > plan.subscription && 
            <Radiobox
                type="radio"
                name="plan"
                id="plan1"
                value={plan.stripe_plan}
                className="mt-1 block w-full"
                handleChange={(e) => getStripePlan(e.target.value)}
                
            />
        }
    </div>
  )
}

export default Plan;