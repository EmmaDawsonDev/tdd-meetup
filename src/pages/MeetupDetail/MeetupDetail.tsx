import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { IMeetup } from '../../models/meetup'
import { getMeetupById } from '../../data/meetups'

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
        <div>
          <h2 data-testid="meetup-detail-page">{meetup.title}</h2>
          <p>
            <strong>Start: </strong>
            {meetup.startDate.toString()}
          </p>
          <p>
            <strong>End: </strong>
            {meetup.endDate.toString()}
          </p>
          <p>
            <strong>Location: </strong>
            {meetup.location}
          </p>
          <p>
            <strong>Host: </strong>
            {meetup.hostName}
          </p>
          <p>
            <strong>Description: </strong>
            {meetup.description}
          </p>
          <p>
            <strong>Price: </strong>
            {meetup.price ? `${meetup.price} SEK` : 'FREE'}
          </p>
        </div>
      )}
      {!meetup && error && <h2>Something went wrong.</h2>}
    </main>
  )
}

export default MeetupDetail
