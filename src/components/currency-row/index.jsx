// CurrencyRow.js
import React from "react";
import { Input, Select } from "@ozen-ui/kit";

export default function CurrencyRow(props) {
  const {
    currencyOptions,
    selectedCurrency,
    onChangeCurrency,
    amount,
    onChangeAmount,
  } = props;

  return (
    <div>
      <Input type="number" value={amount} onChange={onChangeAmount} />
      <Select
        options={currencyOptions}
        value={selectedCurrency}
        onChange={onChangeCurrency}
      />
    </div>
  );
}
