import {defineArrayMember, defineField, defineType} from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'businessName',
      title: 'Business Name',
      type: 'localizedString',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'localizedImage',
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Business Email',
      type: 'string',
      validation: (rule) => rule.email().warning('Enter a valid email address.'),
    }),
    defineField({
      name: 'whatsappNumber',
      title: 'WhatsApp Number',
      type: 'string',
      description: 'Digits only, including country code; for example 201234567890.',
      validation: (rule) =>
        rule.regex(/^\d{8,15}$/).warning('Use 8–15 digits without a plus sign.'),
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'localizedText',
    }),
    defineField({
      name: 'sinceYear',
      title: 'Established Year',
      type: 'number',
      initialValue: 1997,
      validation: (rule) => rule.integer().min(1900).max(new Date().getFullYear()),
    }),
    defineField({
      name: 'socials',
      title: 'Social Links',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'socialLink',
          title: 'Social Link',
          type: 'object',
          fields: [
            defineField({
              name: 'platform',
              title: 'Platform',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {title: 'platform', subtitle: 'url'},
          },
        }),
      ],
    }),
  ],
})
