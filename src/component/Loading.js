const Loading = () => {
  return (
    <>
      <div className="loading">
        <img
          className="mainLoad-img"
          src={process.env.PUBLIC_URL + "/images/loading.gif"}
          alt="loading"
        />
      </div>
    </>
  );
};
export default Loading;
