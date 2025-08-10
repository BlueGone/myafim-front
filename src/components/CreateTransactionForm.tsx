"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "./ui/button";
import { CreateTransactionRequest, createTransactionRequestSchema } from "@/models";
import { Input } from "./ui/input";
import { FormControl, FormItem, FormLabel, Form, FormFieldNative } from "./ui/form";
import { Loader2Icon } from "lucide-react";

export const CreateTransactionForm = () => {
  const createTransactionForm = useForm({
    mode: 'onTouched',
    resolver: zodResolver(createTransactionRequestSchema)
  });

  const { isSubmitting } = createTransactionForm.formState;

  return (
    <Form {...createTransactionForm}>
      <form onSubmit={createTransactionForm.handleSubmit(onSubmit)} className="grid gap-4">
        <FormFieldNative name="amount">
          <FormItem>
            <FormLabel>Amount</FormLabel>
            <FormControl>
              <Input type="text" {...createTransactionForm.register("amount", { setValueAs: v => v && parseFloat(v) })} />
            </FormControl>
          </FormItem>
        </FormFieldNative>

        <FormFieldNative name="description">
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Input type="text" {...createTransactionForm.register("description")} />
            </FormControl>
          </FormItem>
        </FormFieldNative>

        <FormFieldNative name="date">
          <FormItem>
            <FormLabel>Date</FormLabel>
            <FormControl>
              <Input type="date" {...createTransactionForm.register("date")} />
            </FormControl>
          </FormItem>
        </FormFieldNative>

        <FormItem>
          <Button type="submit" disabled={isSubmitting} >
            {isSubmitting && <Loader2Icon className="animate-spin" />}
            Create transaction
          </Button>
        </FormItem>
      </form>
    </Form>
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
