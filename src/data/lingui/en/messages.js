/* eslint-disable */module.exports={languageData:{"plurals":function(n,ord){var s=String(n).split("."),v0=!s[1],t0=Number(s[0])==n,n10=t0&&s[0].slice(-1),n100=t0&&s[0].slice(-2);if(ord)return n10==1&&n100!=11?"one":n10==2&&n100!=12?"two":n10==3&&n100!=13?"few":"other";return n==1&&v0?"one":"other"}},messages:{"Agreements.acceptTermsAndConditions":"I have read and accepted <0>Terms of Use</0> and <1>Privacy Policy</1>","Agreements.action.submit":"Confirm and continue","Agreements.consentNoWarranty":"I consent that Jwallet service is provided as is without warranty. Jibrel AG does not have access to my private information and could not participate in resolution of issues concerning money loss of any kind","Agreements.consentTrackingCookies":"I consent to allow cookies for collecting anonymous usage data to improve quality of provided service","Agreements.title":"Terms and Conditions","Agreements.understandPrivateDataPolicy":"I understand that my funds are stored securely on my personal computer. No private data is sent to Jibrel AG servers. All encryption is done locally in browser","AssetItemEdit.addressLabel":"Address (ERC-20)","AssetItemEdit.decimalsLabel":"Decimals","AssetItemEdit.nameLabel":"Name","AssetItemEdit.symbolLabel":"Symbol","AssetItemLegacy.delete":"Delete","AssetItemLegacy.delete.no":"No","AssetItemLegacy.delete.yes":"Yes, delete","AssetItemLegacy.edit":"Edit","AssetsItemAdd.errors.assetNotCompatible":"This asset is not ERC20 compatible","AssetsItemAdd.errors.decimals":"Digital asset decimals should be a number between 0...127","AssetsItemAdd.errors.decimalsInvalid":"Digital asset decimals should be a number between 0...127","AssetsItemAdd.errors.emptyName":"Valid digital asset name is required","AssetsItemAdd.errors.exists":"This asset already exists","AssetsItemAdd.errors.invalidAddress":"Invalid ERC-20 contract address","AssetsItemAdd.errors.nameInvalid":"Valid digital asset name is required","AssetsItemAdd.errors.noConnection":"Network connection error","AssetsItemAdd.errors.notfound":"Asset not found","AssetsItemAdd.errors.symbolInvalid":"Valid digital asset symbol is required","AssetsItemAdd.errors.symbolLength":"Valid digital asset symbol is required","AssetsItemAdd.errors.waitForValidation":"Please wait for asset validity check","AssetsItemAdd.primaryButon.title":"Add asset","AssetsItemAdd.title":"Add digital asset","AssetsItemEdit.submit":"Save","AssetsItemEdit.title":"Edit digital asset","AssetsManage.add":"Add asset","AssetsManage.close":"Close","AssetsManage.title":"Assets manager","Contacts.actions.add":"Add Contact","Contacts.empty":"Your contacts will be displayed here. You can add a first one now!.","Contacts.errors.aadressNameDuplicate":"There is address with such name","Contacts.errors.addressDuplicate":"Favorite with this address already exists","Contacts.errors.addressInvalid":"Please input valid address","Contacts.errors.descriptionInvalid":"Description length should be at least 2 symbols","Contacts.errors.nameDuplicate":"Favorite with this name already exists","Contacts.errors.nameInvalid":"Name length should be at least 2 symbols","Contacts.errors.walletNameDuplicate":"There is wallet with such name","Contacts.title":"Contacts","ContactsItem.actions.send":"Send to Address","ContactsItemAdd.actions.save":"Save","ContactsItemAdd.input.address.error.invalid":"Invalid address","ContactsItemAdd.input.address.title":"Address","ContactsItemAdd.input.name.title":"Name","ContactsItemAdd.input.note.info":"This note is only visible to you.","ContactsItemAdd.input.note.title":"Note","ContactsItemAdd.title":"Add Contact","ContactsItemDelete.actions.cancel":"Keep Contact","ContactsItemDelete.actions.confirm":"Delete","ContactsItemDelete.title":"Delete Contact?","ContactsItemEdit.actions.delete":"Delete Contact","ContactsItemEdit.actions.save":"Save","ContactsItemEdit.input.address.title":"Address","ContactsItemEdit.input.name.title":"Name","ContactsItemEdit.input.note.info":"This note is only visible to you.","ContactsItemEdit.input.note.title":"Note","ContactsItemEdit.title":"Edit Contact","DigitalAssetsManage.Empty.description":"There are no Digital Assets to show","ErrorUnexpected.action.reload":"Reload","ErrorUnexpected.description":"Something went wrong! Our developers already received error report, but you can also reload page, go to<0>home page</0> or<1>contact support</1>","ErrorUnexpected.title":"Unexpected Error","HistoryItem.TransactionCancel.cancel":"Cancel","HistoryItem.TransactionCancel.fee":"Estimated blockchain fee","HistoryItem.TransactionCancel.hash":"Blockchain transaction","HistoryItem.TransactionCancel.note":"Note","HistoryItem.TransactionCancel.noteDescription":"This note is only visible to you.","HistoryItem.TransactionCancel.sender":"Sender","HistoryItem.TransactionCancel.statusFailed":"Transfer not canceled.","HistoryItem.TransactionCancel.statusPending":"Cancel transfer. This may take some time.","HistoryItem.TransactionCancel.statusStuck":"Cancel transfer stuck.","HistoryItem.TransactionCancel.statusSuccess":"Transfer canceled.","HistoryItem.TransactionNormal.addressCopied":"Address copied.","HistoryItem.TransactionNormal.amount":"Amount","HistoryItem.TransactionNormal.cancel":"Cancel","HistoryItem.TransactionNormal.fee":"Estimated blockchain fee","HistoryItem.TransactionNormal.hash":"Blockchain transaction","HistoryItem.TransactionNormal.hashCopied":"Blockchain transaction copied.","HistoryItem.TransactionNormal.note":"Note","HistoryItem.TransactionNormal.noteDescription":"This note is only visible to you.","HistoryItem.TransactionNormal.recipient":"Recipient","HistoryItem.TransactionNormal.repeat":"Repeat Payment","HistoryItem.TransactionNormal.restart":"Restart","HistoryItem.TransactionNormal.sender":"Sender","HistoryItem.TransactionNormal.statusFailed":"Transfer declined.","HistoryItem.TransactionNormal.statusInSuccess":"Transfer processed.","HistoryItem.TransactionNormal.statusOutSuccess":"Transfer processed.","HistoryItem.TransactionNormal.statusPending":"Transfer is being processed. This may take some time.","HistoryItem.TransactionNormal.statusStucke":"Transfer stuck.","HistoryItem.goToHistory":"Go to History","HistoryItemDetails.AssetItemPreview.label":"Asset","Home.assets.manage":"Manage","Home.assets.save":"Save","Home.assets.title":"Assets","Home.noSearchResults.alt":"No search results in assets list","Home.noSearchResults.description":"No Search Results.","Home.transfer.exchange":"Exchange","Home.transfer.receive":"Receive","Home.transfer.send":"Send","Home.transfer.title":"Transfer","Introduction.action.submit":"Get Started","Introduction.slides.jwallet.description":"A simple, fast and secure mobile wallet for Ethereum and all ERC-20 tokens.","Introduction.slides.jwallet.title":"Jwallet","Introduction.slides.manage.description":"Enjoy complete control over your digital assets. Manage ETH and all ERC-20 tokens.","Introduction.slides.manage.title":"Manage","Introduction.slides.protect.description":"All sensitive data never leaves your device and your private keys are never shared with anyone, including us.","Introduction.slides.protect.title":"Protect","Introduction.slides.sendReceive.description":"Easily send and receive assets. Save addresses for fast access to your contacts.","Introduction.slides.sendReceive.title":"Send & Receive","Introduction.slides.store.description":"Create and manage several wallets for different goals or just simply import your existing Ethereum and ERC-20 wallet.","Introduction.slides.store.title":"Store","NotFound.description.0":"The page you're looking for can't be found.","NotFound.description.1":"Check the URL and try again.","NotFound.goHome":"Back to Home","NotFound.title":"404 \u2013 Page Not Found","Receive.copied":"Copied!","Receive.copy":"Copy address","Receive.recipientLabel":"Recipient address","Receive.title":"Receive assets","Send.Amount.fee":function(a){return["Blockchain fee \u2014 ",a("blockchainFee")," ETH"]},"Send.AssetPicker.label":"Asset","Send.PasswordStepForm.input.password.error.invalid":"Invalid password","Send.PasswordStepForm.title":"Enter Security Password","Send.PriorityField.fee":"Blockchain Fee","Send.PriorityField.fee.custom":"Custom Blockchain Fee","Send.PriorityField.fee.estimated":function(a){return["Blockchain fee \u2014 ",a("blockchainFee")," ETH"]},"Send.PriorityField.gasLimit":"Gas limit","Send.PriorityField.gasLimit.estimated":function(a){return["Gas limit (",a("estimatedGasLimit")," estimated)"]},"Send.PriorityField.gasPrice":"Gas price","Send.PriorityField.help":"Higher gas price reduces the processing time but increases the transaction fee.","Send.RecipientPicker.addressQuantity":function(a){return[a("addressCount")," addresses"]},"Send.RecipientPicker.contacts":"Contacts","Send.RecipientPicker.contactsEmpty.alt":"Empty contacts","Send.RecipientPicker.contactsEmpty.description":"Your contacts will be displayed here.","Send.RecipientPicker.selectTextAddress":"Send to this address...","Send.RecipientPicker.wallets":"My Wallets","Send.RecipientPicker.walletsEmpty.alt":"Empty wallets","Send.RecipientPicker.walletsEmpty.description":"Your wallets will be displayed here.","Send.SendAmountField.info":function(a){return["Address ETH balance \u2014 ",a("walletEthBalance","number","decimal")," ETH"]},"Send.SendError.actions.back":"Go Back and Try Again","Send.SendError.actions.cancel":"Cancel Transfer","Send.SendError.error.noConnection":"Internet Connection Error","Send.SendError.error.noConnection.description":"Transfer can't be processed without internet connection. Please, try again later.","Send.StepOneForm.form.actions.submit":"Send","Send.StepOneForm.input.amountValue.error.invalid":"Invalid amount value","Send.StepOneForm.input.amountValue.error.tooMuch":"Amount exceeds current balance","Send.StepOneForm.input.gasLimitValue.error.invalid":"Invalid gas limit","Send.StepOneForm.input.gasPriceValue.error.invalid":"Invalid gas price value","Send.ValidationFailed.actions.cancel":"Change Transfer Details","Send.ValidationFailed.actions.submit":"Proceed Anyway","Send.ValidationFailed.description":"Transfer validation failed. Chances are that if you proceed, transfer won't be wired, \nbut the blockchain fee will be charged. Are you sure you want to proceed?","Send.ValidationFailed.title":"Validation failed","Send.fee.description":"The app doesn\u2019t charge you any fees.<0/>But you have to pay the blokchain fee to create a new transaction.","Send.title":"Send","SetPassword.errors.hintEqualsPassword":"Password and hint should not be equal","SetPassword.errors.hintRequired":"Password hint is required","SetPassword.errors.passwordsNotMatch":"Password does not match confirmation","SetPassword.hint.description":"If you forget your Security Password, some functions won\u2019t be available. To restore access to all functions you will need to clear your data and re-import your wallets again using backup phrase.","SetPassword.hint.label":"Enter Password Hint","SetPassword.securityPassword":"Enter Security Password","SetPassword.submit":"Set Security Password","SetPassword.title":"Set Password to Secure Your Storage","Setings.actions.currency":"Currency","Setings.actions.devmode":"Developer Mode","Setings.actions.devmode.disabled":"Disabled","Setings.actions.devmode.enabled":"Enabled","Setings.actions.language":"Language","Setings.actions.password":"Change Security Password","Setings.title":"Setings","SetingsCurrency.CurrencyPicker.title":"Currency","SetingsCurrency.form.submit":"OK","SetingsCurrency.title":"Currency","SetingsLanguage.LanguagePicker.label":"Language","SetingsLanguage.actions.ok":"OK","SetingsLanguage.header.title":"SetingsLanguage.header.title","SetingsSecurityPassword.description":"You will use this password to unlock and transfer your funds. Keep it secure!","SetingsSecurityPassword.errors.hintEqualsPassword":"Password and hint should not be equal","SetingsSecurityPassword.errors.hintRequired":"Password hint is required","SetingsSecurityPassword.errors.oldPasswordRequired":"Old password is required","SetingsSecurityPassword.errors.passwordsNotEqual":"Not equal","SetingsSecurityPassword.errors.passwordsNotMatch":"Password does not match confirmation","SetingsSecurityPassword.hint":"Password hint","SetingsSecurityPassword.oldPassword":"Old payment password","SetingsSecurityPassword.submit":"Set password","SetingsSecurityPassword.title":"Update payment password","SingularTabBlockScreen.action.reload":"Reload Page","SingularTabBlockScreen.description.0":"Jwallet can be open only in one tab simultaneously.","SingularTabBlockScreen.description.1":"Please reload this tab to continue using it.","SingularTabBlockScreen.title":"Jwallet supports only single tab","Transactions.Asset.assetsHome":"Digital Assets","Transactions.Asset.send":"Send Asset","Transactions.history":"History","TransactionsFilter.filter":"Filter","TransactionsFilter.pendingOnly":"Only pending","TransactionsList.Empty.default":"Looks like you haven't made any transactions yet.","TransactionsList.Empty.filtered":"There are no items to display","WalletBackupForm":function(a){return["Back Up ",a("name")]},"WalletBackupForm.backup.allFields":"Save a wallet backup phrase, passphrase, and derivation path \nto a secure storage or write it down on the paper.","WalletBackupForm.backup.derivationPath":"Save a wallet backup phrase and derivation path \nto a secure storage or write it down on the paper.","WalletBackupForm.backup.passphrase":"Save a wallet backup phrase and passphrase \nto a secure storage or write it down on the paper.","WalletBackupForm.backup.single":"Save a wallet backup phrase to a secure storage \nor write it down on the paper.","WalletBackupForm.backupPhrase":"Backup Phrase","WalletBackupForm.derivationPath":"Derivation Path","WalletBackupForm.done":"Done","WalletBackupForm.download":"Download Backup as TXT","WalletBackupForm.passphrase":"Passphrase","WalletPasswordForm.forgot":"Forgot?","WalletPasswordForm.hint":function(a){return["Hint: ",a("hint")]},"WalletPasswordForm.password":"Security Password","WalletPasswordForm.submit":"Continue","Wallets.actions.create":"Create Wallet","Wallets.actions.import":"Import Wallet","Wallets.errors.derivationPathInvalid":"Derivation path is not valid","Wallets.errors.duplicateName":"You already have a wallet with this name.","Wallets.errors.nameEmpty":"Name should not be empty","Wallets.errors.nameIncludesInvalidChars":"Name should not include invalid symbols","Wallets.errors.nameTooLong":"Length of name should not be greater than 32 symbols","WalletsCreate.Backup.beCareful":"Be very careful with wallet backup phrase \u2014 anyone who know it will get access to \nyour funds.","WalletsCreate.Backup.compromise":"I understand that all my assets might be lost if my wallet backup phrase is \ncompromised.","WalletsCreate.Backup.description":"Jwallet never sends your wallets anywhere. \nTherefore, in case of device loss or failure, the only way to restore access to your \nfunds is to use a wallet backup phrase.","WalletsCreate.Backup.loseAccess":"I understand that I will lose access to my funds if I loose wallet backup phrase.","WalletsCreate.Backup.submit":"Continue","WalletsCreate.Backup.title":"Back Up Wallet","WalletsCreate.Create.name":"Wallet Name","WalletsCreate.Create.submit":"Next","WalletsCreate.Create.title":"Create wallet","WalletsCreate.Password.title":"Enter Security Password to Protect Your Wallet","WalletsImport.data":"Address, Key, Mnemonic","WalletsImport.data.description.default":"Enter a private key or backup phrase of the wallet you want to import. You can also enter a public key or address to access wallet in read-only mode. We support: Ethereum address, Ethereum private key, BIP39 mnemonic, BIP32 XPUB, BIP44 XPRIV.","WalletsImport.errors.addressInvalid":"Incorrect Ethereum address","WalletsImport.errors.addressTypo":"Seems you made a typo in Ethereum address","WalletsImport.errors.dataEmpty":"The field should not be empty","WalletsImport.errors.dataInvalid":"Invalid wallet data","WalletsImport.errors.mnemonicInvalid":"Incorrect BIP39 mnemonic","WalletsImport.errors.mnemonicLanguage":"BIP39 mnemonic should be in English","WalletsImport.errors.passwordInvalid":"Invalid password","WalletsImport.errors.privateKeyInvalid":"Incorrect Ethereum private key","WalletsImport.errors.privateKeyTooLong":"WalletsImport.errors.privateKeyTooLong","WalletsImport.errors.unrecognizable":"Unable to recognize your input","WalletsImport.errors.walletIsNotUnique":function(a){return["Wallet with such ",a("propertyName")," already exists"]},"WalletsImport.errors.xprvInvalid":"Incorrect BIP32 XPRV","WalletsImport.errors.xprvTooLong":"WalletsImport.errors.xprvTooLong","WalletsImport.errors.xpubInvalid":"Incorrect BIP32 XPUB","WalletsImport.errors.xpubTooLong":"WalletsImport.errors.xpubTooLong","WalletsImport.finalGuess.address":"You have entered Ethereum address","WalletsImport.finalGuess.mnemonic":function(a){return["You have entered ",a("wordsLen"),"-words BIP39 mnemonic"]},"WalletsImport.finalGuess.privateKey":"You have entered Ethereum private key","WalletsImport.finalGuess.xprv":"You have entered BIP32 XPRV","WalletsImport.finalGuess.xpub":"You have entered BIP32 XPUB","WalletsImport.guess.address":"Seems like you are entering Ethereum address","WalletsImport.guess.mnemonic":"Seems like you are entering BIP39 mnemonic","WalletsImport.guess.privateKey":"Seems like you are entering Ethereum private key","WalletsImport.guess.xprv":"Seems like you are entering BIP32 XPRV","WalletsImport.guess.xpub":"Seems like you are entering BIP32 XPUB","WalletsImport.import.title":"Import wallet","WalletsImport.name":"Wallet Name","WalletsImport.password.title":"Enter Security Password to Protect Your Wallet","WalletsImport.submit":"Import","WalletsItemAddresses.WalletAddressCard.actions.copy":function(a){return["Copy ",a("addressName")]},"WalletsItemAddresses.WalletAddressCard.title":"Name","WalletsItemAddresses.actions.addAddress":"Add New Address","WalletsItemAddresses.title":"Manage Addresses","WalletsItemAddresses.wallet.description":function(a){return["Multi-Address Wallet  \u2022  ",a("count","plural",{one:"1 Address",other:["#"," Addresses"]})]},"WalletsItemBackup.backup.title":"Back Up Wallet","WalletsItemBackup.securityPassword.title":"Enter Security Password","WalletsItemDelete.actions.cancel":"Keep Wallet","WalletsItemDelete.actions.submit":"Delete","WalletsItemDelete.description":"This action will delete the wallet from this device. You can restore it using wallet \nbackup phrase. If the wallet is not backed up, it will be gone forever.","WalletsItemDelete.title":"Delete Wallet","WalletsItemModeDisable.actions.submit":"Disable","WalletsItemModeDisable.description":"This action will leave only one active wallet address of your choice. \nYou will be able return to the multi-address mode at any time and get access to all \nyour currently available addresses.","WalletsItemModeDisable.title":"Disable Multi-Address Mode","WalletsItemModeEnable.actions.cancel":"Do It Later","WalletsItemModeEnable.actions.submit":"Enable","WalletsItemModeEnable.description":"You will be able to create multiple addresses within this wallet. \nThey will have a common backup phrase.","WalletsItemModeEnable.title":"Enable Multi-Address Mode","WalletsItemUpgrade.data.actions.submit":"Unlock","WalletsItemUpgrade.data.description":"Add private key to get the full access to Jwallet features and send assets.","WalletsItemUpgrade.data.title":"Your Wallet Is in Read-Only Mode","WalletsItemUpgrade.finish.actions.submit":"Go to Wallet","WalletsItemUpgrade.finish.description":"Congratulations, you have full access to Jwallet features. \nStart using them now!","WalletsItemUpgrade.finish.title":"Features Unlocked","WalletsItemUpgrade.input.data.error.cantunlock":"You can't unlock not read only wallet","WalletsItemUpgrade.input.data.error.empty":"The field should not be empty","WalletsItemUpgrade.input.data.error.invalidMnemonic":"Invalid mnemonic","WalletsItemUpgrade.input.data.error.invalidPrivateKey":"Invalid private key","WalletsItemUpgrade.input.data.error.invalidXprv":"Invalid XPRV","WalletsItemUpgrade.input.data.error.noPrivateKey":"Input private key for your current address","WalletsItemUpgrade.input.data.error.noXprv":"Input XPRV or mnemonic for your current XPUB","WalletsItemUpgrade.input.data.info":"To unlock all features you need to provide a wallet backup \nphrase apropriate for your wallet type: BIP39 Mnemonic, BIP32 XPRV, Ethereum Private Key. Other \ncrypto wallets use many different synonyms to name it: \"Recovery phrase\", \"Private key\", \n\"Mnemonic phrase\" etc.","WalletsItemUpgrade.input.data.title":"Address, Key, Mnemonic","WalletsItemUpgrade.password.title":"Enter Security Password","WalletsStart.SelectScenario.title":"Create a new wallet or import an existing<br> to get started","WalletsStart.createWallet.action":"Create Wallet","WalletsStart.createWallet.description":"Create your own wallet to manage your digital assets","WalletsStart.importWallet.action":"Import Wallet","WalletsStart.importWallet.description":"Import an existing wallet with backup phrase, private key, etc.","common.ButonWithConfirm.countdown":function(a){return[a("countdown")," sec"]},"common.ContactsItemDetails.address.title":"Address","common.ContactsItemDetails.note.info":"This note is only visible to you.","common.ContactsItemDetails.note.title":"Note","common.CopyIconButon.title":function(a){return["Copy ",a("content")]},"common.CopyableField.copy":function(a){return["Copy",a("labelOrNothing")]},"common.FieldPreview.action.addContact":"Add Contact","common.FieldPreview.action.copy":"Copy","common.JPicker.List.NotFoundItem.description":"Not Found","common.MnemonicOptions.actions.advanced":"Advanced","common.MnemonicOptions.derivationPath.info":"Derivation path and BIP39 mnemonic passphrase affect generation of blockchain addresses from mnemonic. Usually you need to edit them to import mnemonic from a hardwallet. In all other cases just leave it as is.","common.MnemonicOptions.derivationPath.title":"Derivation Path (Optional)","common.MnemonicOptions.mnemonicPassphrase.title":"Mnemonic Passphrase (Optional)","common.NewPasswordField.input.passwordConfirm.title":"Repeat Security Password","common.NewPasswordField.strength.green":"Not bad","common.NewPasswordField.strength.orange":"Easily cracked","common.NewPasswordField.strength.red":"Too weak","common.NewPasswordField.strength.yellow":"Bit weak","common.SearchInput.SearchFilter.action.close":"Close filter","common.SearchInput.SearchFilter.action.filter":"Filter","common.SearchInput.input.placeholder":"Search","common.TransactionItem.Details.Comment.action.cancel":"Cancel","common.TransactionItem.Details.Comment.action.delete":"Delete","common.TransactionItem.Details.Comment.action.save":"Save","common.TransactionItem.Details.Comment.input.placeholder":"Your comment","common.TransactionItem.Details.action.commentAdd":"Add comment","common.TransactionItem.Details.action.commentEdit":"Edit comment","common.TransactionItem.Details.action.favoriteAdd":"Add to Favorites","common.TransactionItem.Details.action.favoriteRemove":"Remove from Favorites","common.TransactionItem.Details.action.repeat":"Repeat payment","common.TransactionItem.Details.fee.title":"Fee","common.TransactionItem.Details.from.title":"From address","common.TransactionItem.Details.to.title":"To address","common.TransactionItem.Details.txHash.title":"TX Hash","common.TransactionItem.burn.title":"Token burning","common.TransactionItem.mint.title":"Token minting","common.WalletActions.backup":"Backup Wallet","common.WalletActions.copy":"Copy Wallet Address","common.WalletActions.delete":"Delete Wallet","common.WalletActions.manageAddresses":"Manage Addresses","common.WalletActions.multiaddress.disable":"Disable Multi-Address Mode","common.WalletActions.multiaddress.enable":"Enable Multi-Address Mode","common.WalletActions.rename":"Rename Wallet","common.WalletActions.unlock":"Unlock Features","common.WalletCard.AddressChooser.choose":"Choose Address","common.WalletCard.AddressChooser.manage":"Manage","common.WalletCard.action.addresses":"Manage Addresses","common.WalletCard.action.backup":"Backup Wallet","common.WalletCard.action.copyWalletAddress":"Copy Wallet Address","common.WalletCard.action.delete":"Delete Wallet","common.WalletCard.action.disableMulti":"Disable Multi-Address Mode","common.WalletCard.action.enableMulti":"Enable Multi-Address Mode","common.WalletCard.action.renameWallet":"Rename Wallet","common.WalletCard.action.unlock":"Unlock Features","common.WalletCard.currentAddress":function(a){return[a("nameWithDivider"),a("addressesCount")," Addresses"]},"common.WalletCard.duplicateName":"You already have a wallet with this name.","common.currency.cny":"Chinese Yuan Renminbi","common.currency.eur":"Euro","common.currency.gbp":"Pound Sterling","common.currency.jpy":"Japanese Yen","common.currency.krw":"South Korean won","common.currency.usd":"US Dollar","common.password.validate.hintEqualsPassword":"Password and hint should not be equal","common.password.validate.hintRequired":"Password hint is required","common.password.validate.passwordsNotMatch":"Password does not match confirmation","common.setings.worker.error.passwordInvalid":"Password is invalid","encryption.errors.passwordInvalid":"Invalid Password","entity.Address.defaultName":function(a){return["Address ",a("index")]},"entity.Password.error.invalid":"Invalid password","formaters.formatCurrency.errors.codeInvalid":"Invalid Fiat Currency Code","layout.MenuLayout.MenuPanel.link.contacts":"Contacts","layout.MenuLayout.MenuPanel.link.history":"History","layout.MenuLayout.MenuPanel.link.home":"Home","layout.MenuLayout.MenuPanel.link.more":"More","layout.MenuLayout.MenuPanel.link.setings":"Setings","layout.MenuLayout.MenuPanel.testNetwork.info":function(a){return["You Are Using ",a("networkName")," Test Network"]},"layout.MenuLayout.error.noConnection.description.0":"Internet connection error.","layout.MenuLayout.error.noConnection.description.1":"Try again.","layout.MenuLayout.logo.alt":"Jwallet Logo","layout.StartLayout.logo.alt":"Jwallet Logo"}};
