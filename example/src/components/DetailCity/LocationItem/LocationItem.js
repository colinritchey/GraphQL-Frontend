import React from 'react';

export const LocationItem = ({ location, selectMarker }) => {
  return(
    <div className='list-spot-container'>
      <div className='city-list-spot'>
        <img alt='' src={location.image}/>
        <div>{location.name}</div>
        <div>rating</div>
      </div>
    </div>
  )
}
