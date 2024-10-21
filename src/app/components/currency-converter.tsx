'use client';
import { useState } from 'react';

interface CurrencyConverterProps {
  baseCurrency: string;
  targetCurrency: string;
  exchangeRate: number;
}

export default function CurrencyConverter({ baseCurrency, targetCurrency, exchangeRate }: CurrencyConverterProps) {
  const [amount, setAmount] = useState<string>('');

  const convertedAmount = amount ? parseFloat(amount) * exchangeRate : 0;

  return (
    <div className="p-4 border rounded-lg">
      <h3 className="font-bold mb-2">Currency Converter</h3>
      <div className="flex items-center space-x-2">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border p-2 w-32"
          placeholder="Amount"
        />
        <span>{baseCurrency}</span>
        <span>=</span>
        <span className="font-bold">{convertedAmount.toFixed(2)}</span>
        <span>{targetCurrency}</span>
      </div>
    </div>
  );
};
