import React, { useEffect, useRef, useState } from "react";
import "./MusicPlayer.css";
import discpng from "../assets/images/cd.png";
import prevBtn from "../assets/images/previous.png";
import nextBtn from "../assets/images/next-button.png";
import playBtn from "../assets/images/play-pink.png";
import pauseBtn from "../assets/images/pause-btn.png";

function MusicPlayer({ playingSong, songs, setPlayingCard }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [currentPlayingSong, setPlayingSong] = useState(null);

  useEffect(() => {
    setPlayingSong(playingSong);
  }, [playingSong]);
  
  useEffect(() => {
    if (playingSong && audioRef.current) {
      audioRef.current.src = currentPlayingSong.file;
      audioRef.current.play();
      setIsPlaying(true);
      setPlayingCard(currentPlayingSong)      
    }
  }, [currentPlayingSong]);

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTime = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleMetaData = () => {
    setDuration(audioRef.current.duration);
  };

  const handleSeek = () => {
    const seekTime = (e.target.value / 100) * duration;
    audioRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value / 100;
    audioRef.current.volume = newVolume;
    setVolume(newVolume);
  };

  const formateTime = (time) => {
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  return (
    <div className="w-full flex flex-col justify-center items-center py-6 gap-8 ">
      {/* Rotating Disk */}
      <div className="w-full flex items-center justify-center relative">
        <div
          style={{
            backgroundImage: `url(${discpng})`,
            backgroundSize: "cover",
            width: "20vw",
            height: "20vw",
          }}
          className={isPlaying ? 'logo' : ''}
          
        ></div>
        <div
        // style={{
        //   backgroundImage: `url(${playingSong ? playingSong.poster : discpng})`,
        //   backgroundSize: "cover",
        //   width: "20vw",
        //   height: "20vw",
        //   zIndex: 1,
        //   position: "absolute",
        //   left: "30vw"
        // }}
        ></div>
      </div>

      {/* Music Player */}
      <div style={{display: 'grid', gridTemplateColumns: '20vw 40vw 20vw', justifyContent: 'center', alignItems: 'center'}} className="w-10/12 bg-secondry p-2 rounded-xl">
        {/* Shows Playing song info */}
        <div className="flex gap-3 justify-center">
          <div
            style={{
              backgroundImage: `url(${
                currentPlayingSong ? currentPlayingSong.poster : discpng
              })`,
              backgroundSize: "cover",
              width: "4vw",
              height: "4vw",
              borderRadius: "1vw",
            }}
          ></div>
          <div className="flex flex-col">
            <h1 className="font-bold">
              {currentPlayingSong ? currentPlayingSong.title : "Select Song"}
            </h1>
            <p className="text-gray-700">
              {currentPlayingSong ? currentPlayingSong.artist : "Select Song"}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="flex justify-around w-72">
            <button
              onClick={() => {
                if (!playingSong || !songs) return;
                const currentIndex = songs.findIndex(
                  (song) => song.id === currentPlayingSong.id
                );
                const prevIndex =
                  (currentIndex - 1 + songs.length) % songs.length;
                setPlayingSong(songs[prevIndex]);
              }}
              className="p2 bg-secondry rounded-full"
              style={{
                backgroundImage: `url(${prevBtn})`,
                backgroundSize: "cover",
                width: "3vw",
                height: "3vw",
              }}
            ></button>
            <button
              onClick={togglePlayPause}
              className="p2 bg-secondry rounded-full"
              style={{
                backgroundImage: `url(${isPlaying ? pauseBtn : playBtn})`,
                backgroundSize: "cover",
                width: "3vw",
                height: "3vw",
              }}
            ></button>
            <button
              onClick={() => {
                if (!playingSong || !songs) return;
                const currentIndex = songs.findIndex(
                  (song) => song.id === currentPlayingSong.id
                );
                const nextIndex = (currentIndex + 1) % songs.length;
                setPlayingSong(songs[nextIndex]);
              }}
              className="p2 bg-secondry rounded-full"
              style={{
                backgroundImage: `url(${nextBtn})`,
                backgroundSize: "cover",
                width: "3vw",
                height: "3vw",
              }}
            ></button>
          </div>
          <div className="flex w-full">
            {/* Audio controls */}
            <div className="controls w-full flex items-center gap-5 mt-4">
              <span>{formateTime(currentTime)}</span>
              <input
                type="range"
                value={(currentTime / duration) * 100 || 0}
                onChange={handleSeek}
                className="timeline w-full appearance-none bg-primary h-1 rounded-full focus:outline-none"
              />
              <span>{formateTime(duration)}</span>
            </div>
          </div>
        </div>

        {/* Volume Control */}
        <div className="volume-control flex justify-center gap-2 mt-4">
          <label htmlFor="volume">Volume</label>
          <input
            type="range"
            id="volume"
            min="0"
            max="100"
            value={volume * 100}
            onChange={handleVolumeChange}
          />
        </div>
      </div>

      {/* Player */}
      <div>
        <audio
          ref={audioRef}
          onTimeUpdate={handleTime}
          onLoadedMetadata={handleMetaData}
        ></audio>
      </div>
    </div>
  );
}

export default MusicPlayer;
