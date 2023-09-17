export enum pageType {
  util = "util",
  image = "image",
  game = "game",
  blog = "blog",
}

export type pageInfo = {
  title: string
  description: string
  path: string
  type: pageType
}
