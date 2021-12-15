import React, { useEffect } from 'react'

import { RootState } from '../../store/store'
import { useSelector, useDispatch } from 'react-redux'
import { getCurrentMeetups } from '../../store/meetupsSlice'
import { getAllCurrentMeetups } from '../../data/meetups'

import Card from '../../components/Card/Card'

const Home = () => {
  const currentMeetups = useSelector((state: RootState) => state.meetups.currentMeetups)
  const dispatch = useDispatch()

  useEffect(() => {
    const currentMeetups = getAllCurrentMeetups(new Date())
    dispatch(getCurrentMeetups(currentMeetups))
  }, [dispatch])

  return (
    <main>
      <section>
        <h2>Current meetups</h2>
        <ul>
          {currentMeetups.map(meetup => (
            <Card meetup={meetup} testId={'currentListItem'} key={meetup.id} />
          ))}
        </ul>
      </section>
    </main>
  )
}

export default Home
