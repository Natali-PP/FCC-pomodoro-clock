import React from 'react';
const Break = (props) => {
    return (
      <div>
        <h2 id="break-label">Break Length</h2>
        <div className="align-row">
          <button 
            id="break-decrement" 
            onClick={props.decrementBreak}>
            ↓
          </button>

          <p 
            id="break-length">
            {props.breakLength}
          </p>

          <button 
            id="break-increment" 
            onClick={props.incrementBreak}>
            ↑
          </button>
        </div>
      </div>
    )
  }

export default Break;