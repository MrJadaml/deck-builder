import { FC, useState } from 'react'
import { Card } from '../card'
import styles from './card-form.module.css'

export const CardForm: FC = () => {
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

  const handleSave = () => {
    console.log('saved!')
  }

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSave} className={styles.form}>
        <input
          className={styles.field}
          placeholder="Title"
          onChange={handleTitle}
        />

        <input
          className={styles.field}
          placeholder="Description"
          onChange={handleDescription}
        />

        <input
          className={styles.field}
          placeholder="Flavor Text"
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
