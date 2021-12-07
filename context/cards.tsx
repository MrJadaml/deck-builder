import { createContext, FC, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { firebase } from '../firebase'

export const CardsContext = createContext([])

export const CardsProvider: FC = ({ children }): JSX.Element => {
  const router = useRouter()
  const { did } = router.query
  const [cards, setCards] = useState([])

  useEffect(async () => {
    const querySnapshot = await firebase.firestore()
      .collection(`decks/${did}/cards`)
      .get()

    const cards = querySnapshot.docs.map(doc => doc.data())
    setCards(cards)
  }, [])

  return (
    <CardsContext.Provider value={{ cards, setCards }}>
      {children}
    </CardsContext.Provider>
  )
}
