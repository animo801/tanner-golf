import { ClipboardIcon } from '@sanity/icons/Clipboard'
import { EnvelopeIcon } from '@sanity/icons/Envelope'
import { defineField, defineType } from 'sanity'

export const waitlistPage = defineType({
  name: 'waitlistPage',
  title: 'Waitlist',
  type: 'document',
  icon: ClipboardIcon,
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'form', title: 'Form' },
  ],
  fields: [
    defineField({ name: 'title', type: 'string', group: 'content', description: 'Used for the browser tab.' }),
    defineField({ name: 'eyebrow', title: 'Small heading', type: 'string', group: 'content' }),
    defineField({ name: 'heading', type: 'string', group: 'content' }),
    defineField({ name: 'intro', type: 'text', rows: 4, group: 'content' }),
    defineField({
      name: 'form',
      type: 'object',
      group: 'form',
      fields: [
        defineField({ name: 'firstNameLabel', title: 'First name label', type: 'string' }),
        defineField({ name: 'lastNameLabel', title: 'Last name label', type: 'string' }),
        defineField({ name: 'emailLabel', title: 'Email label', type: 'string' }),
        defineField({ name: 'phoneLabel', title: 'Phone label', type: 'string' }),
        defineField({ name: 'companyLabel', title: 'Brokerage / company label', type: 'string' }),
        defineField({ name: 'messageLabel', title: 'Message label', type: 'string' }),
        defineField({ name: 'optionalText', title: '"Optional" tag', type: 'string', description: 'Shown next to optional fields.' }),
        defineField({ name: 'submitLabel', title: 'Button text', type: 'string' }),
        defineField({ name: 'submittingLabel', title: 'Button text while sending', type: 'string' }),
        defineField({ name: 'successHeading', title: 'Success heading', type: 'string' }),
        defineField({ name: 'successMessage', title: 'Success message', type: 'text', rows: 3 }),
        defineField({ name: 'requiredError', title: 'Missing fields error', type: 'string' }),
        defineField({ name: 'emailError', title: 'Invalid email error', type: 'string' }),
        defineField({ name: 'genericError', title: 'Something went wrong error', type: 'string' }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: 'Waitlist' }) },
})

// Created by the website when someone submits the waitlist form
export const waitlistEntry = defineType({
  name: 'waitlistEntry',
  title: 'Waitlist Sign-up',
  type: 'document',
  icon: EnvelopeIcon,
  readOnly: true,
  fields: [
    defineField({ name: 'firstName', type: 'string' }),
    defineField({ name: 'lastName', type: 'string' }),
    defineField({ name: 'email', type: 'string' }),
    defineField({ name: 'phone', type: 'string' }),
    defineField({ name: 'company', title: 'Brokerage / company', type: 'string' }),
    defineField({ name: 'message', type: 'text' }),
    defineField({ name: 'submittedAt', type: 'datetime' }),
  ],
  orderings: [{ title: 'Newest first', name: 'submittedAtDesc', by: [{ field: 'submittedAt', direction: 'desc' }] }],
  preview: {
    select: { first: 'firstName', last: 'lastName', email: 'email', date: 'submittedAt' },
    prepare: ({ first, last, email, date }) => ({
      title: [first, last].filter(Boolean).join(' ') || email,
      subtitle: [email, date && new Date(date).toLocaleDateString()].filter(Boolean).join(' · '),
    }),
  },
})
