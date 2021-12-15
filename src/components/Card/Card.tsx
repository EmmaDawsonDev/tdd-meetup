import React from 'react'
import { IMeetup } from '../../models/meetup'

interface Props {
  meetup: IMeetup
  testId: string
}

const Card = (props: Props) => {
  const { meetup, testId } = props
  return (
    <article>
      <div role="listitem" data-testid={testId}>
        <h3>{meetup.title}</h3>
        <p>{meetup.startDate.toDateString()}</p>
        <p>{meetup.endDate.toDateString()}</p>
        <p>{meetup.location}</p>
        {/* <Link data-testid={product.name} to={`/product/${product.id}`}>
        Go to product
      </Link> */}
      </div>
    </article>
  )
}

export default Card
