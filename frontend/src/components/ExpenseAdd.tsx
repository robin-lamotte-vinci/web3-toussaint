import { useState } from "react";
import type { ExpenseInput } from "../types/Expense";

interface ExpenseAddProps {
  addExpense: (expense: ExpenseInput) => void;
}

export default function ExpenseAdd({ addExpense }: ExpenseAddProps) {
  const [payer, setPayer] = useState<"Alice" | "Bob">("Alice");
  const [date, setDate] = useState<string>(new Date().toISOString().slice(0, 10));
  const [description, setDescription] = useState<string>("");
  const [amount, setAmount] = useState<string>("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const parsedAmount = parseFloat(amount);
    const dateISO = new Date(date).toISOString();

    addExpense({
      date: dateISO,
      description: description,
      payer: payer,
      amount: isNaN(parsedAmount) ? 0 : parsedAmount,
    });
  };
  return (
    <form onSubmit={onSubmit}>
      <div>
        <label>
          Payer:
          <select
            value={payer}
            onChange={(e) => setPayer(e.target.value as "Alice" | "Bob")}
          >
            <option value="Alice">Alice</option>
            <option value="Bob">Bob</option>
          </select>
        </label>
      </div>

      <div>
        <label>
          Date:
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
      </div>

      <div>
        <label>
          Description:
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
      </div>

      <div>
        <label>
          Amount:
          <input
            type="number"
            step="0.01"
            min="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </label>
      </div>

      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  );
}
