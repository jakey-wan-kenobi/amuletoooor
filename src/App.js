import logo from './logo.svg'
import './App.css'

const data = [
  '@beanimaxi',
  '@iamDCinvestor',
  '@jebus911',
  '@justintrimble',
  '@pranksy',
  '@crypto888crypto',
  '@KeyboardMonkey3',
  '@Vince_Van_Dough'
]

const getSentenceOne = (
  love1,
  love2,
  love3,
  emotion,
  emotionObject, 
  age,
  person,
  pastActivity
) => {
  return `He loves ${love1}, ${love2}, and ${love3}. More than anything, he ${emotion} ${emotionObject}. When he was ${age}, his ${person} ${pastActivity}.`
}

const emotions = [
  'craves',
  'desires',
  'fears',
  'hates',
  'wishes',
  'believes',
  'hopes'
]
const loves = [
  'his children',
  'his mother',
  'fine wines',
  'golf',
  'surfing',
  'french toast',
  'gardening'
]
const desires = [
  'power and respect',
  'to be left alone',
  'to be considered funny'
]
const fears = [
  'being forgotten',
  'death'
]
const hates = [
  'when people treat him as lessor because he didn\'t go to college'
]
const wishes = [
  'his father would be more proud of him'
]
const believes = [
  'in the resurrection of the dead and the life of the world to come'
]
const hopes = [
  'to be remembered as a kind person'
]
const craves = [
  'the love and admiration of his peers',
  'the respect of his children'
]
const persons = [
  'brother',
  'uncle',
  'father',
  'mother',
  'best friend'
]
const pastEvents = [
  'passed away, and he still misses them to this day',
  'took him to Disneyland, and he\'ll never forget the feeling of joy that overpowered him'
]

const assembleSentence = () => {
  let love1 = loves[Math.floor(Math.random() * loves.length)]
  let love2 = loves[Math.floor(Math.random() * loves.length)]
  let love3 = loves[Math.floor(Math.random() * loves.length)]
  let emotion = emotions[Math.floor(Math.random() * emotions.length)]
  let emotionObjectsArray = eval(emotion)
  console.log(emotionObjectsArray)
  let emotionObject = emotionObjectsArray[Math.floor(Math.random() * emotionObjectsArray.length)]
  let age = Math.floor(Math.random() * (30 - 1 + 1) + 1)
  let person = persons[Math.floor(Math.random() * persons.length)]
  let pastEvent = pastEvents[Math.floor(Math.random() * pastEvents.length)]
  let sentence = getSentenceOne(love1, love2, love3, emotion, emotionObject, age, person, pastEvent)
  return sentence
}

// const replaceItems = (sentenceBones) => {
//   const words = sentenceBones.split(' ')
//   let newSentence = assembleSentence()
//   words.forEach(word => {
//     console.log(word)
//     let replacement = word
//     if (word === '$LOVE') {
//       console.log('word is love')
//       replacement = loves[Math.floor(Math.random) * loves.length]
//     }
//     newSentence = newSentence + replacement
//   })
// }

function App () {
  const anon = data[Math.floor(Math.random() * data.length)]
  const text = assembleSentence()
  return (
    <div className='App-container'>
      <div className='App-text'>
        <div className='App-innerText'>
          This is <a href={`https://twitter.com/${anon}`}>{anon}</a>. {text}
        </div>
      </div>
      <div className='App-image'>
        <img src='https://thispersondoesnotexist.com/image' alt='logo' />
      </div>
    </div>
  )
}

export default App
