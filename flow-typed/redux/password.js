// @flow strict

declare type PasswordPersistV1 = {|
  +internalKey: ?EncryptedData,
  +hint: string,
  +salt: string,
|}

declare type PasswordPersist = PasswordPersistV1

declare type PasswordState = {|
  +persist: PasswordPersist,
|}
