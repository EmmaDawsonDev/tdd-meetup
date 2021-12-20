import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { IMeetup } from '../../models/meetup'
import { getMeetupById } from '../../data/meetups'

import classes from './MeetupDetail.module.css'

const MeetupDetail = () => {
  const [meetup, setMeetup] = useState<IMeetup>()
  const [error, setError] = useState<boolean>(false)
  const { id } = useParams()

  useEffect(() => {
    const meetup = getMeetupById(+id!)

    meetup ? setMeetup(meetup) : setError(true)
  }, [id])

  return (
    <main>
      {meetup && (
        <div className={classes.flexContainer}>
          <section className={classes.column1}>
            <h2 data-testid="meetup-detail-page">{meetup.title}</h2>
            <div className={classes.hostContainer}>
              <img src="/profile.png" alt="" />
              <p>
                <strong>Host: </strong>
                {meetup.hostName}
              </p>
            </div>

            <p>
              <strong>Description: </strong>
              {meetup.description}
            </p>
          </section>
          <section className={classes.column2}>
            <p>
              <strong>Start: </strong>
              {meetup.startDate.toDateString()}{' '}
              {meetup.startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
            </p>
            <p>
              <strong>End: </strong>
              {meetup.endDate.toDateString()} {meetup.endDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
            </p>
            <p>
              <strong>Location: </strong>
              {meetup.location}
            </p>
            <p>
              <strong>Price: </strong>
              {meetup.price ? `${meetup.price} SEK` : 'FREE'}
            </p>
            <p>
              <strong>Placed left: </strong>
              {meetup.attendeeLimit ? meetup.attendeeLimit - meetup.attendees.length : 'UNLIMITED PLACES'}
            </p>
          </section>
        </div>
      )}
      {!meetup && error && <h2>Something went wrong.</h2>}
    </main>
  )
}

export default MeetupDetail
