// @flow strict

declare type PasswordPersist = {|
  +internalKey: ?EncryptedData,
  +hint: string,
  +salt: string,
|}

declare type PasswordState = {|
  +persist: PasswordPersist,
|}
