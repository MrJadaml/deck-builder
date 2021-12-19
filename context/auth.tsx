import { createContext, FC, useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { firebase, db } from '../firebase'
import { doc, setDoc } from 'firebase/firestore'

interface IUser {
  id: string
  name: string | null
  email: string | null
}

export const AuthContext = createContext({})

export const AuthProvider: FC = ({ children }): JSX.Element => {
  const [currentUser, setCurrentUser] = useState<IUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const auth = getAuth()

  useEffect(() => {
    onAuthStateChanged(auth, async (authUser) => {
      const firestore = firebase.firestore()

      if (authUser) {
        const userDoc = await db.collection('users').doc(authUser.uid).get()

        if (!userDoc.exists) {
          await setDoc(doc(db, 'users', authUser.uid), {
            name: authUser.displayName,
            email: authUser.email,
          })
        }

        // sorting out difference between Auth User and creating a Firestore User "currentUser" to store 
        // related docs and other data 
        setCurrentUser({
          id: authUser.uid,
          name: authUser.displayName,
          email: authUser.email,
        })

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
    <AuthContext.Provider value={{ currentUser, setCurrentUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}
