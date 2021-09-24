import logo from './logo.svg'
import './App.css'
import Grid from './Grid'

function App () {
  return (
    <div className='App-container'>
      <div className='App-wrap'>
        <div className='App-header'>
          These tokens are <span>pumping.</span>
        </div>
        <div className='App-text'>
          Does it feel any different knowing it's synthetic?
        </div>
        <Grid />
      </div>
    </div>
  )
}

export default App
