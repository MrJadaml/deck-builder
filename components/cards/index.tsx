import { FC } from 'react'

interface CardsTypes {
  cards?: Array<any>
}

export const Cards: FC<CardsTypes> = ({
  cards,
}) => {
  return (
    <div>
      cards....
    </div>
  );
}
