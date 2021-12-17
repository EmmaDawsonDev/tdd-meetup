import React, { useState, useEffect } from 'react'

import { RootState } from '../../store/store'
import { useSelector, useDispatch } from 'react-redux'
import { getCurrentMeetups, getPastMeetups } from '../../store/meetupsSlice'
import { getAllCurrentMeetups, getAllPastMeetups } from '../../data/meetups'

import Card from '../../components/Card/Card'

import classes from './Home.module.css'
import { IMeetup } from '../../models/meetup'

const Home = () => {
  const currentMeetups = useSelector((state: RootState) => state.meetups.currentMeetups)
  const pastMeetups = useSelector((state: RootState) => state.meetups.pastMeetups)

  const [searchPhrase, setSearchPhrase] = useState('')
  const [filteredCurrentMeetups, setFilteredCurrentMeetups] = useState<IMeetup[]>([])
  const [filteredPastMeetups, setFilteredPastMeetups] = useState<IMeetup[]>([])
  const [dateFilter, setDateFilter] = useState<string>('')

  const dispatch = useDispatch()

  useEffect(() => {
    const currentMeetups = getAllCurrentMeetups(new Date())
    dispatch(getCurrentMeetups(currentMeetups))
    const pastMeetups = getAllPastMeetups(new Date())
    dispatch(getPastMeetups(pastMeetups))
  }, [dispatch])

  useEffect(() => {
    const sortedCurrentMeetups = currentMeetups.slice().sort((a, b) => +a.startDate - +b.startDate)
    const filterBySearch = sortedCurrentMeetups.filter(meetup => meetup.title.toLowerCase().includes(searchPhrase.trim().toLowerCase()))
    if (dateFilter) {
      const filterBySearchAndDate = filterBySearch.filter(meetup => meetup.startDate.toISOString().startsWith(dateFilter))
      setFilteredCurrentMeetups(filterBySearchAndDate)
    } else {
      setFilteredCurrentMeetups(filterBySearch)
    }
  }, [currentMeetups, searchPhrase, dateFilter])

  useEffect(() => {
    const sortedPastMeetups = pastMeetups.slice().sort((a, b) => +b.startDate - +a.startDate)
    const filterBySearch = sortedPastMeetups.filter(meetup => meetup.title.toLowerCase().includes(searchPhrase.trim().toLowerCase()))
    if (dateFilter) {
      const filterBySearchAndDate = filterBySearch.filter(meetup => meetup.startDate.toISOString().startsWith(dateFilter))
      setFilteredPastMeetups(filterBySearchAndDate)
    } else {
      setFilteredPastMeetups(filterBySearch)
    }
  }, [pastMeetups, searchPhrase, dateFilter])

  const handleSearch = (e: React.FormEvent<HTMLInputElement>) => {
    const phrase = e.currentTarget.value
    setSearchPhrase(phrase)
  }

  const handleDateFilter = (e: React.FormEvent<HTMLInputElement>) => {
    const date = e.currentTarget.value
    setDateFilter(date)
  }

  const clearSearch = () => {
    setSearchPhrase('')
  }

  const clearDateFilter = () => {
    setDateFilter('')
  }

  const clearAllFilters = () => {
    clearDateFilter()
    clearSearch()
  }

  return (
    <main>
      <section>
        <div>
          <div>
            <label htmlFor="search">Search: </label>
            <input type="search" placeholder="Search" name="search" id="search" onChange={handleSearch} value={searchPhrase} />
          </div>
          <div>
            <label htmlFor="date">Date: </label>
            <input type="date" name="date" id="date" value={dateFilter} onChange={handleDateFilter} />
          </div>
        </div>
        <div className={classes.filtersContainer}>
          {searchPhrase.trim() !== '' && (
            <button onClick={clearSearch}>
              {searchPhrase}
              <span className={classes.delete}> x </span>
            </button>
          )}
          {dateFilter && (
            <button onClick={clearDateFilter}>
              {dateFilter}
              <span className={classes.delete}> x </span>
            </button>
          )}
          {searchPhrase.trim() !== '' && dateFilter && (
            <button onClick={clearAllFilters}>
              Remove all
              <span className={classes.delete}> x </span>
            </button>
          )}
        </div>
      </section>
      <div className={classes.meetupsContainer}>
        <section className={classes.meetupList}>
          <h2>Current meetups</h2>
          {filteredCurrentMeetups.length > 0 ? (
            <ul className={classes.cardContainer}>
              {filteredCurrentMeetups.map(meetup => (
                <Card meetup={meetup} testId={'currentListItem'} key={meetup.id} />
              ))}
            </ul>
          ) : (
            <p>No current meetups found</p>
          )}
        </section>
        <section className={classes.meetupList}>
          <h2>Past meetups</h2>
          {filteredPastMeetups.length > 0 ? (
            <ul className={classes.cardContainer}>
              {filteredPastMeetups.map(meetup => (
                <Card meetup={meetup} testId={'pastListItem'} key={meetup.id} past />
              ))}
            </ul>
          ) : (
            <p>No past meetups found</p>
          )}
        </section>
      </div>
    </main>
  )
}

export default Home
