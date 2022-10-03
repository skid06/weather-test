import React from 'react'

const UserInfo = ({ user }) => {
  return (
    <>
        <div className="w-full flex justify-center">
            <div class="p-6 max-w-sm">
                <a href="#">
                    <h5 class="mb-5 text-2xl font-bold tracking-tight text-black dark:text-black">Customer Details</h5>
                </a>
                <p class="mb-3 font-normal text-black">Name: {user.name}</p>
                <p class="mb-3 font-normal text-black">Email: {user.email}</p>
            </div> 
        </div>    
    </>
  )
}

export default UserInfo