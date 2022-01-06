import React from 'react'
import { RootState } from '../../store/store'
import { useSelector } from 'react-redux'

const Profile = () => {
  const user = useSelector((state: RootState) => state.user.user)
  return <main>Profile page</main>
}

export default Profile
