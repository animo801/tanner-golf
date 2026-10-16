import type { WaitlistPage } from './types'

export const waitlist: WaitlistPage = {
  title: 'Join the Waitlist',
  eyebrow: '2027',
  heading: 'Join the waitlist',
  intro:
    "Spots are limited. Add your name and we'll reach out as soon as registration opens for next year's tournament.",
  form: {
    firstNameLabel: 'First name',
    lastNameLabel: 'Last name',
    emailLabel: 'Email',
    phoneLabel: 'Phone',
    companyLabel: 'Brokerage / company',
    messageLabel: 'Anything we should know?',
    optionalText: '(optional)',
    submitLabel: 'Join the waitlist',
    submittingLabel: 'Sending…',
    successHeading: "You're on the list",
    successMessage: "Thanks for signing up. We'll be in touch when registration opens.",
    requiredError: 'Please fill in your first name, last name, and email.',
    emailError: 'Please enter a valid email address.',
    genericError: 'Something went wrong. Please try again in a moment.',
  },
}
