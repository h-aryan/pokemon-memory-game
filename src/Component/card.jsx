const Cards = ({ image, onClick }) => {
  return (
    <div className="Card" onClick={onClick}>
      <img src={image} alt="Pokemon" />
    </div>
  );
};

export default Cards;
