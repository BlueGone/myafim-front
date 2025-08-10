import { CreateTransactionRequest, Transaction, Page, TransactionSchema, PageSchema } from "@/models";
import { API_URL } from ".";

type ListTransactionsQueryParams = {
  page?: number;
  limit?: number;
};

export async function listTransactions({ page, limit }: ListTransactionsQueryParams): Promise<Page<Transaction>> {
  const url = new URL("/transactions", API_URL);

  if (page !== undefined) {
    url.searchParams.append("page", String(page));
  }
  if (limit !== undefined) {
    url.searchParams.append("limit", String(limit));
  }

  const res = await fetch(url);
    const json = await res.json();
    return PageSchema(TransactionSchema).parse(json);
}

export async function createTransaction(request: CreateTransactionRequest): Promise<Transaction> {
  const url = new URL("/transactions", API_URL);

  const requestInit = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  };

  const res = await fetch(url, requestInit);
    const json = await res.json();
    return TransactionSchema.parse(json);
}
