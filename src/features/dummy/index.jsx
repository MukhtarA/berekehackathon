import React, { useEffect, useState } from "react";
import axios from "axios";
import { getAccessToken } from "../../components/auth/helpers";
import { Select, Option } from "@ozen-ui/kit/Select";
import { Button } from "@ozen-ui/kit/Button";
import { Container } from "@ozen-ui/kit/Container";
import { SectionMessage } from "@ozen-ui/kit/SectionMessage";

const products = [
  { id: "product1", name: "KFC", price: 100 },
  { id: "product2", name: "Doner", price: 200 },
  { id: "product3", name: "Besh", price: 300 },
];

export const Dummy = () => {
  const [availableCards, setAvailableCards] = useState([]);
  const [message, setMessage] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCardBalance, setSelectedCardBalance] = useState(0);

  useEffect(() => {
    axios
      .get(
        `http://localhost:7777/https://api3.berekebank.kz/cards/v1/?statuses=OPENED`,
        {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        }
      )

      .then((res) => {
        const data = res.data;
        const filteredData = data.filter(
          (item) => item.alias === "Visa Digital ALL IN"
        );

        setAvailableCards(filteredData[0].balances);
      });

    console.log("available", availableCards);
  }, []);

  const handleSubmit = () => {
    console.log("Price", selectedProduct);
    console.log(selectedCardBalance);
    if (selectedProduct <= selectedCardBalance) {
      console.log("Success");
      setMessage({ status: "success", text: "Успешная операция" });
    } else {
      setMessage({ status: "warning", text: "Неудачная операция" });
    }
  };

  const handleCardSelect = (value) => {
    const selectedCardAlias = value;
    console.log("Value", selectedCardAlias);

    setSelectedCardBalance(selectedCardAlias);
  };

  console.log(availableCards);

  const handleProductSelect = (value) => {
    setSelectedProduct(value);
  };

  return (
    <Container
      gutters={{
        xs: "xl",
      }}
      maxWidth={{
        xs: "s",
      }}
      style={{ marginTop: 12 }}
    >
      {message && (
        <SectionMessage size="m" status={message.status} title="Уведомление">
          {message.text}
        </SectionMessage>
      )}
      <Select
        size="xs"
        fullWidth
        name="product"
        onChange={(value) => handleProductSelect(value)}
        style={{ marginTop: 6 }}
      >
        {products.map((product) => (
          <Option key={product.id} value={product.price}>
            {product.name} - {product.price}
          </Option>
        ))}
      </Select>

      <Select
        size="xs"
        fullWidth
        name="card"
        onChange={(value) => handleCardSelect(value)}
        style={{ marginTop: 6 }}
      >
        {availableCards?.map((card) => (
          <Option key={card.balAmt} value={card.balAmt}>
            на счету {card.balAmt}
          </Option>
        ))}
      </Select>

      <Button
        style={{ marginTop: 6 }}
        size="xs"
        variant="contained"
        fullWidth
        onClick={handleSubmit}
      >
        Оплатить
      </Button>
    </Container>
  );
};
