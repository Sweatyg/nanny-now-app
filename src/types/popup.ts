export enum EPopupType {
  ERROR,
  SUCCESS,
}
export type PopupMassage = {
  type: EPopupType;
  title: string;
  message: string;
};
