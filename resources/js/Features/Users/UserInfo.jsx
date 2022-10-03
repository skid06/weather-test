import React from 'react'

const UserInfo = ({ user }) => {
  return (
    <>
        <div className="w-full flex justify-center">
            <div className="p-6 max-w-sm">
                <a href="#">
                    <h5 className="mb-5 text-2xl font-bold tracking-tight text-black dark:text-black">Customer Details</h5>
                </a>
                <p className="mb-3 font-normal text-black">Name: {user.name}</p>
                <p className="mb-3 font-normal text-black">Email: {user.email}</p>
            </div> 
        </div>    
    </>
  )
}

export default UserInfo