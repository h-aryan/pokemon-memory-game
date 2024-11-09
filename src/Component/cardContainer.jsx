import React, { useEffect } from "react";
import { fetchPokemon } from "./fetching";
import Cards from "./card";

function CardContainer() {
  const [card, setCard] = React.useState([]);
  const [score, setScore] = React.useState(0);
  const [highScore, setHighScore] = React.useState(0);
  const [clicked, setClicked] = React.useState(new Set());

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchPokemon();
        setCard(shuffleArray(data));
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);

  const shuffleArray = (array) => [...array].sort(() => Math.random() - 0.5);

  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
    }
  }, [score, highScore]);

  const handleClick = (clickedCard) => {
    if (clicked.has(clickedCard.id)) {
      setScore(0);
      setClicked(new Set());
    } else {
      setScore(score + 1);
      setClicked((prevClicked) => new Set(prevClicked).add(clickedCard.id));
    }

    setCard(shuffleArray(card));
  };

  return (
    <div className="Container">
      <div className="cardContainer">
        {card.map((item) => (
          <Cards
            key={item.id}
            image={item.image}
            onClick={() => handleClick(item)}
          />
        ))}
      </div>
      <div className="Score">
        <p>Score: {score}</p>
        <p>High Score: {highScore}</p>
      </div>
    </div>
  );
}

export default CardContainer;
