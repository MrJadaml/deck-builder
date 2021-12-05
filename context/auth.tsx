import { createContext, FC, useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import firebase from '../firebase'

export const AuthContext = createContext({})

export const AuthProvider: FC = ({ children }): JSX.Element => {
  const [currentUser, setCurrentUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState({
    name: '',
    email: '',
  })

  const auth = getAuth()

  useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        const requiredData = {
          name: authUser.displayName,
          email: authUser.email,
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
    <AuthContext.Provider value={{ user, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}
