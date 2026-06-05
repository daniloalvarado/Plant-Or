import { createClient } from '@sanity/client'
import { createImageUrlBuilder } from '@sanity/image-url'

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || '9m09a5ng'
const dataset = import.meta.env.VITE_SANITY_DATASET || 'production'
const token = import.meta.env.VITE_SANITY_TOKEN

export const client = createClient({
  projectId,
  dataset,
  useCdn: false,
  apiVersion: '2024-03-28',
  token,
})

const builder = createImageUrlBuilder(client)

export function urlForImage(source: any) {
  return builder.image(source)
}

export function urlFor(source: any): string {
  if (!source?.asset) return ''
  try {
    return builder.image(source).url()
  } catch {
    // Fallback manual para assets con _ref
    if (source?.asset?._ref) {
      const ref = source.asset._ref
      const [, id, dimensions, format] = ref.split('-')
      return `https://cdn.sanity.io/images/${projectId}/${dataset}/${id}-${dimensions}.${format}`
    }
    return ''
  }
}
