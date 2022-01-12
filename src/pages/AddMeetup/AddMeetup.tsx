import React, { useState } from 'react'
import { RootState } from '../../store/store'
import { useSelector, useDispatch } from 'react-redux'
import { getCurrentMeetups } from '../../store/meetupsSlice'
import { IMeetupBase } from '../../models/meetup'
import { addMeetup } from '../../data/meetups'
import { useNavigate } from 'react-router'

import classes from './AddMeetup.module.css'

const AddMeetup = () => {
  const user = useSelector((state: RootState) => state.user.user)

  const [title, setTitle] = useState<string>('')
  const [startDate, setStartDate] = useState<string>('')
  const [startTime, setStartTime] = useState<string>('')
  const [endDate, setEndDate] = useState<string>('')
  const [endTime, setEndTime] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [location, setLocation] = useState<string>('')
  const [price, setPrice] = useState<string>('')
  const [attendeeLimit, setAttendeeLimit] = useState<string>('')
  const [startDateError, setStartDateError] = useState<boolean>(false)
  const [endDateError, setEndDateError] = useState<boolean>(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleAddMeetup = (e: React.FormEvent) => {
    e.preventDefault()
    setStartDateError(false)
    setEndDateError(false)
    const meetup: IMeetupBase = {
      hostName: user!.name,
      title,
      startDate: new Date(`${startDate}T${startTime}`),
      endDate: new Date(`${endDate}T${endTime}`),
      description,
      location,
    }
    if (price) {
      meetup.price = +price
    }
    if (attendeeLimit) {
      meetup.attendeeLimit = +attendeeLimit
    }

    if (meetup.startDate.getTime() > meetup.endDate.getTime()) {
      setEndDateError(true)
      return
    }

    if (meetup.startDate.getTime() < Date.now()) {
      setStartDateError(true)
      return
    }

    let response = addMeetup(meetup)
    if (response) {
      dispatch(getCurrentMeetups)
      navigate('/')
    }
    
  }

  return (
    <main>
      <h2>Add Meetup</h2>
      <form className={classes.meetupForm} onSubmit={handleAddMeetup}>
        <div className={classes.meetupItem}>
          <label htmlFor="title">
            Title <span className={classes.required}>*</span>
          </label>
          <input type="text" id="title" name="title" required value={title} onChange={e => setTitle(e.target.value)} />
        </div>
        <div className={classes.meetupItem}>
          <label htmlFor="startDate">
            Start Date <span className={classes.required}>*</span>
          </label>
          <input type="date" id="startDate" name="startDate" required value={startDate} onChange={e => setStartDate(e.target.value)} />
          {startDateError && <p className={classes.error}>Please choose a future date</p>}
        </div>
        <div className={classes.meetupItem}>
          <label htmlFor="startTime">
            Start Time <span className={classes.required}>*</span>
          </label>
          <input type="time" id="startTime" name="startTime" required value={startTime} onChange={e => setStartTime(e.target.value)} />
        </div>
        <div className={classes.meetupItem}>
          <label htmlFor="endDate">
            End Date <span className={classes.required}>*</span>
          </label>
          <input type="date" id="endDate" name="endDate" required value={endDate} onChange={e => setEndDate(e.target.value)} />
          {endDateError && <p className={classes.error}>Meetup must end after start date and time</p>}
        </div>
        <div className={classes.meetupItem}>
          <label htmlFor="endTime">
            End Time <span className={classes.required}>*</span>
          </label>
          <input type="time" id="endTime" name="endTime" required value={endTime} onChange={e => setEndTime(e.target.value)} />
        </div>
        <div className={classes.meetupItem}>
          <label htmlFor="description">
            Description <span className={classes.required}>*</span>
          </label>
          <textarea id="description" name="description" required value={description} onChange={e => setDescription(e.target.value)} />
        </div>
        <div className={classes.meetupItem}>
          <label htmlFor="location">
            Location <span className={classes.required}>*</span>
          </label>
          <input type="text" id="location" name="location" required value={location} onChange={e => setLocation(e.target.value)} />
        </div>
        <div className={classes.meetupItem}>
          <label htmlFor="price">Price SEK (leave blank if meetup is free to attend)</label>
          <input type="number" id="price" name="price" value={price} onChange={e => setPrice(e.target.value)} />
        </div>
        <div className={classes.meetupItem}>
          <label htmlFor="attendeeLimit">Attendee Limit (leave blank if there is no limit)</label>
          <input
            type="number"
            id="attendeeLimit"
            name="attendeeLimit"
            value={attendeeLimit}
            onChange={e => setAttendeeLimit(e.target.value)}
          />
        </div>
        <button>Add meetup</button>
      </form>
    </main>
  )
}

export default AddMeetup
