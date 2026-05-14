"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const fieldClass =
  "font-sans h-auto min-h-0 rounded-none border-0 border-b border-neutral-600 bg-transparent px-0 py-0 pb-1 text-sm leading-5 text-neutral-50 shadow-none placeholder:text-neutral-600 focus-visible:border-primary focus-visible:ring-0 focus-visible:ring-offset-0 dark:bg-transparent";

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
        <p className="font-heading text-lg font-semibold text-white">
          Hvala vam na poruci.
        </p>
        <p className="mt-2 text-sm text-neutral-600">
          Naš tim će vas kontaktirati u najkraćem roku sa predlogom sledećih
          koraka.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="mx-auto flex w-full max-w-[450px] flex-col gap-10 lg:ml-auto lg:gap-[47px]">
        <div className="grid w-full grid-cols-1 gap-x-[39px] gap-y-10 lg:ml-20 lg:grid-cols-2 lg:gap-y-[47px]">
          <div className="flex flex-col gap-6 lg:gap-[39px]">
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
          <div className="flex flex-col gap-6 lg:gap-[39px]">
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
          <div className="flex flex-col gap-6 lg:gap-[39px]">
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
          <div className="flex flex-col gap-6 lg:gap-[39px]">
            <label htmlFor="phone" className={labelClass}>
              Broj telefona
            </label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              placeholder="+381 01 234 56 78"
              className={fieldClass}
            />
          </div>
        </div>

        <div className="flex w-full flex-col gap-[10px] lg:ml-20">
          <label htmlFor="message" className={labelClass}>
            Poruka
          </label>
          <Textarea
            id="message"
            name="message"
            required
            rows={3}
            placeholder="Unesite Vašu poruku..."
            className="font-sans min-h-[72px] resize-y rounded-none border-0 border-b border-neutral-600 bg-transparent px-0 py-0 pb-1 text-sm font-normal leading-5 text-neutral-50 shadow-none placeholder:text-neutral-600 focus-visible:border-primary focus-visible:ring-0 focus-visible:ring-offset-0 dark:bg-transparent"
          />
        </div>

        <div className="relative w-full overflow-visible pb-12 max-lg:pb-14 lg:mt-0 lg:pb-0 lg:flex lg:justify-end">
          <div className="relative w-full lg:inline-block lg:w-auto">
            <Button
              type="submit"
              className="relative z-0 font-sans h-[60px] max-h-[60px] w-full rounded-none px-4 text-base font-medium uppercase tracking-normal lg:w-auto"
            >
              POŠALJITE PORUKU
            </Button>
            <Image
              src="/illustrations/letter_send.png"
              alt=""
              width={132}
              height={98}
              sizes="132px"
              className="pointer-events-none absolute bottom-[-4rem] left-[40%] z-[1] h-[98px] w-[132px] max-w-none -translate-x-1/2 translate-y-[10px] select-none lg:hidden"
              aria-hidden
            />
          </div>
        </div>
      </div>
    </form>
  );
}
