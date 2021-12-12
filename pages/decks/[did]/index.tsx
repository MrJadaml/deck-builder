import { FC, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { firebase, db } from '../../../firebase'
import { CardForm } from '../../../components/card-form'
import { Cards } from '../../../components/cards'
import { CardsProvider } from '../../../context/cards'
import styles from './deck.module.css'

const Deck: FC = ({ name }) => {
  const router = useRouter()
  const { did } = router.query
  const [deck, setDeck] = useState({ name: '' })

  useEffect(async () => {
    const doc = await db.collection('decks').doc(did).get()

    if (doc.exists) {
      setDeck(doc.data())
    }
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
