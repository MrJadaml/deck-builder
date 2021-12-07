import { FC, useEffect, useState } from 'react'
import { firebase } from '../../firebase'
import { Card } from '../card'
import styles from './cards.module.css'

interface CardTypes {
  deckID: string
}

export const Cards: FC<CardTypes> = ({ deckID }) => {
  const [cards, setCards] = useState([])

  useEffect(async () => {
    const querySnapshot = await firebase.firestore()
      .collection(`decks/${deckID}/cards`)
      .get()

    const cards = querySnapshot.docs.map(doc => doc.data())
    setCards(cards)
  }, [])

  return (
    <div className={styles.wrapper}>
      {cards.map(({ title, description, flavorText }) => (
        <Card
          key={title}
          title={title}
          description={description}
          flavorText={flavorText}
        />
      ))}
    </div>
  )
}
