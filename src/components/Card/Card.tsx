import { IMeetup } from '../../models/meetup'
import classes from './Card.module.css'
import { Link } from 'react-router-dom'

interface Props {
  meetup: IMeetup
  testId: string
  past?: boolean
}

const Card = (props: Props) => {
  const { meetup, testId, past } = props
  return (
    <Link to={`/meetups/${meetup.id}`} className={classes.cardLink}>
      <div role="listitem" data-testid={testId} className={past ? classes.cardWrapperPast : classes.cardWrapperCurrent}>
        <h3>
          {meetup.title} {past && <span> - PAST</span>}
        </h3>

        <p>
          <strong>Start: </strong>
          {meetup.startDate.toDateString()} {meetup.startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
        </p>
        <p></p>
        <p>
          <strong>End: </strong>
          {meetup.endDate.toDateString()} {meetup.endDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
        </p>
        <p>
          <strong>Location: </strong>
          {meetup.location}
        </p>
      </div>
    </Link>
  )
}

export default Card
