// @flow

type Themes = 'white'

export type JLinkProps = {
  theme?: Themes,
  className?: string,
  activeClassName?: string,
  +children: React$Node,
  +href: string,
}

export type JLinkInternalProps = JLinkProps & {
  router: Object,
}
