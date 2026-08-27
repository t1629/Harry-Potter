import "./layout/Loading.css";

const Loading = () => {
  return (
    <div className="loading-overlay">
      <div className="loading-spinner-container">
        <div className="loading-spinner" />
        <h5>LOADING ...</h5>
      </div>
    </div>
  );
};

export default Loading;
