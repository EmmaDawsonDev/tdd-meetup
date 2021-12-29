import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IMeetup } from '../models/meetup'

export interface MeetupState {
  currentMeetups: IMeetup[]
  pastMeetups: IMeetup[]
}

const initialState: MeetupState = {
  currentMeetups: [],
  pastMeetups: [],
}

export const meetupSlice = createSlice({
  name: 'meetup',
  initialState,
  reducers: {
    getCurrentMeetups: (state, action: PayloadAction<IMeetup[]>) => {
      state.currentMeetups = [...action.payload]
    },
    getPastMeetups: (state, action: PayloadAction<IMeetup[]>) => {
      state.pastMeetups = [...action.payload]
    },
    reset: () => {
      return initialState
    },
  },
})

// Action creators are generated for each case reducer function
export const { getCurrentMeetups, getPastMeetups, reset } = meetupSlice.actions

export default meetupSlice.reducer
