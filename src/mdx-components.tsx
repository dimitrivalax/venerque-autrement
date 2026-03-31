import type { MDXComponents } from 'mdx/types'

const components = {
  h2: ({ children }) => <h2 className='text-foreground mt-16 mb-4 scroll-mt-20 text-2xl font-semibold'>{children}</h2>,
  h3: ({ children }) => <h3 className='text-foreground mb-4 scroll-mt-20 text-xl font-medium'>{children}</h3>,
  p: ({ children }) => <p className='text-muted-foreground mb-4 leading-relaxed'>{children}</p>,
  ul: ({ children }) => <ul className='mb-4 list-inside list-disc space-y-2 pl-2'>{children}</ul>,
  li: ({ children }) => <li className='text-muted-foreground leading-relaxed'>{children}</li>,
  strong: ({ children }) => <strong className='text-foreground font-semibold'>{children}</strong>,
  hr: () => <hr className='border-border my-10' />,
  blockquote: ({ children }) => (
    <blockquote className='border-primary/40 text-foreground my-6 border-l-4 pl-4 italic'>{children}</blockquote>
  )
} satisfies MDXComponents

export function useMDXComponents(): MDXComponents {
  return components
}
