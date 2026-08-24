import {defineArrayMember, defineField, defineType} from 'sanity'

export const product = defineType({
  name: 'product',
  title: 'Product',
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
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{type: 'category'}],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [defineArrayMember({type: 'localizedImage'})],
      validation: (rule) => rule.min(1).warning('Add at least one product image.'),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'localizedText',
    }),
    defineField({
      name: 'specifications',
      title: 'Specifications',
      type: 'array',
      of: [defineArrayMember({type: 'specification'})],
    }),
    defineField({
      name: 'sku',
      title: 'SKU',
      type: 'string',
      description: 'Optional for now. Add the official SKU when it is available.',
    }),
    defineField({
      name: 'price',
      title: 'Price (EGP)',
      type: 'number',
      description: 'Optional. Leave empty to request a price by WhatsApp.',
      validation: (rule) => rule.min(0),
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'name.en',
      subtitle: 'sku',
      media: 'images.0.image',
    },
  },
})
