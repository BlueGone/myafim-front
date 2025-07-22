"use client";

import { PageSchema, Transaction, TransactionSchema } from '@/models';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { useEffect, useState } from 'react';

export default function TransactionsTable() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const eurCurrencyFormatter = Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  });
  
  useEffect(() => {
    fetch(`${process.env.MYAFIM_API_URL}/transactions?limit=10`)
      .then(res => res.json())
      .then(PageSchema(TransactionSchema).parse)
      .then(data => setTransactions(data.items));
  }, []);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-120">Description</TableHead>
          <TableHead className="w-30 text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map(transaction => (
          <TableRow key={transaction.id}>
            <TableCell className="w-120">{transaction.description}</TableCell>
            <TableCell className="w-30 text-right">{eurCurrencyFormatter.format(transaction.amount)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}