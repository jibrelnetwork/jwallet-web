declare type UserState = {|
  persist: {|
    +isIntroductionPassed: boolean,
    +isAgreementsPassed: boolean,
  |},
|}
