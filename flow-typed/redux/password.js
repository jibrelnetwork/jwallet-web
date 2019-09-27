// @flow strict

declare type PasswordPersistV1 = {|
  +internalKey: ?EncryptedData,
  +hint: string,
  +salt: string,
  +version: 1,
|}

declare type PasswordPersist = PasswordPersistV1

declare type PasswordState = {|
  +persist: PasswordPersist,
|}
