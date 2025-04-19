const LoaderPage = () => {
  return (
    <div
      style={{
        margin: 0,
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#E6E1F5",
      }}>
      <img
        src="logo.jpg"
        alt="TradyR Logo"
        style={{
          width: "100px",
          height: "100px",
          animation: "pulse 1.5s ease-in-out infinite",
        }}
      />
      <style jsx global>{`
        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.7;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default LoaderPage;
