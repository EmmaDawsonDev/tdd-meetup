import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { IMeetup } from '../../models/meetup'
import { getMeetupById, updateMeetupAttendeeList } from '../../data/meetups'
import { RootState } from '../../store/store'
import { useSelector } from 'react-redux'

import classes from './MeetupDetail.module.css'
import UserCard from '../../components/UserCard/UserCard'

const MeetupDetail = () => {
  const user = useSelector((state: RootState) => state.user.user)

  const [meetup, setMeetup] = useState<IMeetup>()
  const [error, setError] = useState<boolean>(false)
  const [isCurrent, setIsCurrent] = useState<boolean>(false)

  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const meetup = getMeetupById(+id!)

    meetup ? setMeetup(meetup) : setError(true)
    const currentDateTime = new Date()
    if (meetup) {
      const currentOrPast = meetup.startDate.getTime() - currentDateTime.getTime()

      currentOrPast > 0 ? setIsCurrent(true) : setIsCurrent(false)
    }
  }, [id])

  const msToTime = (start: number, end: number) => {
    let s = end - start

    let hrs = s / (3.6 * 10 ** 6)
    let time = ''
    hrs < 1 ? (time = `${hrs * 60} minutes`) : hrs === 1 ? (time = `${hrs} hour`) : (time = `${hrs} hours`)
    return time
  }

  const maxAttendees = meetup?.attendeeLimit || Infinity

  const handleLogin = () => {
    navigate('/login')
  }

  const handleAddAttendee = () => {
    const newMeetup = updateMeetupAttendeeList(+id!, user!.name)

    newMeetup ? setMeetup({ ...newMeetup }) : setError(true)
  }

  return (
    <main>
      {meetup && (
        <div>
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
                {meetup.endDate.toDateString()}{' '}
                {meetup.endDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
              </p>
              <p>
                <strong>Duration: </strong>
                {msToTime(+meetup.startDate, +meetup.endDate)}
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
              {user && meetup.attendees.length < maxAttendees && isCurrent && <button onClick={handleAddAttendee}>Attend</button>}
              {!user && meetup.attendees.length < maxAttendees && isCurrent && <button onClick={handleLogin}>Log in to attend</button>}
              {meetup.attendees.length >= maxAttendees && isCurrent && <p>Meetup is fully booked</p>}
              {!isCurrent && <p>Meetup is over</p>}
            </section>
          </div>
          <section className={classes.attendeesSection}>
            <h2>Attendees ({meetup.attendees.length})</h2>
            <div>
              {meetup.attendees.map((attendee, index) => (
                <UserCard username={attendee} key={index} />
              ))}
            </div>
          </section>
        </div>
      )}
      {!meetup && error && <h2>Something went wrong.</h2>}
    </main>
  )
}

export default MeetupDetail
