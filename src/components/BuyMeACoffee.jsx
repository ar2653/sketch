const BuyMeACoffee = () => {
  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        padding: "10px",
        zIndex: 1000,
      }}
    >
      <a
        href="https://www.buymeacoffee.com/poisonrose"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
          alt="Buy Me A Coffee"
          style={{
            height: "60px",
            width: "217px",
          }}
        />
      </a>
    </div>
  );
};

export default BuyMeACoffee;
