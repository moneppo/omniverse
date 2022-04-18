import { useState } from 'react';
import Canvas from './Canvas';
/// import {FiDownload, FiPackage} from 'react-icons/fi';



const App = () => {
  const [cards, setCards] = useState<Array<{ svg: string, thumb: string }>>([]);
  const [activeCard, setActiveCard] = useState(-1);
  // Buttons
  // Pack card browser
  const addCard = () => {
    setActiveCard(cards.length);
    setCards(c => [...c, { svg: "", thumb: "omniverse/logo.svg" }]);
  }

  const changeCard = (index: number) => {
    setActiveCard(index);
  }

  const cardUpdated = (svg: string, thumb: string) => {
    setCards(c => {
      c[activeCard] = {svg, thumb}
      return [...c];
    })
  }

  return <div className="app">
    <div className="packlist">
      {cards.map((c, i) => (
        <button
          className="card"
          style={{
            backgroundImage: `url(${c.thumb})`,
            border: activeCard === i ? "solid 2px black" : undefined,
            backgroundSize: "contain"
          }}
          onClick={() => changeCard(i)}
        />))}
      <button
        className="card"
        onClick={addCard}
        style={{ fontSize: "80px", color: "#999" }}>+</button>
    </div>
    {activeCard >= 0 && cards[activeCard] !== undefined ?
      <Canvas onSave={cardUpdated} />
      :
      <div className="canvas" style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#999",
      }}>Select a card</div>}
  </div>;
}

export default App;