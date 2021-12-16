import React, { useEffect } from 'react'

import { RootState } from '../../store/store'
import { useSelector, useDispatch } from 'react-redux'
import { getCurrentMeetups } from '../../store/meetupsSlice'
import { getAllCurrentMeetups } from '../../data/meetups'

import Card from '../../components/Card/Card'

import classes from './Home.module.css'

const Home = () => {
  const currentMeetups = useSelector((state: RootState) => state.meetups.currentMeetups)
  const dispatch = useDispatch()

  useEffect(() => {
    const currentMeetups = getAllCurrentMeetups(new Date())
    dispatch(getCurrentMeetups(currentMeetups))
  }, [dispatch])

  const sortedCurrentMeetups = currentMeetups.slice().sort((a, b) => +a.startDate - +b.startDate)

  return (
    <main>
      <section>
        <h2>Current meetups</h2>
        {sortedCurrentMeetups.length > 0 ? (
          <ul className={classes.cardContainer}>
            {sortedCurrentMeetups.map(meetup => (
              <Card meetup={meetup} testId={'currentListItem'} key={meetup.id} />
            ))}
          </ul>
        ) : (
          <p>No meetups found</p>
        )}
      </section>
    </main>
  )
}

export default Home
