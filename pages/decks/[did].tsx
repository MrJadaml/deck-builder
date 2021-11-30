import { FC, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import { useCollection } from 'react-firebase-hooks/firestore'
import styles from './deck.module.css'

const db = firebase.firestore()

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
    </div>
  )
}

export default Deck
