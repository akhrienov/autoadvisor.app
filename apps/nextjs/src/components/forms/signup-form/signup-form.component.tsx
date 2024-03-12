import { FC } from 'react'
import { ArrowLongRightIcon } from '@heroicons/react/24/outline'
import { useForm, SubmitHandler } from 'react-hook-form'

import Button, { ButtonColorScheme } from '@components/ui/button'
import { useAuth } from '@hooks/useAuth'
import { FacebookIcon, GoogleIcon } from '@assets/media/icons'
import { SignupInputs } from '@components/forms/signup-form/interfaces/signup-inputs.interface'

export interface SignupFormProps {
  onToggleForm: () => void
}

const SignupForm: FC<SignupFormProps> = ({ onToggleForm }) => {
  const { signup } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupInputs>()

  const onSubmit: SubmitHandler<SignupInputs> = ({ email, password }: SignupInputs) => signup(email, password)

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            type="text"
            placeholder="Email"
            {...register('email', { required: true })}
            className="input input-bordered mb-2 w-full"
          />
          {errors.email && <span>This field is required</span>}
        </div>
        <div>
          <input
            type="text"
            placeholder="Password"
            {...register('password', { required: true })}
            className="input input-bordered mb-2 w-full"
          />
          {errors.password && <span>This field is required</span>}
        </div>
        <Button type="submit" colorScheme={ButtonColorScheme.SLATE_200} block>
          <span className="font-bold text-button-dark">Sign up</span>
          <ArrowLongRightIcon className="ml-2 h-5 w-5 text-button-dark" />
        </Button>
      </form>
      <div className="divider text-sm">Or sign up with</div>
      <div className="flex flex-col">
        <Button colorScheme={ButtonColorScheme.SLATE_800} block>
          <GoogleIcon className="h-5 w-5" />
          <span className="font-bold text-button-light">Google</span>
        </Button>
        <Button colorScheme={ButtonColorScheme.SLATE_800} block>
          <FacebookIcon className="h-5 w-5" />
          <span className="font-bold text-button-light">Facebook</span>
        </Button>
      </div>
      <div className="text-center text-sm">
        <span className="text-button-dark">Already have a account?</span>{' '}
        <a className="text-primary underline hover:cursor-pointer hover:no-underline" onClick={onToggleForm}>
          Log in
        </a>
      </div>
    </>
  )
}

export default SignupForm
