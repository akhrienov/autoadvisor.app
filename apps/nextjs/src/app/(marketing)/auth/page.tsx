'use client'
import AuthForm from '@/components/forms/auth-form'
import { AuthFormType } from '@/components/forms/auth-form/enums/auth-form-type.enum'

const AuthPage = () => {
  return (
    <div className="flex h-full items-center justify-center px-6">
      <div className="w-full lg:w-3/5">
        <AuthForm defaultForm={AuthFormType.SIGNING} allowToggle={true} />
      </div>
    </div>
  )
}

export default AuthPage
