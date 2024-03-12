import { useState, FC } from 'react'
import { useRouter } from 'next/navigation'

import SigningForm from '@components/forms/signin-form'
import SignupForm from '@components/forms/signup-form'

import { AuthFormType } from './enums/auth-form-type.enum'

interface AuthFormProps {
  allowToggle?: boolean
  redirectTo?: string | null
  defaultForm: AuthFormType
}

const AuthForm: FC<AuthFormProps> = ({ allowToggle = false, redirectTo = null, defaultForm }) => {
  const router = useRouter()

  const [activeForm, setActiveForm] = useState<AuthFormType>(defaultForm)

  const handleFormToggle = (): void => {
    if (allowToggle) {
      activeForm === AuthFormType.SIGNING ? setActiveForm(AuthFormType.SIGNUP) : setActiveForm(AuthFormType.SIGNING)
      return
    }

    if (redirectTo) router.push(redirectTo)
  }

  return (
    <div className="flex flex-col gap-y-2 md:gap-y-4">
      {activeForm === AuthFormType.SIGNING ? (
        <SigningForm onToggleForm={handleFormToggle} />
      ) : (
        <SignupForm onToggleForm={handleFormToggle} />
      )}
    </div>
  )
}

export default AuthForm
