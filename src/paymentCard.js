import React, { useState } from "react";

const PaymentCard = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [cvc, setCvc] = useState("");

  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    value = value.slice(0, 16);
    const formattedValue = value
      .replace(/\D/g, "")
      .replace(/(\d{4})(?=\d)/g, "$1-");
    setCardNumber(formattedValue);
  };

  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    value = value.slice(0, 4);

    // Extracting month and year from the formattedValue
    const formattedValue = value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d{0,2})/, "$1/$2");

    // Extracting month and year separately
    const [extractedMonth, extractedYear] = formattedValue.split("/");

    setMonth(extractedMonth || ""); // Setting month (empty string if not present)
    setYear(extractedYear || ""); // Setting year (empty string if not present)
  };

  const handleCvcChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    value = value.slice(0, 3);
    setCvc(value);
  };

  console.log({ cardNumber, month, year, cvc });

  return (
    <div>
      <label>
        Card Number:
        <input
          type="text"
          value={cardNumber}
          onChange={handleCardNumberChange}
        />
      </label>
      <br />
      <label>
        Expiry Date:
        <input
          type="text"
          value={`${month}/${year}`}
          onChange={handleExpiryChange}
        />
      </label>
      <br />
      <label>
        CVC:
        <input type="text" value={cvc} onChange={handleCvcChange} />
      </label>
    </div>
  );
};

export default PaymentCard;
