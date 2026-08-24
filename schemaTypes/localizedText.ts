import {defineField, defineType} from 'sanity'

export const localizedText = defineType({
  name: 'localizedText',
  title: 'Localized Text',
  type: 'object',
  fields: [
    defineField({
      name: 'en',
      title: 'English',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'ar',
      title: 'Arabic',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required(),
    }),
  ],
})
