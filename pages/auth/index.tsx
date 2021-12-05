import React, { FC } from 'react'
import { firebase, auth } from '../../firebase'
import { GoogleAuthProvider } from 'firebase/auth'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'

const uiConfig = {
  signInSuccessUrl: '/',
  signInOptions: [
    GoogleAuthProvider.PROVIDER_ID,
  ],
}

const Auth: FC<> = ({}): JSX.Element => {
  return (
    <div>
      <h1>Log In</h1>
      <StyledFirebaseAuth
        uiConfig={uiConfig}
        firebaseAuth={auth}
      />
    </div>
  )
}

export default Auth
