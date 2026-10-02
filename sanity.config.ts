'use client'

import { defineConfig } from 'sanity'
import { structureTool, type StructureBuilder } from 'sanity/structure'
import { presentationTool } from 'sanity/presentation'
import { visionTool } from '@sanity/vision'
import { apiVersion, dataset, projectId } from './sanity/env'
import { schemaTypes, singletonTypes } from './sanity/schemaTypes'
import { seasonPageTypes } from './sanity/seasonPages'
import { CalendarIcon } from '@sanity/icons/Calendar'

const seasonTypeNames = seasonPageTypes.map((t) => t.name)

const singleton = (S: StructureBuilder, type: string, title: string) =>
  S.listItem().title(title).id(type).child(S.document().schemaType(type).documentId(type))

export default defineConfig({
  name: 'tanner-golf',
  title: 'The Real Estate Invitational',
  basePath: '/studio',
  projectId,
  dataset,
  schema: {
    types: schemaTypes,
    // Singletons can't be created from the "new document" menu
    templates: (templates) => templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },
  document: {
    actions: (actions, { schemaType }) =>
      singletonTypes.has(schemaType)
        ? actions.filter(({ action }) => action && ['publish', 'discardChanges', 'restore'].includes(action))
        : actions,
  },
  plugins: [
    structureTool({
      structure: (S, { getClient }) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Pages')
              .child(
                S.list()
                  .title('Pages')
                  .items([singleton(S, 'homePage', 'Home'), singleton(S, 'waitlistPage', 'Waitlist')]),
              ),
            // One folder per tournament year, built from the years used on season pages
            S.listItem()
              .title('Tournament Years')
              .icon(CalendarIcon)
              .child(async () => {
                const years = await getClient({ apiVersion })
                  .fetch<number[]>(`array::unique(*[_type in $types && defined(year)].year) | order(@ desc)`, { types: seasonTypeNames })
                return S.list()
                  .title('Tournament Years')
                  .items(
                    years.map((year) =>
                      S.listItem()
                        .id(`year-${year}`)
                        .title(String(year))
                        .icon(CalendarIcon)
                        .child(
                          S.documentList()
                            .title(`${year} Pages`)
                            .filter('_type in $types && year == $year')
                            .params({ types: seasonTypeNames, year })
                            .apiVersion(apiVersion),
                        ),
                    ),
                  )
              }),
            S.listItem()
              .title('All Season Pages')
              .child(
                S.list()
                  .title('Season Pages')
                  .items(seasonPageTypes.map(({ name, title }) => S.documentTypeListItem(name).title(title))),
              ),
            S.documentTypeListItem('waitlistEntry').title('Waitlist Sign-ups'),
            S.divider(),
            singleton(S, 'siteSettings', 'Site Settings'),
          ]),
    }),
    presentationTool({
      previewUrl: { previewMode: { enable: '/api/draft-mode/enable' } },
      resolve: {
        locations: {
          waitlistPage: {
            select: { title: '_type' },
            resolve: () => ({ locations: [{ title: 'Waitlist', href: '/waitlist' }] }),
          },
          homePage: {
            select: { title: '_type' },
            resolve: () => ({ locations: [{ title: 'Home', href: '/' }] }),
          },
          ...Object.fromEntries(
            seasonPageTypes.map(({ name, path }) => [
              name,
              {
                select: { title: 'title', year: 'year' },
                resolve: (doc: { title?: string; year?: number } | null) => ({
                  locations: doc?.year ? [{ title: doc.title || name, href: `/${doc.year}/${path}` }] : [],
                }),
              },
            ]),
          ),
        },
      },
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
})
