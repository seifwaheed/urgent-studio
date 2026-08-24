import {defineField, defineType} from 'sanity'

export const category = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'localizedString',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: (document) => document.name?.en},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Category Image',
      type: 'localizedImage',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'localizedText',
    }),
  ],
  preview: {
    select: {
      title: 'name.en',
      subtitle: 'name.ar',
      media: 'icon.image',
    },
  },
})
