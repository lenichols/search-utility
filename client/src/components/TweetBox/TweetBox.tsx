import React, { useContext, useEffect, useState } from 'react';
import Tweet from './Tweet/Tweet';
import './TweetBox.scss';
import { TweetStreamContext } from '../../App'


const TweetBox = () => {

  // consume tweetss using reacts context api
  const { tweets } = useContext(TweetStreamContext);
  const [tweetDataLength] = tweets;

  return (
    <div className='tweet-result-container'>
      <div className='Results-text'>{ tweetDataLength.length } total results.</div>
      <br />
      <Tweet />
    </div>
  )
}

export default TweetBox
