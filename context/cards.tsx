import { createContext, FC, useEffect, useState, Dispatch, SetStateAction } from 'react'
import { useRouter } from 'next/router'
import { firebase } from '../firebase'

interface ICard {
  title?: string
  description?: string
  flavorText?: string
}

interface IContextProps {
  cards: ICard[]
  setCards: Dispatch<SetStateAction<ICard[]>> 
}

export const CardsContext = createContext({} as IContextProps)

export const CardsProvider: FC = ({ children }): JSX.Element => {
  const router = useRouter()
  const { did } = router.query
  const [cards, setCards] = useState<ICard[]>([])

  useEffect(() => {
    async () => {
      const querySnapshot = await firebase.firestore()
        .collection(`decks/${did}/cards`)
        .get()

      const cards = querySnapshot.docs.map(doc => doc.data())
      setCards(cards)
    }
  }, [])

  return (
    <CardsContext.Provider value={{ cards, setCards }}>
      {children}
    </CardsContext.Provider>
  )
}
