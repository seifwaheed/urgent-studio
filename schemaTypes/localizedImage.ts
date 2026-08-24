import {defineField, defineType} from 'sanity'

export const localizedImage = defineType({
  name: 'localizedImage',
  title: 'Localized Image',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'alt',
      title: 'Alternative Text',
      type: 'localizedString',
      description: 'Describe the image for visitors who cannot see it.',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'alt.en',
      subtitle: 'alt.ar',
      media: 'image',
    },
  },
})
