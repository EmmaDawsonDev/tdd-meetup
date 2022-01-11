import classes from './UserCard.module.css'
interface Props {
  username: string
}

const UserCard = (props: Props) => {
  const { username } = props
  return (
    <div data-testid="userCard" className={classes.userCard}>
      <img src="/profile.png" alt="" />
      <p>{username}</p>
    </div>
  )
}

export default UserCard
