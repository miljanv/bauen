"use client";

import type { FormEvent } from "react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const fieldClass =
  "font-sans h-9 rounded-none border-0 border-b border-neutral-600 bg-transparent px-0 py-1 text-sm text-neutral-50 shadow-none placeholder:text-neutral-600 focus-visible:border-primary focus-visible:ring-0 focus-visible:ring-offset-0 dark:bg-transparent";

const labelClass = "font-sans text-xs font-bold leading-4 text-neutral-600";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  if (sent) {
    return (
      <div className="border border-white/10 bg-card/80 p-8 text-center">
        <p className="font-heading text-lg font-semibold text-white">Hvala vam na poruci.</p>
        <p className="mt-2 text-sm text-neutral-600">
          Naš tim će vas kontaktirati u najkraćem roku sa predlogom sledećih koraka.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-9 md:gap-10">
      <div className="grid gap-8 sm:grid-cols-2 sm:gap-x-12 sm:gap-y-8">
        <div className="space-y-2">
          <label htmlFor="firstName" className={labelClass}>
            Ime
          </label>
          <Input
            id="firstName"
            name="firstName"
            required
            autoComplete="given-name"
            placeholder="Marko"
            className={fieldClass}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="lastName" className={labelClass}>
            Prezime
          </label>
          <Input
            id="lastName"
            name="lastName"
            required
            autoComplete="family-name"
            placeholder="Petrović"
            className={fieldClass}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className={labelClass}>
            Email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="marko@email.com"
            className={fieldClass}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="phone" className={labelClass}>
            Broj telefona
          </label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+381 60 123 45 67"
            className={fieldClass}
          />
        </div>
      </div>
      <div className="space-y-2">
        <label htmlFor="message" className={labelClass}>
          Poruka
        </label>
        <Textarea
          id="message"
          name="message"
          required
          rows={4}
          placeholder="Unesite Vašu poruku..."
          className="font-sans min-h-22 resize-y rounded-none border-0 border-b border-neutral-600 bg-transparent px-0 py-1 text-sm text-neutral-50 shadow-none placeholder:text-neutral-600 focus-visible:border-primary focus-visible:ring-0 focus-visible:ring-offset-0 dark:bg-transparent"
        />
      </div>
      <div className="flex justify-end pt-2">
        <Button
          type="submit"
          className="font-sans h-[60px] max-h-[60px] rounded-none px-6 text-base font-medium uppercase tracking-normal"
        >
          POŠALJITE PORUKU
        </Button>
      </div>
    </form>
  );
}
