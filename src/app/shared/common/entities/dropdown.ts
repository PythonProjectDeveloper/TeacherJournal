export interface IDropDownWidget {
  dropdowns: IDropDownState[];
}

export const DROPDOWN_WIDGET: IDropDownWidget = {
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

export interface IRequestDates {
  subject: string;
  dates: string[];
}

export const REQUEST_DATES: IRequestDates = {
  subject: '',
  dates: [],
};
