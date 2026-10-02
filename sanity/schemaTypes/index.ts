import { homePage } from './homePage'
import { imageWithAlt } from './imageWithAlt'
import { seasonPageSchemas } from './seasonPages'
import { siteSettings } from './siteSettings'
import { waitlistEntry, waitlistPage } from './waitlist'

export const schemaTypes = [imageWithAlt, homePage, siteSettings, ...seasonPageSchemas, waitlistPage, waitlistEntry]

export const singletonTypes = new Set(['homePage', 'siteSettings', 'waitlistPage'])
