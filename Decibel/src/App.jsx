import { useState } from 'react'
import './App.css'
import MusicPlayer from './components/MusicPlayer.jsx'
import MusicLists from './components/MusicLists.jsx'

function App() {

  const [playingSong, setPlayingSong] = useState(null);
  const [songs, setSongs] = useState(null);
  const [playingCard, setPlayingCard] =useState(null)

  return (
    <div className='w-full h-screen flex flex-col' style={{backgroundImage: `url(https://images.pexels.com/photos/2088142/pexels-photo-2088142.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)`}}>

      {/* Maked header section */}
      <header className='w-full bg-primary flex justify-center relative top-0 text-white font-extrabold p-1 text-2xl'>DeciBel</header>

      {/* Imported music player from the musicplayer.jsx */}
      <MusicPlayer playingSong={playingSong} songs={songs} setPlayingCard={setPlayingCard}/>

      {/* Footer section which contains lists of songs */}
      <footer className='bg-primary w-full absolute bottom-0 px-5 py-5'>
        <MusicLists setPlayingSong={setPlayingSong} playingCard={playingCard} playingSong={playingSong} setSongs={setSongs}/>
      </footer>
    </div>
  )
}

export default App
