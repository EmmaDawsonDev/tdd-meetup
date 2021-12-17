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

  return <main>{meetup && <h2>{meetup.title}</h2>}</main>
}

export default MeetupDetail
