// @flow

declare type CommentId = string

declare type Comments = {
  [CommentId]: string,
}

declare type CommentsPersist = {|
  +items: Comments,
|}

declare type CommentsState = {|
  +persist: CommentsPersist,
  +isLoading: boolean,
|}
