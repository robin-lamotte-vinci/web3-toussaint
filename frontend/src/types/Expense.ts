export interface Expense {
  id: string;
  date: string;
  description: string;
  payer: string;
  amount: number;
}

export type ExpenseInput = Omit<Expense, 'id'>