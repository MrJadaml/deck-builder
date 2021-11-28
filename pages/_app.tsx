import React, { FC, useEffect } from 'react'
import cookie from 'js-cookie'
import { AppProps } from 'next/app'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import { firebaseConfig } from '../firebase/client-app'
import { Layout } from '../components/layout'

firebase.initializeApp(firebaseConfig)

const MyApp: FC<AppProps> = ({
  Component,
  pageProps,
}: AppProps): JSX.Element => {
  useEffect(() => {
    try {
      return firebase.auth().onAuthStateChanged(async (user) => {
        if (user) {
          const token = await user.getIdToken()

          cookie.set('token', token, {
            expires: 1,
            path: '/',
          })
        } else {
          firebase.auth().signInAnonymously()
        }
      })
    } catch (err) {
      console.log(`Auth Error: ${err}`)
    }
  }, [])

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
