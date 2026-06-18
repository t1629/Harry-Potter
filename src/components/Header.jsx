import "../components/layout/Header.css";
const Header = () => {
  return (
    <header className="hp-header">
      <div className="header-content">
        <div className="title-container">
          <span className="logo-icon">⚡</span>
          <h1>Hogwarts Mistery</h1>
          <span className="logo-icon">͛⚯</span>
        </div>

        <p className="subtitle magic-underline">Donde la magia cobra vida</p>

        <div className="hogwarts-houses">
          <span className="house gryffindor">Gryffindor</span>
          <span className="house slytherin">Slytherin</span>
          <span className="house ravenclaw">Ravenclaw</span>
          <span className="house hufflepuff">Hufflepuff</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
