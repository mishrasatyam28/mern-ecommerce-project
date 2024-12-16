import CommonForm from '@/components/common/form'
import { loginFormControls } from '@/config'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const initialState = {
  email: '',
  password:''
}

const AuthLogin = () => {
  const [formData, setFormData] = useState(initialState)

  function onSubmit() {
    
  }

  return (
    <div className='mx-auto w-full max-w-md space-y-6'>
      <div className="text-center">
       <h1 className='text-3xl font-bold tracking-tight text-foreground'>Sign in your Account</h1>
        <p className=''>Don't have an account
          <Link className="font-medium ml-2 text-primary hover:underline" to={'/auth/register'}>Register</Link>
        </p>
       
      </div>
      <CommonForm
          formControls={loginFormControls}
          buttonText={'Sign In'}
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
        />
    </div>
  )
}

export default AuthLogin


// Backend part 1:44