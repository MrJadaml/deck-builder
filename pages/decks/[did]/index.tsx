import { FC, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { firebase, db } from '../../../firebase'
import { CardForm } from '../../../components/card-form'
import { Cards } from '../../../components/cards'
import { CardsProvider } from '../../../context/cards'
import styles from './deck.module.css'

const defaultDeck = {
  name: '',
  description: '',
}

const Deck: FC = () => {
  const router = useRouter()
  const { did } = router.query
  const [deck, setDeck] = useState(defaultDeck)

  useEffect(() => {
    (async () => {
      const doc = await db.collection('decks').doc(did as string).get()

      if (doc.exists) {
        console.log(doc.data())
        setDeck(doc.data())
      }
    })()
  }, [did])

  return (
    <div className={styles.wrapper}>
      <h1>{deck.name}</h1>

      <div>{deck.description}</div>

      <CardsProvider>
        <CardForm />
        <hr />
        <Cards />
      </CardsProvider>
    </div>
  )
}

export default Deck
