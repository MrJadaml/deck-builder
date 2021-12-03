import React, { FC } from 'react'
import Link from 'next/link'
import firebase from '../../firebase'
import { getAuth, signOut } from "firebase/compat/auth"
import { useAuthState } from 'react-firebase-hooks/auth'

export const Layout: FC<> = ({ children }): JSX.Element => {
  const authy = firebase.auth()
  const [user, loading, error] = useAuthState(authy)

  const handleSignOUt = async () => {
    try {
      const auth = await getAuth()
      await signOut(auth)
      console.log('log out')
    } catch (err) {
      console.log(`Error logging out: ${err}`)
    }
  }

  return (
    <div>
      <header>
        { user?.email }
        { user?.email
           ? <button onClick={handleSignOUt}>Log Out</button>
           : <Link href="/auth">Log in</Link>
        }
      </header>
        { children }
      <footer>
        footer
      </footer>
    </div>
  )
}
