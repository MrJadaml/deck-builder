import { FC, useEffect, useState } from 'react'
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import { useCollection } from 'react-firebase-hooks/firestore'
import { Card } from '../card'
import styles from './cards.module.css'

interface CardsTypes {
  cards?: Array<any>
}

export const Cards: FC<CardsTypes> = ({ }) => {
  const [cards, setCards] = useState([])
  const [cardDocs, cardDocsLoading, cardDocsError] = useCollection(
    firebase.firestore().collection('cards'),
    {},
  )

  useEffect(() => {
    if (!cardDocsLoading && cards) {
      const cards = cardDocs.docs.map(doc => doc.data())
      setCards(cards)
    }
  }, [cardDocs])


  return (
    <div className={styles.wrapper}>
      {cards.map(({ title, description, flavorText }) => (
        <Card
          title={title}
          description={description}
          flavorText={flavorText}
        />
      ))}
    </div>
  )
}
