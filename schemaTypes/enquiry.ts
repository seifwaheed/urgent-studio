import {defineField, defineType} from 'sanity'

export const enquiry = defineType({
  name: 'enquiry',
  title: 'Customer Enquiry',
  type: 'document',
  fields: [
    defineField({name: 'firstName', title: 'First Name', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'lastName', title: 'Last Name', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'company', title: 'Company', type: 'string'}),
    defineField({name: 'phone', title: 'Phone', type: 'string'}),
    defineField({name: 'email', title: 'Email', type: 'string', validation: (rule) => rule.email()}),
    defineField({name: 'message', title: 'Request', type: 'text'}),
    defineField({name: 'locale', title: 'Language', type: 'string', options: {list: [{title: 'English', value: 'en'}, {title: 'Arabic', value: 'ar'}]}}),
    defineField({name: 'source', title: 'Source', type: 'string', initialValue: 'website contact form'}),
    defineField({name: 'submittedAt', title: 'Submitted At', type: 'datetime', validation: (rule) => rule.required()}),
    defineField({name: 'status', title: 'Status', type: 'string', initialValue: 'new', options: {list: [{title: 'New', value: 'new'}, {title: 'Contacted', value: 'contacted'}, {title: 'Closed', value: 'closed'}]}}),
  ],
  preview: {select: {title: 'firstName', subtitle: 'email', submittedAt: 'submittedAt'}, prepare: ({title, subtitle, submittedAt}) => ({title, subtitle: `${subtitle || 'No email'} · ${submittedAt ? new Date(submittedAt).toLocaleDateString() : ''}`})},
  orderings: [{title: 'Newest first', name: 'submittedAtDesc', by: [{field: 'submittedAt', direction: 'desc'}]}],
})
