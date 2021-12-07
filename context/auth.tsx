import { createContext, FC, useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { firebase, db } from '../firebase'
import { doc, setDoc } from 'firebase/firestore'

export const AuthContext = createContext()

export const AuthProvider: FC = ({ children }): JSX.Element => {
  const [currentUser, setCurrentUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState({
    name: '',
    email: '',
  })

  const auth = getAuth()

  useEffect(() => {
    onAuthStateChanged(auth, async (authUser) => {
      const firestore = firebase.firestore()

      if (authUser) {
        const requiredData = {
          id: authUser.uid,
          name: authUser.displayName,
          email: authUser.email,
        }

        const userDoc = await db.collection('users').doc(authUser.uid).get()

        if (!userDoc.exists) {
          await setDoc(doc(db, 'users', authUser.uid), {
            name: authUser.displayName,
            email: authUser.email,
          })
        }

        setUser(requiredData)
        setCurrentUser(authUser)

      } else {
        setCurrentUser(null)
      }

      setIsLoading(false)
    })
  }, [])

  if (isLoading) {
    return <>Loading...</>
  }

  return (
    <AuthContext.Provider value={{ user, setUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}
