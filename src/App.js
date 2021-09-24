import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
// import { text } from './text'
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
    text: '',
    byteCount: 64,
    results: []
  }
  onChange = (e) => {
    this.setState({
      text: e.target.value
    })
  }
  onChangeBytes = (e) => {
    this.setState({
      byteCount: e.target.value
    })
  }
  getAmulets = () => {
    if (!this.state.text) return
    let amulets = []
    let finalText = this.state.text
    let pattern = new RegExp('.{1,' + this.state.byteCount + '}', 'g')
    const strings = finalText.match(pattern)
    strings.forEach((str) => {
      let potentialAmulet = toValidAmulet(str)
      if (potentialAmulet) {
        amulets.push(potentialAmulet)
      }
    })
    this.setState({
      results: amulets
    })
  }
  render () {
    return (
      <div className='App-container'>
        <div className='App-paste'>
          <textarea
            onChange={this.onChange}
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
        <div className='App-controls'>
          <div className='App-helper'>Paste in a long text, then "reveal amulets."" Changing length will
            produce new results (must be 64 bytes or fewer).
          </div>
          <input
            placeholder='Length...'
            value={this.state.byteCount}
            onChange={this.onChangeBytes} />
          <div
            onClick={this.getAmulets}
            className='App-button'>
            Reveal amulets
          </div>
        </div>
      </div>
    )
  }
}

export default App