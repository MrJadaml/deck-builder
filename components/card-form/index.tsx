import { FC, useContext, useState } from 'react'
import { firebase } from '../../firebase'
import { AuthContext } from '../../context/auth'
import { Card } from '../card'
import styles from './card-form.module.css'

const db = firebase.firestore()

interface Card {
  title: string
  description: string
  flavorText: string
}

export const CardForm: FC = () => {
  const [ user ] = useContext(AuthContext)
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [flavorText, setFlavorText] = useState<string>('')

  const handleTitle = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(evt.target.value)
  }

  const handleDescription = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(evt.target.value)
  }

  const handleFlavorText = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setFlavorText(evt.target.value)
  }

  const handleSave = async (card: Card) => {
    try {
      db.collection('cards').add(card)
    } catch (err) {
      console.log(`#handleSave Error: ${err}`)
    }
  }

  const handleSubmit = (evt: React.ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault()

    handleSave({
      title,
      description,
      flavorText,
    })
  }

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          className={styles.field}
          placeholder="Title..."
          onChange={handleTitle}
        />

        <input
          className={styles.field}
          placeholder="Description..."
          onChange={handleDescription}
        />

        <input
          className={styles.field}
          placeholder="Flavor Text..."
          onChange={handleFlavorText}
        />

        <input
          className={styles.field}
          type="submit"
          value="Save"
         />
      </form>

      <Card
        title={title}
        description={description}
        flavorText={flavorText}
      />
    </div>
  );
}
