export interface IDropDownWidgetState {
  dropdowns: IDropDownState[];
}

export const DROPDOWN_WIDGET_STATE: IDropDownWidgetState = {
  dropdowns: [],
};

export interface IDropDownState {
  subjectName: string;
  dates: ICollapseState[];
  state: boolean | null;
  isExpended: boolean;
}

export const DEFAULT_DROPDOWN_STATE: IDropDownState = {
  subjectName: '',
  dates: [],
  state: false,
  isExpended: false,
};

export interface ICollapseState {
  name: string;
  state: boolean;
}

export const DEFAULT_COLLAPSE_STATE: ICollapseState = {
  name: '',
  state: false,
};

export interface IRequestDatesState {
  subject: string;
  dates: string[];
}

export const REQUEST_DATES_STATE: IRequestDatesState = {
  subject: '',
  dates: [],
};

export type IDropDownControllerCollback = (newValue: IDropDownState) => void;
