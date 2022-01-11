import { useState, useEffect } from 'react'
import { RootState } from '../../store/store'
import { useSelector } from 'react-redux'
import { IMeetup } from '../../models/meetup'
import Card from '../../components/Card/Card'
import classes from './Profile.module.css'

const Profile = () => {
  const user = useSelector((state: RootState) => state.user.user)
  const currentMeetups = useSelector((state: RootState) => state.meetups.currentMeetups)
  const pastMeetups = useSelector((state: RootState) => state.meetups.pastMeetups)

  const [attendingMeetups, setAttendingMeetups] = useState<IMeetup[]>([])
  const [attendedMeetups, setAttendedMeetups] = useState<IMeetup[]>([])
  const [hostingMeetups, setHostingMeetups] = useState<IMeetup[]>([])
  const [hostedMeetups, setHostedMeetups] = useState<IMeetup[]>([])

  useEffect(() => {
    const filteredCurrentMeetups = currentMeetups.filter(meetup => user?.attending.includes(meetup.id))
    const sortedCurrentMeetups = filteredCurrentMeetups.slice().sort((a, b) => +a.startDate - +b.startDate)
    setAttendingMeetups(sortedCurrentMeetups)
  }, [user, currentMeetups])

  useEffect(() => {
    const filteredPastMeetups = pastMeetups.filter(meetup => user?.attending.includes(meetup.id))
    const sortedPastMeetups = filteredPastMeetups.slice().sort((a, b) => +b.startDate - +a.startDate)
    setAttendedMeetups(sortedPastMeetups)
  }, [user, pastMeetups])

  useEffect(() => {
    const filteredHostingMeetups = currentMeetups.filter(meetup => user?.meetupOwner.includes(meetup.id))
    const sortedHostingMeetups = filteredHostingMeetups.slice().sort((a, b) => +a.startDate - +b.startDate)
    setHostingMeetups(sortedHostingMeetups)
  }, [user, currentMeetups])

  useEffect(() => {
    const filteredHostedMeetups = pastMeetups.filter(meetup => user?.meetupOwner.includes(meetup.id))
    const sortedHostedMeetups = filteredHostedMeetups.slice().sort((a, b) => +b.startDate - +a.startDate)
    setHostedMeetups(sortedHostedMeetups)
  }, [user, pastMeetups])

  return (
    <main>
      <section className={classes.meetupListContainer}>
        <h2>Attending</h2>
        {attendingMeetups.length > 0 &&
          attendingMeetups.map(meetup => <Card meetup={meetup} testId="currentProfileListItem" key={meetup.id} />)}
        {attendingMeetups.length === 0 && <p className={classes.message}>No current meetups</p>}
      </section>
      <section className={classes.meetupListContainer}>
        <h2>Attended</h2>
        {attendedMeetups.length > 0 &&
          attendedMeetups.map(meetup => <Card meetup={meetup} testId="pastProfileListItem" past key={meetup.id} />)}
        {attendedMeetups.length === 0 && <p className={classes.message}>No past meetups</p>}
      </section>

      <section className={classes.meetupListContainer}>
        <h2>Hosting</h2>
        {hostingMeetups.length > 0 &&
          hostingMeetups.map(meetup => <Card meetup={meetup} testId="hostingProfileListItem" key={meetup.id} />)}
        {hostingMeetups.length === 0 && <p className={classes.message}>You are not hosting any meetups yet</p>}
      </section>
      <section className={classes.meetupListContainer}>
        <h2>Hosted</h2>
        {hostedMeetups.length > 0 &&
          hostedMeetups.map(meetup => <Card meetup={meetup} testId="hostedProfileListItem" past key={meetup.id} />)}
        {hostedMeetups.length === 0 && <p className={classes.message}>You have not hosted any meetups yet</p>}
      </section>
    </main>
  )
}

export default Profile
