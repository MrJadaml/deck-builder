import React, { FC, useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import { AuthContext } from '../../context/auth'
import { firebase, db } from '../../firebase'
import { collection, doc, addDoc, getDocs, deleteDoc, query, where } from 'firebase/firestore'
import styles from './decks.module.css'

const Decks: FC = ({ }) => {
  const { user } = useContext(AuthContext)
  const [isModalVisible, setIsModalVisible] = useState<bool>(false)
  const [deckName, setDeckName] = useState<string>('')
  const [deckDescription, setDeckDescription] = useState<string>('')
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

  const handleDeckDescription = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setDeckDescription(evt.target.value)
  }

  const handleDeleteDeck = async (deckID: string) => {
    const nextDecks = decks.filter(deck => deck.id !== deckID)

    setDecks(nextDecks)
    await deleteDoc(doc(db, 'decks', deckID))    
  }

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    try {
      evt.preventDefault()

      const nextDeck = {
        name: deckName,
        description: deckDescription,
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

            <br />

            <textarea
              className={styles.field}
              placeholder="Description..."
              onChange={handleDeckDescription}
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
          <div key={deck.name}>
            <Link href={`/decks/${deck.id}`}>
              <div className={styles.tile}>
                <h2>{deck.name}</h2>
                {deck.description && <hr />}
                <div>
                  {deck.description}
                </div>
              </div>
            </Link>

            <button onClick={() => { handleDeleteDeck(deck.id) }}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Decks
