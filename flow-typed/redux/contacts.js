// @flow

declare type ContactId = OwnerAddress // It's just address yet

declare type Contact = {|
  id: ContactId,
  address: string,
  name: string,
  note: string,
  avatar?: string, // url/base64 ?
|}

declare type ContactsState = {|
  persist: {|
    items: {|
      [id: ContactId]: Contact,
    |},
  |},
|}
