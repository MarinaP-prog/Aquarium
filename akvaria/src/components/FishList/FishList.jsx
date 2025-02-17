import React from 'react'
import './FishList.css'
function FishList({data, onDelete}) {
  return (
    <div className='list'>
        {data.map((fish)=>{
            return (
                <div className="item" key={fish.id}>
                    <span>
                        {fish.name} / {fish.species}
                    </span>
                    <button className='btn-delete' onClick={() => onDelete(fish.id)}>X</button>
                </div>
            )
        })}
      
    </div>
  )
}

export default FishList
