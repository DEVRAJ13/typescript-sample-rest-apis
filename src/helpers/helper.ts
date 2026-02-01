export interface ModificationNote {
  modified_on: Date
  modified_by: string
  modification_note: string
}

export const createModificationNote = (
  modifiedBy: string,
  note: string
): ModificationNote => {
  return {
    modified_on: new Date(),
    modified_by: modifiedBy,
    modification_note: note
  }
}

/* ================================
   HTTP Response Status Codes
   ================================ */
export enum ResponseStatusCode {
  SUCCESS = 200,
  BAD_REQUEST = 400,
  INTERNAL_SERVER_ERROR = 500
}
