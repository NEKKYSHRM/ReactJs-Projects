import React, { useEffect, useState } from "react";
import MusicPlayer from "./MusicPlayer";
import millionaire from "../assets/images/Millionaire.jpg";
import nayan from "../assets/images/Nayan.jpg";
import hanumanChalisa from "../assets/images/Hanuman-chalisa.jpg";
import stree2 from "../assets/images/aayi-nayi.jpg";
import aanMilo from "../assets/images/aan-milo-sajna.jpg";
import raid from "../assets/images/sanu -ek-pal.jpg";
import panchayat from "../assets/images/panchayat.jpeg";
import kissik from "../assets/images/kissik.jpeg";
import playBtn from "../assets/images/play-button.png";
import pauseBtn from "../assets/images/pause.png";

//songs import
import song1 from "../assets/audios/Millionaire.mp3";
import song2 from "../assets/audios/Hanuman-Chalisa.mp3";
import song3 from "../assets/audios/Nayan.mp3";
import song4 from "../assets/audios/stree2.mp3";
import song5 from "../assets/audios/aanmilo.mp3";
import song6 from "../assets/audios/sanu-ek.mp3";
import song7 from "../assets/audios/panchayat.mp3";
import song8 from "../assets/audios/kissik.mp3";

function MusicLists({ setPlayingSong, playingSong, setSongs, playingCard }) {
  const [bgColor, setBgColor] = useState("#bde0fe");

  const songs = [
    {
      artist: "Yo Yo Honey Singh",
      title: "Millionaire",
      poster: millionaire,
      id: 1,
      file: song1,
    },
    {
      artist: "Gulshan Kumar",
      title: "Hanuman Chalisa",
      poster: hanumanChalisa,
      id: 2,
      file: song2,
    },
    {
      artist: "Dhvani Bhanushali",
      title: "Nayan",
      poster: nayan,
      id: 3,
      file: song3,
    },
    {
      artist: "Pawan Sing",
      title: "Aayi Nai",
      poster: stree2,
      id: 4,
      file: song4,
    },
    {
      artist: "Kishore K, Lata M",
      title: "Achha To Hum Chalte Hain",
      poster: aanMilo,
      id: 5,
      file: song5,
    },
    {
      artist: "Rahat Fateh AK",
      title: "Sanu Ek Pal",
      poster: raid,
      id: 6,
      file: song6,
    },
    {
      artist: "Manoj Tiwari",
      title: "Hind Ke Sitara",
      poster: panchayat,
      id: 7,
      file: song7,
    },
    {
      artist: "Lothika",
      title: "Kissik",
      poster: kissik,
      id: 8,
      file: song8,
    },
  ];

  // setSongs(songs)

  const playSong = (song) => {
    setBgColor("#dee3ff");
    setPlayingSong(song);
    setSongs(songs);
  };

  const [currentSong, setCurrentSong] = useState();
  useEffect(() => {
    setCurrentSong(playingSong);
  }, [playingSong]);

  useEffect(() => {
    setCurrentSong(playingCard)
  },[playingCard])

  return (
    <>
      <div className="w-full grid grid-rows-2 grid-cols-4 gap-x-5 gap-y-5">
        {/*Created music cards  */}

        {songs.map((song) => (
          <div
            style={{
              backgroundColor:
                song.id === (currentSong && currentSong.id) ? bgColor : "#ffafca",
            }}
            key={song.id}
            className="w-full flex flex-row justify-between items-center p-2 rounded-xl"
          >
            <div className="flex gap-3">
              <div
                style={{
                  backgroundImage: `url(${song.poster})`,
                  backgroundSize: "cover",
                  width: "4vw",
                  height: "4vw",
                  borderRadius: "1vw",
                }}
              ></div>
              <div className="flex flex-col">
                <h1 className="font-bold">{song.title}</h1>
                <p className="text-gray-700">{song.artist}</p>
              </div>
            </div>
            <div>
              <button
                onClick={() => {
                  playSong(song);
                }}
                style={{
                  backgroundImage: `url(${
                    song.id === (currentSong && currentSong.id)
                      ? pauseBtn
                      : playBtn
                  })`,
                  backgroundSize: "cover",
                  width: "3vw",
                  height: "3vw",
                }}
              ></button>
            </div>
          </div>
        ))}
      </div>
      {/* <MusicPlayer playingSong={playingSong} /> */}
    </>
  );
}

export default MusicLists;
