import { useEffect, useState } from "react";
import "./index.css";

// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

function App() {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [converted, setConverted] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchCurrency = async () => {
      if (amount <= 0) {
        setConverted(0);
        return;
      }
      try {
        setIsLoading(true);
        const response = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
        );
        console.log(response);
        const data = await response.json();
        setConverted(data.rates[toCurrency]);
        setIsLoading(false);
        // console.log(data);
      } catch (error) {
        console.error(error);
      }
    };
    if (fromCurrency === toCurrency) return setConverted(amount);
    fetchCurrency();
  }, [amount, fromCurrency, toCurrency]);
  function handleFromCurrency(e) {
    setFromCurrency(e.target.value);
  }
  function handleToCurrency(e) {
    setToCurrency(e.target.value);
  }
  return (
    <div>
      <input
        type="text"
        value={amount}
        disabled={isLoading}
        onChange={(e) => {
          const newValue = Number(e.target.value);
          setAmount(newValue <= 0 ? 0 : newValue);
        }}
      />
      <select
        value={fromCurrency}
        onChange={handleFromCurrency}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select
        value={toCurrency}
        onChange={handleToCurrency}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>
        Converted amount:{" "}
        {isLoading ? "Loading..." : `${converted} ${toCurrency}`}
      </p>
      <button
        style={{ cursor: "pointer" }}
        onClick={() => {
          setAmount(0);
          setConverted("");
        }}
      >
        Reset
      </button>
    </div>
  );
}

export default App;
