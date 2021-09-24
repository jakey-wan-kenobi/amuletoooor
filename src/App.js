import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import { text } from './text'
import { utils } from 'ethers'

const getAmuletCount = (hash) => {
  const matches = hash.match(/(8)\1*/g)
  if (!matches) return 0
  return Math.max(...matches.map(match => match.length))
}

const isValidAmuletCount = (count) => {
  return count >= 4
}

const toValidAmulet = (value) => {
  const bytes = utils.toUtf8Bytes(value)
  if (bytes.length > 64) return
  const hash = utils.sha256(bytes)
  const count = getAmuletCount(hash)
  if (!isValidAmuletCount(count)) return
  return {value, hash, count}
}

class App extends Component {
  state = {
    text: text,
    results: []
  }
  getAmulets = () => {
    let amulets = []
    const strings = this.state.text.match(/.{1,64}/g)
    strings.forEach((str) => {
      let potentialAmulet = toValidAmulet(str)
      if (potentialAmulet) {
        amulets.push(potentialAmulet)
      }
    })
    console.log('AMULETS', amulets)
    this.setState({
      results: amulets
    })
  }
  render () {
    return (
      <div className='App-container'>
        <div className='App-paste'>
          <textarea
            placeholder='Paste text here...'
            value={this.state.text}
            />
        </div>
        <div className='App-results'>
          {
            this.state.results.map((res) => {
              return (
                <div className='App-resultItem'>
                  <div className='App-amulet'>{res.value}</div>
                  <div>rarity: {res.count}</div>
                  <div>hash: {res.hash}</div>
                </div>
              )
            })
          }
        </div>
        <div
          onClick={this.getAmulets}
          className='App-button'>
          gimme amulets
        </div>
      </div>
    )
  }
}

export default App