import React, { FC, useContext } from 'react'
import Link from 'next/link'
import firebase from '../../firebase'
import { getAuth, signOut } from 'firebase/auth'
import { AuthContext } from '../../context/auth'

export const Layout: FC<> = ({ children }): JSX.Element => {
  const [ user ] = useContext(AuthContext)
  const handleSignOut = async () => {
    try {
      const auth = getAuth()
      await signOut(auth)
      // clear data/cookies and redirect to /auth or /
    } catch (err) {
      console.log(`Error logging out: ${err}`)
    }
  }

  return (
    <div>
      <header>
        { user?.email }
        { user?.email
           ? <button onClick={handleSignOut}>Log Out</button>
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
