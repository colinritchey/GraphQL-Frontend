import React from 'react';

export const Rating = ({ rating }) => {

  this.getClassRating = (value) => {
    if(rating - value === 0.5){
      return 'half'

    } else if(value < rating ){
      return 'full'

    } else {
      return 'empty'
    }
  }

  return (
    <ol className='rating'>
      {(new Array(5)).fill('').map((_, idx) => {
        return <li
          key={`rating-id-${idx}`}
          className={this.getClassRating(idx+1)}></li>
      })}
    </ol>
  )
}
