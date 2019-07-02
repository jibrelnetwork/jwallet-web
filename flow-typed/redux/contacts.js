// @flow

declare type ContactId = OwnerAddress // It's just address yet

declare type Contact = {|
  id: ContactId,
  name: string,
  note: string,
  avatar?: string, // url/base64 ?
|}
