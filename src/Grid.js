import React, { Component } from 'react'
import './Grid.css'

class Grid extends Component {
  render () {
    let items = Array.from(Array(64).keys())
    return (
      <div className='Grid-container'>
        {items.map(index => {
          return (
            <div className='Grid-tile'>
              <div className='Grid-imageContainer'>
                <div className='Grid-image' />
              </div>
              <div>
                Token 1
              </div>
            </div>
          )
        })}
      </div>
    )
  }
}

export default Grid
