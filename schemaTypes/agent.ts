import {defineField, defineType} from 'sanity'

export const agent = defineType({
  name: 'agent',
  title: 'Agent',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
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
      name: 'role',
      title: 'Role',
      type: 'localizedString',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'localizedImage',
      description: 'Optional. Add a photo and its English and Arabic alternative text when available.',
    }),
    defineField({
      name: 'bio',
      title: 'Short Bio',
      type: 'localizedText',
    }),
    defineField({
      name: 'quote',
      title: 'Personal Quote',
      type: 'localizedText',
      description: 'A short first-person or personal line shown on the Meet the Team page.',
    }),
    defineField({
      name: 'linkedIn',
      title: 'LinkedIn URL',
      type: 'url',
      validation: (rule) => rule.uri({scheme: ['https']}),
    }),
    defineField({
      name: 'symbol',
      title: 'Role Symbol',
      type: 'string',
      description: 'A small office-supply symbol used as a visual accent on the Meet the Team page.',
      options: {
        list: [
          {title: 'Pen', value: 'pen'},
          {title: 'Notebook', value: 'notebook'},
          {title: 'Calculator', value: 'calculator'},
          {title: 'Keyboard', value: 'keyboard'},
          {title: 'Folder', value: 'folder'},
          {title: 'Paper clip', value: 'paperclip'},
        ],
      },
      initialValue: 'paperclip',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (rule) => rule.email(),
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first.',
      initialValue: 0,
      validation: (rule) => rule.integer().min(0),
    }),
  ],
  preview: {
    select: {title: 'name.en', subtitle: 'role.en', media: 'photo.image'},
  },
  orderings: [
    {
      title: 'Display order',
      name: 'displayOrderAsc',
      by: [{field: 'displayOrder', direction: 'asc'}],
    },
  ],
})
