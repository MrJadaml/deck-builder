import React, { FC } from 'react'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'

const uiConfig = {
  signInSuccessUrl: '/',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  ],
}

const Auth: FC<> = ({}): JSX.Element => {
  return (
    <div>
      <h1>hi</h1>
      <StyledFirebaseAuth
        uiConfig={uiConfig}
        firebaseAuth={firebase.auth()}
      />
    </div>
  )
}

export default Auth
