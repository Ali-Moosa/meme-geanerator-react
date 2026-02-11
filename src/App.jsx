import { useState, useEffect } from "react";
import "./App.css";
import Header from "./Header";

function App() {
  const [meme, setMeme] = useState({
    topText: "One does not simply",
    bottomText: "Walk into Mordor",
    imageUrl: "https://i.imgflip.com/1bij.jpg",
  });

  const [allMemes, setAllMemes] = useState([]);

  function handleChange(e) {
    setMeme({
      ...meme,
      [e.target.name]: e.target.value,
    });
  }

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => setAllMemes(data.data.memes));
  }, []);

  function getImg() {
    const randomNum = Math.floor(Math.random() * allMemes.length);
    const randomMeme = allMemes[randomNum].url;
    setMeme({
      ...meme,
      imageUrl: randomMeme,
    });
  }

  return (
    <>
      <Header />
      <div className="memeform">
        <label>
          Top Text
          <input
            type="text"
            placeholder="Enter the top text"
            name="topText"
            value={meme.topText}
            onChange={handleChange}
          />
        </label>
        <label>
          Bottom Text
          <input
            type="text"
            name="bottomText"
            value={meme.bottomText}
            placeholder="Enter the bottom text"
            onChange={handleChange}
          />
        </label>
      </div>
      <button onClick={getImg}>Get new meme Image</button>
      <div className="image">
        <div className="overText">
          <h2>{meme.topText}</h2>
          <h2>{meme.bottomText}</h2>
        </div>
        <img src={meme.imageUrl} />
      </div>
    </>
  );
}

export default App;
