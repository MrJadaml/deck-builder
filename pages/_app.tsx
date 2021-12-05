import React, { FC } from 'react'
import { AppProps } from 'next/app'
import { AuthProvider } from '../context/auth'
import { Layout } from '../components/layout'

const MyApp: FC<AppProps> = ({
  Component,
  pageProps,
}: AppProps): JSX.Element => {
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  )
}

export default MyApp
