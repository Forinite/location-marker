// schemas/restaurant.ts   (or wherever you keep your schema types)

import { defineField, defineType } from 'sanity'

export const restaurant = defineType({
    name: 'restaurant',
    title: 'Restaurant',
    type: 'document',

    fields: [
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
            validation: (Rule) => Rule.required().min(2).max(120),
            // Optional: add more rules like .error('Name is required')
        }),

        defineField({
            name: 'latitude',
            title: 'Latitude',
            type: 'number',
            validation: (Rule) =>
                Rule.required()
                    .min(-90)
                    .max(90)
                    .error('Latitude must be between -90 and 90'),
        }),

        defineField({
            name: 'longitude',
            title: 'Longitude',
            type: 'number',
            validation: (Rule) =>
                Rule.required()
                    .min(-180)
                    .max(180)
                    .error('Longitude must be between -180 and 180'),
        }),

        defineField({
            name: 'icon',
            title: 'Icon Image',
            type: 'image',
            options: {
                hotspot: true, // allows cropping/focusing in Studio
            },
            // Optional: add fields like alt text
            fields: [
                defineField({
                    name: 'alt',
                    type: 'string',
                    title: 'Alternative text',
                    description: 'Describe the image for accessibility',
                    validation: (Rule) => Rule.required(),
                }),
            ],
        }),
    ],

    // Optional: better preview in Sanity Studio desk / list view
    preview: {
        select: {
            title: 'name',
            media: 'icon',
        },
        prepare({ title, media }) {
            return {
                title: title || 'Unnamed Restaurant',
                media,
            }
        },
    },
})