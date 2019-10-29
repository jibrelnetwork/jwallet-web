// @flow

declare type CommentId = string

declare type Comments = {
  [CommentId]: string,
}

declare type CommentsPersistV1 = {|
  +items: Comments,
|}

declare type CommentsPersist = CommentsPersistV1

declare type CommentsState = {|
  +persist: CommentsPersist,
|}
