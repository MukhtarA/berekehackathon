import React, { useState, useEffect } from "react";
import { Container } from "@ozen-ui/kit/Container";
import { Button } from "@ozen-ui/kit/Button";
import { Typography } from "@ozen-ui/kit/Typography";
import axios from "axios";
import {
  LocationIcon,
  MainIcon,
  SearchIcon,
  TickIcon,
  TengeIcon,
  RoubleIcon,
  EuroIcon,
  DollarIcon,
  FrankIcon,
  YuanIcon,
  PlusIcon,
  ArrowRightIcon,
  MenuHorizontalIcon,
} from "@ozen-ui/icons";
import { Input } from "@ozen-ui/kit/Input";
import "./style.css";
import { Chip } from "@ozen-ui/kit/Chip";
import { Card } from "@ozen-ui/kit/Card";
import { Avatar } from "@ozen-ui/kit/Avatar";
import {
  Select,
  Option,
  OptionItemText,
  OptionItemIcon,
} from "@ozen-ui/kit/Select";
import { getAccessToken, getLanguage } from "../../components/auth/helpers";
import { useHistory } from "react-router-dom";

const DemoHackaton = () => {
  const options = [
    {
      id: "KZT",
      name: "Казахстанский тенге",
      icon: TengeIcon,
      image:
        "https://cdn.countryflags.com/thumbs/kazakhstan/flag-round-250.png",
    },
    {
      id: "RUB",
      name: "Российский рубль",
      icon: RoubleIcon,
      image:
        "https://static.vecteezy.com/system/resources/previews/005/568/089/original/round-russian-flag-icon-isolated-on-white-background-the-flag-of-russia-in-a-circle-free-vector.jpg",
    },
    {
      id: "EUR",
      name: "Евро",
      icon: EuroIcon,
      image:
        "https://img.freepik.com/free-vector/illustration-european-union-flag_53876-27018.jpg",
    },
    {
      id: "USD",
      name: "Доллар США",
      icon: DollarIcon,
      image: "https://logowik.com/content/uploads/images/usa-flag1728.jpg",
    },
    { id: "CHF", name: "Швейцарский франк", icon: FrankIcon },
    { id: "CNY", name: "Китайский юань", icon: YuanIcon },
  ];

  const [fromCurrency, setFromCurrency] = useState(options[1].id);
  const [toCurrency, setToCurrency] = useState(options[1].id);
  const [exchangeRate, setExchangeRate] = useState();
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);
  const avatar = options.find((option) => option.id === fromCurrency)?.image;
  const router = useHistory();

  let toAmount, fromAmount;
  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }

  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      axios
        .get(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
        .then((res) => setExchangeRate(res.data.rates[toCurrency]));
    }
  }, [fromCurrency, toCurrency]);

  // useEffect(() => {
  //   axios.get(
  //     `http://localhost:7777/https://api3.berekebank.kz/cards/v1/?statuses=OPENED`,
  //     {
  //       headers: {
  //         Authorization: `Bearer ${getAccessToken()}`,
  //       },
  //     }
  //   );
  // }, []);

  function handleFromAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(true);
  }

  function handleToAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(false);
  }

  const [value, setValue] = useState("KZT");
  const a11yProps = (index) => ({
    id: `tab-${index}`,
    "aria-controls": `tabpanel-${index}`,
  });

  const Icon = options.find(({ id }) => id === value)?.icon;

  return (
    <Container
      gutters={{
        xs: "xl",
      }}
      maxWidth={{
        xs: "s",
      }}
    >
      <div className="header">
        <Typography variant="heading-2xl">Главная</Typography>
        <div>
          <LocationIcon size="m" color="var(--color-content-primary)" />
          <MainIcon
            style={{ marginLeft: 10 }}
            size="m"
            color="var(--color-content-primary)"
          />
        </div>
      </div>
      <Input
        label=""
        placeholder="Search"
        value={""}
        renderLeft={SearchIcon}
        style={{
          minWidth: 240,
        }}
        fullWidth
        size="2xs"
      />
      <div className="chipWrapper">
        <Chip className="chipItem" color="secondary" size="s"></Chip>
        <Chip className="chipItem" color="secondary" size="s">
          Инвестиции
        </Chip>
        <Chip className="chipItem" color="secondary" size="s">
          Junior
        </Chip>
      </div>
      <Card style={{ marginTop: 12 }} size="s" backgroundColor="standard">
        <div
          style={{
            display: "flex",
            alignItems: "self-end",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              marginBottom: 6,
            }}
          >
            <Typography variant="text-m">Convert</Typography>
            <Avatar
              name=""
              size="2xs"
              src={avatar}
              style={{ marginLeft: 12 }}
            />
          </div>

          <Input
            type="number"
            value={fromAmount}
            onChange={handleFromAmountChange}
            size="2xs"
            fullWidth
            style={{ marginBottom: 6 }}
          />
          <Select
            label="Валюта"
            onChange={(value) => setFromCurrency(value)}
            fullWidth
            size="2xs"
            style={{ marginBottom: 6 }}
          >
            {options.map(({ id, name }) => {
              const selected = value === id;

              return (
                <Option key={id} label={name} value={id} selected={selected}>
                  <OptionItemText primary={name} />

                  {selected && (
                    <OptionItemIcon>
                      <TickIcon />
                    </OptionItemIcon>
                  )}
                </Option>
              );
            })}
          </Select>
          <Select
            label="Валюта"
            value={toCurrency}
            onChange={(value) => setToCurrency(value)}
            fullWidth
            size="2xs"
            style={{ marginBottom: 6 }}
          >
            {options.map(({ id, name, icon: Icon }) => (
              <Option key={id} value={id}>
                <OptionItemText primary={name} />
              </Option>
            ))}
          </Select>
          <Input
            fullWidth
            size="2xs"
            type="number"
            value={toAmount}
            onChange={handleToAmountChange}
            style={{ marginBottom: 6 }}
          />
        </div>
        <div style={{ marginTop: 12 }}>
          <Button style={{ marginRight: "6px" }} iconLeft={PlusIcon} size="2xs">
            Пополнить
          </Button>
          <Button
            style={{ marginRight: "6px" }}
            iconLeft={ArrowRightIcon}
            size="2xs"
          >
            Перевод
          </Button>
          <Button
            style={{ marginRight: "6px" }}
            size="2xs"
            iconLeft={MenuHorizontalIcon}
          ></Button>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "12px 0",
          }}
        >
          <Typography variant="text-m">Транзакции</Typography>
          <Button
            onClick={() => router.push("/dummy")}
            variant="function"
            size="xs"
          >
            Все транзакции
          </Button>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex" }}>
            <Avatar
              name=""
              size="m"
              src="https://upload.wikimedia.org/wikipedia/sco/thumb/b/bf/KFC_logo.svg/2048px-KFC_logo.svg.png"
            />
            <div style={{ marginLeft: 10 }}>
              <Typography variant="heading-xl">KFC</Typography>
              <Typography variant="text-2xs">12:30</Typography>
            </div>
          </div>

          <div>
            <Typography variant="text-xl_2">-667t</Typography>
          </div>
        </div>
      </Card>
    </Container>
  );
};

export default DemoHackaton;
