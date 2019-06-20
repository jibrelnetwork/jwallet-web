declare type UserState = {|
  persist: {|
    +isIntroductionPassed: boolean,
    +agreementsConditions: {
      understandPrivateDataPolicy?: boolean,
      consentNoWarranty?: boolean,
      consentTrackingCookies?: boolean,
      acceptTermsAndConditions?: boolean,
    },
    +isAgreementsConfirmed?: boolean,
  |},
|}
