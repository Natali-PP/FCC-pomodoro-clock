import React from 'react';

const Session = (props) => {
    return (
      <div>
        <h2 id="session-label">Session Length</h2>
       
        <div className="align-row">
          <button 
            id="session-decrement" 
            onClick={props.decrementSession}>
            ↓
            </button>
          <p id="session-length">{props.sessionLength}</p>
          <button 
            id="session-increment" 
            onClick={props.incrementSession}>
            ↑
          </button>
        </div>
      </div>
    )
}
export default Session