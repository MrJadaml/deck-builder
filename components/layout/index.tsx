import { FC, useContext } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import firebase from '../../firebase'
import { getAuth, signOut } from 'firebase/auth'
import { AuthContext } from '../../context/auth'

export const Layout: FC<> = ({ children }): JSX.Element => {
  const { user, setUser } = useContext(AuthContext)
  const router = useRouter()

  const handleSignOut = async () => {
    try {
      const auth = getAuth()
      await signOut(auth)
      // clear data/cookies and redirect to /auth or /
      setUser(null)
      router.push('/auth')
    } catch (err) {
      console.log(`Error logging out: ${err}`)
    }
  }

  return (
    <div>
      <header>
        {user?.email && (
          <>
            {user.email}
            <button onClick={handleSignOut}>Log Out</button>
          </>
        )}

        {!user && router.pathname !== '/auth' && (
          <Link href="/auth">Log in</Link>
        )}
      </header>
        { children }
      <footer>
        footer
      </footer>
    </div>
  )
}
