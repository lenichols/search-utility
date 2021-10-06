import React, { createContext, useEffect, useState, useReducer } from 'react';
import logo from './assets/images/net-logo.png';
import SearchPanel from './components/SearchPanel/SearchPanel';
import './App.scss';
import TweetBox from './components/TweetBox/TweetBox';
import { DESCRIPTION_TEXT, TWEET_STREAM_URL } from './variables/variables';

export const TweetStreamContext = createContext<any>({});

interface ITweets {
  tweet: string;
  user: string;
  retweet_count: string;
  created_at: number;
  verified: boolean;
  lang: string;
}

interface IFilter {
  value: string;
  add: boolean; 
  type: string;
}
 
export const tweetContextDefaultValue = {
    tweet: '',
    user: '',
    retweet_count: '',
    created_at: 0,
    verified: false,
    lang: ''
}
 
function App() {
  const [tweetsFound, setTweetsFound] = useState<ITweets[] | any>();
  // create new array to pass to Provider Customer/Child 
  let newArr: ITweets[] = [];
  const [newData, setNewData] = useState([]);
  let count = 0; 

  useEffect(() => {
    // on initial load, call the exteernal stream but limit
    // the return data for the sake of this excercise
    callExternalStream();
  }, [])

  const callExternalStream = () => {
    // Get stream from external
    let eventSource = new EventSource(TWEET_STREAM_URL);
    eventSource.addEventListener('message', (tweet) => {
    newArr.push(JSON.parse(tweet.data));
    // increment count to control bubbling payloas
    count++; 
    // limit return data to 100 result items
    if(count >= 100) {
        setNewData(newArr);
        eventSource.close();
      }
    })
    // after 100 results are reached, close the eventsource sttream
    // to prevent memory leaks
    eventSource.addEventListener('close', () => eventSource.close());
    return (() => eventSource.close());
  }

  const performSearchFilterRReducer = (filters: any, state: any[]) => {
    // using reacts internal reeducer, listeen for submit button to update state
    // from the search panel component and display search results
    if(state.length === 0) {
      callExternalStream();
    }
    // map thru the input items to filter the tweet results
    state.map((param: any, index: number) => {
      const textparam = param.value;
      if(param.type === 'Contains') {
        var queryContains = newData.filter(el => el.tweet.includes(textparam));
        setNewData(queryContains)
      }

      if(param.type === 'equals') {
        let queryEquals = newData.filter((el => el.tweet.toLowerCase() === textparam.toLowerCase()));
        setNewData(queryEquals)
      }

      if(param.type === 'Regex') {
        let queryRegex = newData.filter((el => el.tweet.toLowerCase().includes(textparam.toLowerCase())
        ))       
        setNewData(queryRegex);
      }
    })
    // return the filtered data in the state
    return [...state, filters]
  }

  const [filter, setFilter] = useReducer(performSearchFilterRReducer, []);

  return (
    <div className='App'>
      <TweetStreamContext.Provider value={{ tweets: [newData, setNewData], criteria: [filter, setFilter]}} >
        <header className="App-header">
          <img src={logo} className='Nts-logo' alt='logo' />
          <h2 className='Description-text'>{ DESCRIPTION_TEXT }</h2>
        </header>
        <div className='Nts-container'>
          <SearchPanel />
          <TweetBox />
        </div>
      </TweetStreamContext.Provider>
    </div>
  );
}

export default App;
