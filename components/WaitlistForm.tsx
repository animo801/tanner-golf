'use client'

import { useActionState } from 'react'
import { joinWaitlist, type WaitlistState } from '@/app/(site)/waitlist/actions'
import type { WaitlistPageQueryResult } from '@/sanity/types'

type FormCopy = NonNullable<NonNullable<WaitlistPageQueryResult>['form']>

const inputClass =
  'mt-2 block w-full rounded-lg border border-rule bg-white px-4 py-3 text-[18px] leading-[28px] text-ink outline-none transition-colors focus:border-forest focus:ring-2 focus:ring-forest/20'

export default function WaitlistForm({ copy }: { copy: FormCopy | null | undefined }) {
  const [state, action, pending] = useActionState<WaitlistState, FormData>(joinWaitlist, { status: 'idle' })

  if (state.status === 'success') {
    return (
      <div role="status" className="rounded-[8.673px] bg-forest px-6 py-12 text-white md:rounded-xl md:px-12 md:py-16">
        {copy?.successHeading && (
          <h2 className="text-[28px] leading-[32px] font-semibold uppercase md:text-[40px] md:leading-[44px]">{copy.successHeading}</h2>
        )}
        {copy?.successMessage && (
          <p className="mt-4 max-w-[560px] text-[18px] leading-[28px] whitespace-pre-line md:text-[20px] md:leading-[32px]">
            {copy.successMessage}
          </p>
        )}
      </div>
    )
  }

  const errorText = state.error && copy?.[`${state.error}Error` as const]
  const v = state.values

  return (
    <form action={action} className="grid gap-5 md:grid-cols-2 md:gap-x-4 md:gap-y-6">
      <Field label={copy?.firstNameLabel} name="firstName" defaultValue={v?.firstName} autoComplete="given-name" required />
      <Field label={copy?.lastNameLabel} name="lastName" defaultValue={v?.lastName} autoComplete="family-name" required />
      <Field label={copy?.emailLabel} name="email" defaultValue={v?.email} type="email" autoComplete="email" required />
      <Field label={copy?.phoneLabel} name="phone" defaultValue={v?.phone} type="tel" autoComplete="tel" optionalText={copy?.optionalText} />
      <Field
        label={copy?.companyLabel}
        name="company" defaultValue={v?.company}
        autoComplete="organization"
        optionalText={copy?.optionalText}
        className="md:col-span-2"
      />
      <label className="block md:col-span-2">
        <LabelText label={copy?.messageLabel} optionalText={copy?.optionalText} />
        <textarea name="message" defaultValue={v?.message} rows={4} maxLength={2000} className={inputClass} />
      </label>

      {/* Honeypot for bots, hidden from people and screen readers */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

      <div className="flex flex-col gap-4 md:col-span-2 md:flex-row md:items-center">
        <button
          type="submit"
          disabled={pending}
          className="h-[52px] cursor-pointer bg-forest px-10 text-[16px] font-semibold text-white uppercase transition-colors hover:bg-[#123d1e] disabled:cursor-wait disabled:opacity-70"
        >
          {pending ? copy?.submittingLabel : copy?.submitLabel}
        </button>
        {errorText && (
          <p role="alert" className="text-[16px] leading-[24px] text-[#b42318]">
            {errorText}
          </p>
        )}
      </div>
    </form>
  )
}

function LabelText({ label, optionalText }: { label?: string | null; optionalText?: string | null }) {
  return (
    <span className="text-[16px] leading-[24px] font-medium text-ink">
      {label} {optionalText && <span className="font-normal text-ink/50">{optionalText}</span>}
    </span>
  )
}

function Field({
  label,
  optionalText,
  className,
  ...input
}: {
  label?: string | null
  optionalText?: string | null
  className?: string
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className={`block ${className ?? ''}`}>
      <LabelText label={label} optionalText={input.required ? null : optionalText} />
      <input type="text" maxLength={200} className={inputClass} {...input} />
    </label>
  )
}
