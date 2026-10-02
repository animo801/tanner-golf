import { DocumentIcon } from '@sanity/icons/Document'
import { ImageIcon } from '@sanity/icons/Image'
import { PinIcon } from '@sanity/icons/Pin'
import { TagIcon } from '@sanity/icons/Tag'
import { UsersIcon } from '@sanity/icons/Users'
import type { ComponentType } from 'react'
import { defineArrayMember, defineField, defineType, type FieldDefinition } from 'sanity'
import { seasonPageTypes } from '../seasonPages'

type SeasonPageName = (typeof seasonPageTypes)[number]['name']

const icons: Record<SeasonPageName, ComponentType> = {
  coursePage: PinIcon,
  eventPhotosPage: ImageIcon,
  swagPage: TagIcon,
  playerBiosPage: UsersIcon,
  resultsPage: DocumentIcon,
}

const introField = defineField({ name: 'intro', type: 'text', rows: 4 })

// Pages with a finished design get their own fields; the rest use the placeholder intro.
const pageFields: Partial<Record<SeasonPageName, FieldDefinition[]>> = {
  coursePage: [
    defineField({
      name: 'hero',
      type: 'object',
      fields: [
        defineField({ name: 'eyebrow', title: 'Small heading', type: 'string', description: 'e.g. "2026 Course"' }),
        defineField({ name: 'heading', type: 'string', description: 'The course name' }),
        defineField({
          name: 'video',
          type: 'file',
          description: 'MP4, plays muted on a loop. Keep it short and compressed (ideally under 15 MB).',
          options: { accept: 'video/mp4,video/webm' },
        }),
        defineField({
          name: 'poster',
          title: 'Poster image',
          type: 'imageWithAlt',
          description: 'Shown while the video loads, or instead of it if there is no video.',
        }),
      ],
    }),
    defineField({
      name: 'about',
      type: 'object',
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
              marks: { decorators: [{ title: 'Bold', value: 'strong' }, { title: 'Italic', value: 'em' }] },
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'details',
      title: 'Course details',
      type: 'object',
      fields: [
        defineField({ name: 'heading', type: 'string' }),
        defineField({ name: 'items', title: 'Bullet points', type: 'array', of: [defineArrayMember({ type: 'string' })] }),
      ],
    }),
    defineField({
      name: 'photos',
      type: 'object',
      fields: [
        defineField({ name: 'heading', type: 'string' }),
        defineField({ name: 'images', type: 'array', of: [defineArrayMember({ type: 'imageWithAlt' })], options: { layout: 'grid' } }),
      ],
    }),
  ],
  eventPhotosPage: [
    defineField({ name: 'eyebrow', title: 'Small heading', type: 'string', description: 'e.g. "2026"' }),
    defineField({ name: 'heading', type: 'string' }),
    defineField({
      name: 'photos',
      type: 'array',
      description: 'Drag to reorder. Visitors can tap any photo to view them full screen.',
      of: [defineArrayMember({ type: 'imageWithAlt' })],
      options: { layout: 'grid' },
    }),
  ],
  swagPage: [
    defineField({ name: 'eyebrow', title: 'Small heading', type: 'string', description: 'e.g. "2026"' }),
    defineField({ name: 'heading', type: 'string' }),
    defineField({ name: 'image', type: 'imageWithAlt' }),
    defineField({
      name: 'body',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }],
          lists: [{ title: 'Bullet', value: 'bullet' }],
          marks: { decorators: [{ title: 'Bold', value: 'strong' }, { title: 'Italic', value: 'em' }] },
        }),
      ],
    }),
  ],
  playerBiosPage: [
    defineField({ name: 'eyebrow', title: 'Small heading', type: 'string', description: 'e.g. "2026"' }),
    defineField({ name: 'heading', type: 'string' }),
    defineField({
      name: 'teams',
      type: 'array',
      description: 'Each team is a tab on the page.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'team',
          fields: [
            defineField({ name: 'name', type: 'string', validation: (r) => r.required() }),
            defineField({
              name: 'players',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'object',
                  name: 'player',
                  fields: [
                    defineField({ name: 'name', type: 'string', validation: (r) => r.required() }),
                    defineField({ name: 'photo', type: 'imageWithAlt' }),
                    defineField({ name: 'role', title: 'Role / company', type: 'string', description: 'Shown under their name in the bio.' }),
                    defineField({
                      name: 'bio',
                      type: 'array',
                      description: 'Opens in a pop-up when visitors tap the player.',
                      of: [
                        defineArrayMember({
                          type: 'block',
                          styles: [{ title: 'Normal', value: 'normal' }],
                          lists: [],
                          marks: { decorators: [{ title: 'Bold', value: 'strong' }, { title: 'Italic', value: 'em' }] },
                        }),
                      ],
                    }),
                  ],
                  preview: { select: { title: 'name', media: 'photo' } },
                }),
              ],
            }),
          ],
          preview: {
            select: { title: 'name', players: 'players' },
            prepare: ({ title, players }) => ({ title, subtitle: `${players?.length ?? 0} players` }),
          },
        }),
      ],
    }),
  ],
}

const defineSeasonPage = (name: SeasonPageName, title: string) =>
  defineType({
    name,
    title,
    type: 'document',
    icon: icons[name],
    fields: [
      defineField({
        name: 'year',
        type: 'number',
        description: 'Tournament year, e.g. 2026. Sets the page URL.',
        validation: (r) => r.required().integer().min(2000).max(2100),
      }),
      defineField({ name: 'title', type: 'string', description: 'Used for the browser tab.', validation: (r) => r.required() }),
      ...(pageFields[name] ?? [introField]),
    ],
    preview: {
      select: { title: 'title', year: 'year' },
      prepare: ({ title, year }) => ({ title, subtitle: year ? String(year) : 'No year set' }),
    },
  })

export const seasonPageSchemas = seasonPageTypes.map(({ name, title }) => defineSeasonPage(name, title))
