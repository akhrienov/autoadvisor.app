import { useState, FC } from 'react'
import { useRouter } from 'next/navigation'

import SigningForm from '@/components/forms/auth-form/components/signing-form.component'
import SignupForm from '@/components/forms/auth-form/components/signup-form.component'

export enum AuthFormTypes {
  SIGNING = 'signing',
  SIGNUP = 'signup',
}

interface AuthFormProps {
  allowToggle?: boolean
  redirectTo?: string | null
  defaultForm: AuthFormTypes
}

const AuthForm: FC<AuthFormProps> = ({ allowToggle = false, redirectTo = null, defaultForm }) => {
  const router = useRouter()

  const [activeForm, setActiveForm] = useState<AuthFormTypes>(defaultForm)

  const handleFormToggle = (): void => {
    if (allowToggle) {
      activeForm === AuthFormTypes.SIGNING ? setActiveForm(AuthFormTypes.SIGNUP) : setActiveForm(AuthFormTypes.SIGNING)
      return
    }

    if (redirectTo) router.push(redirectTo)
  }

  return (
    <div className="flex flex-col gap-y-2 md:gap-y-4">
      {activeForm === AuthFormTypes.SIGNING ? (
        <SigningForm onToggleForm={handleFormToggle} />
      ) : (
        <SignupForm onToggleForm={handleFormToggle} />
      )}
    </div>
  )
}

export default AuthForm
