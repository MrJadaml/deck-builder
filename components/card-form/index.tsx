import { FC, useContext, useState } from 'react'
import { useRouter } from 'next/router'
import { firebase, db } from '../../firebase'
import { AuthContext } from '../../context/auth'
import { Card } from '../card'
import styles from './card-form.module.css'

export const CardForm: FC = () => {
  const router = useRouter()
  const { did } = router.query
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

  const handleSubmit = async (evt: React.Form<HTMLFormElement>) => {
    evt.preventDefault()

    try {
      const nextCard = {
        title,
        description,
        flavorText,
      }

      const docRef = db.collection(`decks/${did}/cards`).add(nexCard)
      const doc = await docRef
    } catch (err) {
      console.log(`#handleSave Error: ${err}`)
    }
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
