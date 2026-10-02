import { HomeIcon } from '@sanity/icons/Home'
import { defineArrayMember, defineField, defineType } from 'sanity'

export const homePage = defineType({
  name: 'homePage',
  title: 'Home',
  type: 'document',
  icon: HomeIcon,
  groups: [
    { name: 'hero', title: 'Hero', default: true },
    { name: 'about', title: 'About' },
    { name: 'faq', title: 'FAQ' },
    { name: 'testimonials', title: 'Testimonials' },
  ],
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'object',
      group: 'hero',
      fields: [
        defineField({ name: 'heading', type: 'text', rows: 2 }),
        defineField({
          name: 'image',
          type: 'imageWithAlt',
          description: 'Wide landscape photo. The top of the image sits behind the heading.',
        }),
      ],
    }),
    defineField({
      name: 'about',
      title: 'About the tournament',
      type: 'object',
      group: 'about',
      fields: [
        defineField({ name: 'heading', type: 'string' }),
        defineField({
          name: 'body',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'block',
              styles: [{ title: 'Normal', value: 'normal' }],
              lists: [],
              marks: {
                decorators: [
                  { title: 'Bold', value: 'strong' },
                  { title: 'Italic', value: 'em' },
                ],
              },
            }),
          ],
        }),
        defineField({
          name: 'images',
          type: 'array',
          description: 'Two photos shown beside the text.',
          of: [defineArrayMember({ type: 'imageWithAlt' })],
          validation: (r) => r.max(2),
        }),
      ],
    }),
    defineField({
      name: 'faq',
      title: 'FAQ',
      type: 'object',
      group: 'faq',
      fields: [
        defineField({ name: 'heading', type: 'string' }),
        defineField({
          name: 'items',
          title: 'Questions',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              name: 'faqItem',
              fields: [
                defineField({ name: 'question', type: 'string', validation: (r) => r.required() }),
                defineField({ name: 'answer', type: 'text', rows: 4 }),
              ],
              preview: { select: { title: 'question', subtitle: 'answer' } },
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'testimonials',
      title: 'Testimonials',
      type: 'object',
      group: 'testimonials',
      fields: [
        defineField({ name: 'heading', type: 'string' }),
        defineField({
          name: 'items',
          title: 'Testimonials',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              name: 'testimonial',
              fields: [
                defineField({ name: 'quote', type: 'text', rows: 4, validation: (r) => r.required() }),
                defineField({ name: 'name', type: 'string' }),
                defineField({ name: 'role', title: 'Role / company', type: 'string' }),
                defineField({ name: 'photo', type: 'imageWithAlt' }),
              ],
              preview: { select: { title: 'name', subtitle: 'quote', media: 'photo' } },
            }),
          ],
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: 'Home' }) },
})
