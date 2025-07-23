"use client";

import { Page, PageSchema, Transaction, TransactionSchema } from '@/models';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { useEffect, useState } from 'react';
import PaginationWithEllipsis from './PaginationWithEllipsis';

export default function TransactionsTable() {
  const [currentPage, setCurrentPage] = useState(1);

  const [transactionPage, setTransactionPage] = useState<Page<Transaction> | null>(null);

  const eurCurrencyFormatter = Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  });
  
  useEffect(() => {
    fetch(`${process.env.MYAFIM_API_URL}/transactions?limit=10&page=${currentPage}`)
      .then(res => res.json())
      .then(PageSchema(TransactionSchema).parse)
      .then(data => setTransactionPage(data));
  }, [currentPage]);
  
  if (!transactionPage) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-120">Description</TableHead>
            <TableHead className="w-30 text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactionPage.items.map(transaction => (
            <TableRow key={transaction.id}>
              <TableCell className="w-120">{transaction.description}</TableCell>
              <TableCell className="w-30 text-right">{eurCurrencyFormatter.format(transaction.amount)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <PaginationWithEllipsis 
        currentPage={currentPage}
        totalPages={transactionPage.totalPages}
        setCurrentPage={setCurrentPage} 
      />
    </div>
  )
}