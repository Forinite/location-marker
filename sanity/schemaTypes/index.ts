// sanity/schemaTypes/index.ts:1
import { type SchemaTypeDefinition } from 'sanity'
import {restaurant} from "@/sanity/schemaTypes/restautrants";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    restaurant
  ],
}
