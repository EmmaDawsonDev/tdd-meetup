import React from 'react'
import classes from './AddMeetup.module.css'

const AddMeetup = () => {
  return (
    <main>
      <h1>Add Meetup</h1>
      <form className={classes.meetupForm}>
        <div className={classes.meetupItem}>
          <label htmlFor="title">
            Title <span className={classes.required}>*</span>
          </label>
          <input type="text" id="title" name="title" required />
        </div>
        <div className={classes.meetupItem}>
          <label htmlFor="startDate">
            Start Date <span className={classes.required}>*</span>
          </label>
          <input type="date" id="startDate" name="startDate" required />
        </div>
        <div className={classes.meetupItem}>
          <label htmlFor="startTime">
            Start Time <span className={classes.required}>*</span>
          </label>
          <input type="time" id="startTime" name="startTime" required />
        </div>
        <div className={classes.meetupItem}>
          <label htmlFor="endDate">
            End Date <span className={classes.required}>*</span>
          </label>
          <input type="date" id="endDate" name="endDate" required />
        </div>
        <div className={classes.meetupItem}>
          <label htmlFor="endTime">
            End Time <span className={classes.required}>*</span>
          </label>
          <input type="time" id="endTime" name="endTime" required />
        </div>
        <div className={classes.meetupItem}>
          <label htmlFor="description">
            Description <span className={classes.required}>*</span>
          </label>
          <textarea id="description" name="description" required />
        </div>
        <div className={classes.meetupItem}>
          <label htmlFor="location">
            Location <span className={classes.required}>*</span>
          </label>
          <input type="text" id="location" name="location" required />
        </div>
        <div className={classes.meetupItem}>
          <label htmlFor="price">Price (leave blank if meetup is free to attend)</label>
          <input type="number" id="price" name="price" />
        </div>
        <div className={classes.meetupItem}>
          <label htmlFor="attendeeLimit">Attendee Limit (leave blank if there is no limit)</label>
          <input type="number" id="attendeeLimit" name="attendeeLimit" />
        </div>
        <button>Add meetup</button>
      </form>
    </main>
  )
}

export default AddMeetup
