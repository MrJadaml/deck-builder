import { FC, useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import { AuthContext } from '../../context/auth'
import { firebase, db } from '../../firebase'
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore'
import styles from './decks.module.css'

const Decks: FC = ({ }) => {
  const { user } = useContext(AuthContext)
  const [isModalVisible, setIsModalVisible] = useState<bool>(false)
  const [deckName, setDeckName] = useState<string>('')
  const [decks, setDecks] = useState([])

  useEffect(async () => {
    const decksRef = collection(db, 'decks')
    const q = query(decksRef, where('owners', 'array-contains', user.id))
    const deckDocs = await getDocs(q)

    const docs = deckDocs.docs.map(doc => {
      return {
        id: doc.id,
        ...doc.data()
      }
    })

    setDecks(docs)
  }, [])

  const handleToggelModal = () => {
    setIsModalVisible(!isModalVisible)
  }

  const handleDeckName = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setDeckName(evt.target.value)
  }

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    try {
      evt.preventDefault()

      const nextDeck = {
        name: deckName,
        owners: [user.id],
      }

      const docRef = db.collection('decks').add(nextDeck)
      const doc = await docRef

      setDecks([
        ...decks,
        {
          id: doc.id,
          ...nextDeck,
        }
      ])

      setIsModalVisible(false)
    } catch (err) {
      console.log(`#handleCreateDeck Error: ${err}`)
    }
  }

  return (
    <div className={styles.wrapper}>
      <h1>
        Decks
      </h1>

      <div>
        <button onClick={handleToggelModal}>
          (+) New Deck
        </button>
      </div>

      {isModalVisible && (
        <div>
          <h2>Create a New Deck</h2>

          <form onSubmit={handleSubmit}>
            <input
              className={styles.field}
              placeholder="Deck Name..."
              onChange={handleDeckName}
            />

            <input
              className={styles.field}
              type="submit"
              value="Save"
             />
          </form>
          <button onClick={handleToggelModal}>Cancel</button>
        </div>
      )}

      <div className={styles.decks}>
        {decks.map((deck) => (
          <Link
            key={deck.name}
            href={`/decks/${deck.id}`}
          >
            <div className={styles.tile}>
              <h2>{deck.name}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Decks
