import {defineField, defineType} from 'sanity'

export const localizedString = defineType({
  name: 'localizedString',
  title: 'Localized String',
  type: 'object',
  options: {columns: 2},
  fields: [
    defineField({
      name: 'en',
      title: 'English',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'ar',
      title: 'Arabic',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
  ],
})
