import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    let income = 0;
    let outcome = 0;
    const transactions = await this.find();
    // console.log(transactions);
    transactions.forEach(transaction => {
      if (transaction.type === 'income') {
        income += Number(transaction.value);
      } else {
        outcome += Number(transaction.value);
      }
    });
    const balance = {
      income,
      outcome,
      total: income - outcome,
    };
    return balance;
  }
}

export default TransactionsRepository;
