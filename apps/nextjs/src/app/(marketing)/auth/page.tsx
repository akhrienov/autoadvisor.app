'use client'
import AuthForm, { AuthFormTypes } from '@/components/forms/auth-form/auth-form.component'

const AuthPage = () => {
  return (
    <div className="flex h-full items-center justify-center px-6">
      <div className="w-full lg:w-3/5">
        <AuthForm defaultForm={AuthFormTypes.SIGNING} allowToggle={true} />
      </div>
    </div>
  )
}

export default AuthPage
