// reference - https://www.cssscript.com/star-rating-radio/

import React, { useState } from 'react'
import classes from './Rating.module.css'

interface Props {
  handleRating: (rating: number) => void
}

const Rating = (props: Props) => {
  const { handleRating } = props
  const [rating, setRating] = useState<number>()
  const [error, setError] = useState<boolean>(false)

  const handleSetRating = (e: any) => {
    setRating(e.target.value)
  }

  const handleAddRating = () => {
    setError(false)
    if (rating) {
      handleRating(+rating)
    } else {
      setError(true)
    }
  }

  return (
    <fieldset className={classes.rating}>
      <legend className={classes.ratingTitle}>Your rating:</legend>
      <div className={classes.ratingStars} onChange={handleSetRating}>
        <input className={classes.ratingInput} data-testid="star-rating" type="radio" name="rating" value="1" id="rating-1" />
        <label className={classes.ratingLabel} htmlFor="rating-1" aria-label="One"></label>
        <input className={classes.ratingInput} data-testid="star-rating" type="radio" name="rating" value="2" id="rating-2" />
        <label className={classes.ratingLabel} htmlFor="rating-2" aria-label="Two"></label>
        <input className={classes.ratingInput} data-testid="star-rating" type="radio" name="rating" value="3" id="rating-3" />
        <label className={classes.ratingLabel} htmlFor="rating-3" aria-label="Three"></label>
        <input className={classes.ratingInput} data-testid="star-rating" type="radio" name="rating" value="4" id="rating-4" />
        <label className={classes.ratingLabel} htmlFor="rating-4" aria-label="Four"></label>
        <input className={classes.ratingInput} data-testid="star-rating" type="radio" name="rating" value="5" id="rating-5" />
        <label className={classes.ratingLabel} htmlFor="rating-5" aria-label="Five"></label>
        <div className={classes.ratingFocus}></div>
      </div>
      <button onClick={handleAddRating}>Add rating</button>
      {error && <p>Please choose a rating!</p>}
    </fieldset>
  )
}

export default Rating
