import { FC, useContext, useEffect, useState } from 'react'
import { firebase } from '../../firebase'
import { CardsContext } from '../../context/cards'
import { Card } from '../card'
import styles from './cards.module.css'

export const Cards: FC = () => {
  const { cards } = useContext(CardsContext)

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
