import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IMeetup } from '../models/meetup'

export interface MeetupState {
  meetups: IMeetup[]
}

const initialState: MeetupState = {
  meetups: [],
}

export const meetupSlice = createSlice({
  name: 'meetup',
  initialState,
  reducers: {
    getMeetups: (state, action: PayloadAction<IMeetup[]>) => {
      state.meetups = [...action.payload]
    },
  },
})

// Action creators are generated for each case reducer function
export const { getMeetups } = meetupSlice.actions

export default meetupSlice.reducer
