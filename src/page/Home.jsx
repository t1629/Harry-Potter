import varita from "../assets/pngwing.com4.png";
import "../components/layout/Home.css";
const Index = () => {
  return (
    <div className="hp-container">
      <main className="hp-main">
        <h2 className="tittle-change"> ⚡︎ Bienvenido a la magia ͛⚯</h2>
        <p className="text-change">
          Explora el mundo de Harry Potter con un diseño oscuro y brillante.
        </p>
        <div className="varitas">
          <img src={varita} alt="varita de harry potter" className="varita" />
        </div>
      </main>
    </div>
  );
};

export default Index;
