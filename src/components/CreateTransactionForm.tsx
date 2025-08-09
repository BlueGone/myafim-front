"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "./ui/button";
import { CreateTransactionRequest, createTransactionRequestSchema } from "@/models";

export const CreateTransactionForm = () => {
  const createTransactionForm = useForm({
    mode: 'onTouched',
    resolver: zodResolver(createTransactionRequestSchema)
  });

  const { isSubmitting, isValid } = createTransactionForm.formState;
  const isDisabled = isSubmitting || !isValid;

  return (
    <form onSubmit={createTransactionForm.handleSubmit(data => !isDisabled && onSubmit(data))}>
      <div>
        <label>
          Amount
          <input type="number" step="0.01" {...createTransactionForm.register("amount", { setValueAs: parseFloat })} />
        </label>
      </div>
      <div>
        <label>
          Description
          <input type="text" {...createTransactionForm.register("description")} />
        </label>
      </div>
      <div>
        <label>
          Date
          <input type="date" {...createTransactionForm.register("date")} />
        </label>
      </div>
      <div>
        <Button type="submit" disabled={isDisabled}>
          {isSubmitting ? "Creating..." : "Create Transaction"}
        </Button>
      </div>
    </form>
  );
}

function onSubmit(data: CreateTransactionRequest): Promise<unknown> {
  return fetch(`${process.env.MYAFIM_API_URL}/transactions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}
