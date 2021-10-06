import React, { useContext, useState } from 'react'
import TweetBox from '../TweetBox/TweetBox';
import './SearchPanel.scss';
import { CONDIITION_OPTIONS_ENUM, TERM_WORD_TEXT } from '../../variables/variables'
import { TweetStreamContext } from '../../App';

const SearchPanel = () => {
  const [term, setTerm] = useState('');
  const [equals, setEquals] = useState('');
  const [contains, setContains] = useState('');
  const [reg, setReg] = useState('');
  const [currentIndex, setCurrentIndex] = useState(2);
  const [fields, setFields] = useState([{ value: '', add: null, type: '' }]);
  const { criteria } = useContext(TweetStreamContext);
  const [ criteriaData , setCriteriaData] = criteria;


  const addCondition = () => {
    // set the current index in order to switch add/delete button
    setFields([
          ...fields,
          {
            value: '',
            add: false,
            type: 'equals'
          }
        ]);
  }

  // remove a condition text box
  const removeCondition = (idx: any) => {
    if(fields.length > 1) {
      const values = [...fields];
      values.splice(idx, 1);
      setFields(values);
    }
  }

  // detect when text is entered into the input element
  const detectInputChange = (i: number, event: any) => {
    const values = [...fields];
    values[i].value = event.target.value;

    // if no ttext is in the unput element or backspace happens
    // emit an event to reacts reducer
    if(values[i].value.length === 0) {
      setCriteriaData([])
    }

    // if no criteria is set, assume criteria is equals
    if(values[i].type === '') {
      values[i].type = 'equals';
    }
    setFields(values);
  }

  // detect the select dropdown input change
  const detectSelectChange = (i: number, event: any) => {
    const values = [...fields];
    values[i].type = event.target.value;
    setFields(values);
  }

  // send search criteria via reducer back up to parent
  const sendQueryToFilter = (event: any) => {
    event.preventDefault();
    // alert('A term was entered: ' + JSON.stringify(fields));
    alert('Time to search some tweets! Let\'s go!');
    setCriteriaData(fields);
  }

  // set the select dropdown options
  const setConditions = Object.values(CONDIITION_OPTIONS_ENUM).map((condition, index) => {
    return <option key={index}>{condition}</option>
  });

  return (
    <div>
      <form onSubmit={sendQueryToFilter}>
        <label>{ TERM_WORD_TEXT }
        {fields.map((field, idx) => {
          return (
            <div key={`${field}-${idx}`}>
              <div className='SearchOptions-toggle'>
                <select className='SearchSelect-option' onChange={e => detectSelectChange(idx, e)} >
                  { setConditions }
                </select>
              </div>
              <input type='text' value={ field.value }  placeholder="Enter search text"
              onChange={e => detectInputChange(idx, e)} />
              <div className='RemoveCondition-button'>
                  <span className="Ex--sign" onClick={() => removeCondition(idx)} > x </span> 
              </div>
            </div>
          )
          })}
        </label>
        <hr />
        <div id="container">
          <button type='submit' id='Query-button' >Run Query</button>
          <button type="button" className='AddCondition-button' onClick={() => addCondition()}>
          +
          </button>
        </div>
      </form>  
    </div>
  )
}

export default SearchPanel
