import React, { useState, useEffect } from 'react'

import { RootState } from '../../store/store'
import { useSelector, useDispatch } from 'react-redux'
import { getCurrentMeetups } from '../../store/meetupsSlice'
import { getAllCurrentMeetups } from '../../data/meetups'

import Card from '../../components/Card/Card'

import classes from './Home.module.css'
import { IMeetup } from '../../models/meetup'

const Home = () => {
  const currentMeetups = useSelector((state: RootState) => state.meetups.currentMeetups)

  const [searchPhrase, setSearchPhrase] = useState('')
  const [filteredCurrentMeetups, setFilteredCurrentMeetups] = useState<IMeetup[]>([])

  const dispatch = useDispatch()

  useEffect(() => {
    const currentMeetups = getAllCurrentMeetups(new Date())
    dispatch(getCurrentMeetups(currentMeetups))
  }, [dispatch])

  useEffect(() => {
    const sortedCurrentMeetups = currentMeetups.slice().sort((a, b) => +a.startDate - +b.startDate)
    setFilteredCurrentMeetups(sortedCurrentMeetups.filter(meetup => meetup.title.toLowerCase().includes(searchPhrase.toLowerCase())))
  }, [currentMeetups, searchPhrase])

  const handleSearch = (e: React.FormEvent<HTMLInputElement>) => {
    const phrase = e.currentTarget.value
    setSearchPhrase(phrase)
  }

  return (
    <main>
      <section>
        <label htmlFor="search">Search: </label>
        <input type="search" placeholder="Search" name="search" id="search" onChange={handleSearch} value={searchPhrase} />
      </section>
      <section>
        <h2>Current meetups</h2>
        {filteredCurrentMeetups.length > 0 ? (
          <ul className={classes.cardContainer}>
            {filteredCurrentMeetups.map(meetup => (
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
