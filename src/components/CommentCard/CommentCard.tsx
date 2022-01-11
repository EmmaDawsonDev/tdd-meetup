import { IComment } from '../../models/comment'

import classes from './CommentCard.module.css'

interface Props {
  comment: IComment
}

const CommentCard = (props: Props) => {
  const { comment } = props
  return (
    <div data-testid="commentListItem" className={classes.commentContainer}>
      <div className={classes.flexContainer}>
        <img src="/profile.png" alt="" className={classes.commentProfileImg} />
        <strong>
          <p data-testid="commenters-name">{comment.name}</p>
        </strong>
        <p>{comment.date.toLocaleDateString()}</p>
        <p>{comment.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}</p>
      </div>
      <p>{comment.content}</p>
    </div>
  )
}

export default CommentCard
