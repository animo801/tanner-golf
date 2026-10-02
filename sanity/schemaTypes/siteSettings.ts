import { CogIcon } from '@sanity/icons/Cog'
import { defineArrayMember, defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: CogIcon,
  groups: [
    { name: 'header', title: 'Header', default: true },
    { name: 'footer', title: 'Footer' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({ name: 'logo', title: 'Logo mark', type: 'imageWithAlt', group: 'header' }),
    defineField({
      name: 'logoText',
      title: 'Logo text',
      type: 'object',
      group: 'header',
      description: 'Shown next to the logo mark. The middle part is grey.',
      fields: [
        defineField({ name: 'prefix', title: 'Prefix', type: 'string' }),
        defineField({ name: 'highlight', title: 'Grey text', type: 'string' }),
        defineField({ name: 'suffix', title: 'Suffix', type: 'string' }),
      ],
    }),
    defineField({
      name: 'menuLabel',
      title: 'Menu button label',
      type: 'string',
      group: 'header',
      description: 'Read by screen readers for the menu button.',
    }),
    defineField({
      name: 'navMenus',
      title: 'Menu',
      type: 'array',
      group: 'header',
      description: 'Each item is a dropdown in the header (e.g. 2026, 2027).',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'navMenu',
          fields: [
            defineField({ name: 'label', type: 'string', validation: (r) => r.required() }),
            defineField({
              name: 'links',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'object',
                  name: 'navLink',
                  fields: [
                    defineField({ name: 'label', type: 'string', validation: (r) => r.required() }),
                    defineField({
                      name: 'href',
                      title: 'Link',
                      type: 'string',
                      description: 'A path like /2026/course, a section like /#faq, or a full URL.',
                      validation: (r) => r.required(),
                    }),
                  ],
                  preview: { select: { title: 'label', subtitle: 'href' } },
                }),
              ],
            }),
            defineField({
              name: 'emptyText',
              title: 'Text when there are no links',
              type: 'string',
              description: 'e.g. "Details coming soon"',
            }),
          ],
          preview: { select: { title: 'label', links: 'links' }, prepare: ({ title, links }) => ({ title, subtitle: `${links?.length ?? 0} links` }) },
        }),
      ],
    }),
    defineField({
      name: 'footerText',
      title: 'Copyright text',
      type: 'string',
      group: 'footer',
      description: 'Shown after "© <year>". The footer links are the same as the header menu.',
    }),
    defineField({ name: 'siteTitle', title: 'Site title', type: 'string', group: 'seo' }),
    defineField({ name: 'siteDescription', title: 'Site description', type: 'text', rows: 3, group: 'seo' }),
  ],
  preview: { prepare: () => ({ title: 'Site Settings' }) },
})
