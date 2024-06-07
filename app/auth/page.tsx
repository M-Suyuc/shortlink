'use client'

import Facebook, { GithubLogo, GoogleLogo, Logo } from '@/components/logos'
import { Button } from '@/components/ui/button'
import { Loader } from 'lucide-react'
import { signIn } from 'next-auth/react'
import { useState } from 'react'

const socialProviders = [
  {
    name: 'Continue with Google',
    icon: <GoogleLogo className='h-5 w-5' />,
    provider: 'google'
  },
  {
    name: 'Continue with GitHub',
    icon: <GithubLogo className='h-5 w-5' />,
    provider: 'github'
  },
  {
    name: 'Continue with Facebook',
    icon: <Facebook className='h-5 w-5' />,
    provider: 'facebook'
  }
]

const AuthPage = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [provider, setProvider] = useState<string | null>()

  const handleSocialLogin = async (provider: string) => {
    try {
      setLoading(true)
      setProvider(provider)
      await signIn(provider)
    } catch (error) {
      console.error('An error occurred while trying to sign in')
    }
  }

  return (
    <div className='flex justify-center items-center gap-4 min-h-[calc(100vh-5rem)] h-full'>
      <div className='bg-neutral-900 flex flex-col justify-center items-center gap-3 p-8 rounded-md'>
        <Logo className='size-10' />
        <p className='text-xl text-neutral-400 pb-4'>
          Sign in with your preferred provider
        </p>
        {socialProviders.map((sp) => (
          <Button
            key={sp.provider}
            variant='outline'
            className='flex gap-4 border-neutral-700 py-6 w-full'
            disabled={loading}
            name={sp.name}
            onClick={() => handleSocialLogin(sp.provider)}
          >
            {provider === sp.provider ? (
              <Loader className='animate-spin' size={18} />
            ) : (
              <div className=''>{sp.icon}</div>
            )}
            <span>{sp.name}</span>
          </Button>
        ))}
      </div>
    </div>
  )
}

export default AuthPage
