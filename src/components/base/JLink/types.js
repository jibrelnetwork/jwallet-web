// @flow

type Theme = 'text-white' | 'text-blue'

export type JLinkProps = {
  theme?: Theme,
  className?: string,
  activeClassName?: string,
  +children: React$Node,
  +href: string,
}

export type JLinkInternalProps = JLinkProps & {
  router: Object,
}
