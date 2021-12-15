import React from 'react'
import { IMeetup } from '../../models/meetup'
import classes from './Card.module.css'

interface Props {
  meetup: IMeetup
  testId: string
}

const Card = (props: Props) => {
  const { meetup, testId } = props
  return (
    <div role="listitem" data-testid={testId} className={classes.cardWrapper}>
      <h3>{meetup.title}</h3>
      <p>
        <strong>Start: </strong>
        {meetup.startDate.toDateString()} {meetup.startDate.toLocaleTimeString()}
      </p>
      <p></p>
      <p>
        <strong>End: </strong>
        {meetup.endDate.toDateString()} {meetup.endDate.toLocaleTimeString()}
      </p>
      <p>
        <strong>Location: </strong>
        {meetup.location}
      </p>
      {/* <Link data-testid={product.name} to={`/product/${product.id}`}>
        Go to product
      </Link> */}
    </div>
  )
}

export default Card
