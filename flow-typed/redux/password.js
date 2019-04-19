// @flow strict

declare type PasswordPersist = {|
  +internalKey: ?EncryptedData,
  +hint: string,
|}

declare type PasswordState = {|
  +persist: PasswordPersist,
|}
