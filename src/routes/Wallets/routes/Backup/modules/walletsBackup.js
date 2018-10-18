// @flow

/* eslint-disable max-len */
export const OPEN_VIEW: '@@walletsBackup/OPEN_VIEW' = '@@walletsBackup/OPEN_VIEW'
export const CLOSE_VIEW: '@@walletsBackup/CLOSE_VIEW' = '@@walletsBackup/CLOSE_VIEW'

export const GO_TO_NEXT_STEP: '@@walletsBackup/GO_TO_NEXT_STEP' = '@@walletsBackup/GO_TO_NEXT_STEP'
export const GO_TO_PREV_STEP: '@@walletsBackup/GO_TO_PREV_STEP' = '@@walletsBackup/GO_TO_PREV_STEP'
export const SET_CURRENT_STEP: '@@walletsBackup/SET_CURRENT_STEP' = '@@walletsBackup/SET_CURRENT_STEP'

export const BACKUP_ERROR: '@@walletsBackup/BACKUP_ERROR' = '@@walletsBackup/BACKUP_ERROR'
export const BACKUP_SUCCESS: '@@walletsBackup/BACKUP_SUCCESS' = '@@walletsBackup/BACKUP_SUCCESS'
export const BACKUP_REQUEST: '@@walletsBackup/BACKUP_REQUEST' = '@@walletsBackup/BACKUP_REQUEST'

export const DOWNLOAD_TO_TXT: '@@walletsBackup/DOWNLOAD_TO_TXT' = '@@walletsBackup/DOWNLOAD_TO_TXT'
export const COPY_TO_CLIPBOARD: '@@walletsBackup/COPY_TO_CLIPBOARD' = '@@walletsBackup/COPY_TO_CLIPBOARD'

export const CLEAN: '@@walletsBackup/CLEAN' = '@@walletsBackup/CLEAN'
/* eslint-enable max-len */

export const STEPS: WalletsBackupSteps = {
  PASSWORD: 0,
  PRIVATE: 1,
}

export function openView(walletId: string) {
  return {
    type: OPEN_VIEW,
    payload: {
      walletId,
    },
  }
}

export function closeView() {
  return {
    type: CLOSE_VIEW,
  }
}

export function goToNextStep(walletId: string) {
  return {
    type: GO_TO_NEXT_STEP,
    payload: {
      walletId,
    },
  }
}

export function goToPrevStep() {
  return {
    type: GO_TO_PREV_STEP,
  }
}

export function setCurrentStep(currentStep: WalletsBackupStepIndex) {
  return {
    type: SET_CURRENT_STEP,
    payload: {
      currentStep,
    },
  }
}

export function backupError(message: string) {
  return {
    type: BACKUP_ERROR,
    payload: {
      message,
    },
    error: true,
  }
}

export function backupSuccess(data: string) {
  return {
    type: BACKUP_SUCCESS,
    payload: {
      data,
    },
  }
}

export function backupRequest(items: Wallets, walletId: string, password: string) {
  return {
    type: BACKUP_REQUEST,
    payload: {
      items,
      walletId,
      password,
    },
  }
}

export function downloadToTxt() {
  return {
    type: DOWNLOAD_TO_TXT,
  }
}

export function copyToClipboard() {
  return {
    type: COPY_TO_CLIPBOARD,
  }
}

export function clean() {
  return {
    type: CLEAN,
  }
}

export type WalletsBackupAction =
  ExtractReturn<typeof openView> |
  ExtractReturn<typeof closeView> |
  ExtractReturn<typeof goToNextStep> |
  ExtractReturn<typeof goToPrevStep> |
  ExtractReturn<typeof setCurrentStep> |
  ExtractReturn<typeof backupError> |
  ExtractReturn<typeof backupSuccess> |
  ExtractReturn<typeof backupRequest> |
  ExtractReturn<typeof downloadToTxt> |
  ExtractReturn<typeof copyToClipboard> |
  ExtractReturn<typeof clean>

const initialState: WalletsBackupState = {
  data: '',
  currentStep: STEPS.PASSWORD,
}

function walletsBackup(
  state: WalletsBackupState = initialState,
  action: WalletsBackupAction,
): WalletsBackupState {
  switch (action.type) {
    case SET_CURRENT_STEP:
      return {
        ...state,
        currentStep: action.payload.currentStep,
      }

    case BACKUP_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
      }

    case CLEAN:
      return initialState

    default:
      return state
  }
}

export default walletsBackup
