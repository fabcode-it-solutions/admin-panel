import VerifyEmailPage from '@/components/pages/auth/VerifyEmailPage'
import React, { Suspense } from 'react'

const page = () => {
  return (
    <Suspense>
    <VerifyEmailPage />
    </Suspense>
  )
}

export default page