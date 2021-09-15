import React, { Component } from 'react'
import './Grid.css'

class Grid extends Component {
  render () {
    let items = Array.from(Array(64).keys())
    return (
      <div className='Grid-container'>
        <div className='Grid-listItem Grid-header'>
          <span>Token</span>
          <span>List Price</span>
          <span>Last Sale Price</span>
          <span>Burn Price</span>
          <span>% change</span>
        </div>
        {items.map(index => {
          return (
            <div className='Grid-listItem'>
              <span>{index}</span>
              <span>1.2</span>
              <span>1.8</span>
              <span>.8</span>
              <span>⬆️ 62%</span>
            </div>
          )
        })}
      </div>
    )
  }
}

export default Grid
