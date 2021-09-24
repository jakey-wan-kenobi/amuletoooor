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
    results: [],
    rarityFilter: 4,
    loading: false
  }
  onChange = (e) => {
    this.setState({
      text: e.target.value
    })
  }
  onChangeRarity = (e) => {
    this.setState({
      rarityFilter: e.target.value
    })
  }
  getAmulets = () => {
    if (!this.state.text) return
    this.setState({
      loading: true
    })
    const runChecker = (byteCount) => {
      let amulets = []
      let finalText = this.state.text
      let pattern = new RegExp('.{1,' + byteCount + '}', 'g')
      const strings = finalText.match(pattern)
      strings.forEach((str) => {
        let potentialAmulet = toValidAmulet(str)
        if (potentialAmulet) {
          if (this.state.rarityFilter <= potentialAmulet.count) {
            amulets.push(potentialAmulet)
          }
        }
      })
      return amulets
    }
    // set timeout because we want the state to update before running this
    // potentially heavy computation. otherwise loading state won't appear.
    setTimeout(() => {
      let byteCount = 64
      let finalAmulets = []
      while (byteCount > 4) {
        let amuletsToAdd = runChecker(byteCount)
        finalAmulets = finalAmulets.concat(amuletsToAdd)
        byteCount--
      }
      this.setState({
        results: finalAmulets,
        loading: false
      })
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
            this.state.results.map((res, index) => {
              return (
                <div className='App-resultItem' key={index}>
                  <div className='App-amulet'>{res.value}</div>
                  <div>rarity: {res.count}</div>
                  <div>hash: {res.hash}</div>
                </div>
              )
            })
          }
        </div>
        <div className='App-controls'>
          <div className='App-helper'>Paste in a long text, then reveal amulets.
            Adjust rarity filter upward from 4 to be more selective. Large datasets
            may take a moment.
          </div>
          <input
            placeholder='Rarity filter...'
            value={this.state.rarityFilter}
            onChange={this.onChangeRarity} />
          <div
            onClick={this.getAmulets}
            className='App-button'>
            {!this.state.loading && 'Reveal amulets'}
            {this.state.loading && 'Searching...'}
          </div>
        </div>
      </div>
    )
  }
}

export default App