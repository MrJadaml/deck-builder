import { FC } from 'react'
import styles from './card.module.css'

interface CardTypes {
  title?: string
  description?: string
  flavorText?: string
}

export const Card: FC<CardTypes> = ({
  title,
  description,
  flavorText,
}) => {
  return (
    <div className={styles.card}>
      <div>
        {title}
      </div>

      <div>
        {description}
      </div>

      <div>
        {flavorText}
      </div>
    </div>
  );
}
