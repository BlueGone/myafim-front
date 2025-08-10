"use client";

import { Page, Transaction } from '@/models';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { useEffect, useState } from 'react';
import PaginationWithEllipsis from './PaginationWithEllipsis';
import { listTransactions } from '@/lib/api/transactions';

export default function TransactionsTable() {
  const [currentPage, setCurrentPage] = useState(1);

  const [transactionPage, setTransactionPage] = useState<Page<Transaction> | null>(null);

  const eurCurrencyFormatter = Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  });
  
  useEffect(() => {
    listTransactions({ page: currentPage, limit: 10 })
      .then(data => setTransactionPage(data))
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
            <TableHead className="w-80 text-right">Source account</TableHead>
            <TableHead className="w-8 text-center">→</TableHead>
            <TableHead className="w-80">Destination account</TableHead>
            <TableHead className="w-30 text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactionPage.items.map(transaction => (
            <TableRow key={transaction.id}>
              <TableCell className="w-120">{transaction.description}</TableCell>
              <TableCell className="w-80 text-right">
                {`${transaction.sourceAccountName || 'N/A'}`}
              </TableCell>
              <TableCell className="w-8 text-center">→</TableCell>
              <TableCell className="w-80">
                {`${transaction.destinationAccountName || 'N/A'}`}
              </TableCell>
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