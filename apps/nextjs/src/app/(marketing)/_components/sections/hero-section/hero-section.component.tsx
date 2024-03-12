'use client'
import AuthForm from '@/components/forms/auth-form'
import { AuthFormType } from '@components/forms/auth-form/enums/auth-form-type.enum'
import { ROUTES } from '@/constants/routes.constants'

const HeroSection = () => {
  return (
    <div className="flex h-full items-center justify-center px-6 lg:px-0">
      <div className="flex h-full max-w-3xl flex-col justify-center">
        <div className="mb-5">
          <h1 className="animate-text bg-gradient-to-r from-primary via-purple-700 to-violet-700 bg-clip-text pb-2.5 text-4xl font-bold text-transparent md:text-5xl lg:text-6xl">
            Real-time assistance straight from your screen.
          </h1>
          <p className="py-2 text-base">
            Expert Car Care at Your Fingertips – Connect instantly with professional mechanics or AI-driven advice for
            all your auto needs.
          </p>
        </div>
        <AuthForm defaultForm={AuthFormType.SIGNUP} redirectTo={ROUTES.AUTH_PAGE.ROOT} />
      </div>
    </div>
  )
}

export default HeroSection
