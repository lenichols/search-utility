import React, { useContext, useEffect, useState } from 'react';
import './Tweet.scss';
import { TweetStreamContext } from '../../../App';


const Tweet = () => {

  const { tweets } = useContext(TweetStreamContext);
  const [tweetData, setTweetData] = tweets;
  const checkmark = '\u2714';  
  
  const tweetInnerBody = tweetData.map((tweetItem: any, indx: number) => {
    return (
        <div className='tweet--item' key={indx} >
          <div className="Tweet--tweet">
            {tweetItem.tweet}
          </div>
          <div className="Tweet--user">
            {tweetItem.user} &nbsp;&nbsp;<span>{tweetItem.verified === true ? checkmark : '' }</span>
          </div>
          <div className="Tweet--retweet">
            Retweeted: {tweetItem.retweet_count} times
          </div>
        </div>
    )
  })

  return (
    <>
      {tweetInnerBody ? tweetInnerBody : 'No Tweets to display!'}
    </>
  )
}

export default Tweet
