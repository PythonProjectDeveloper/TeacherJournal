export interface IDropDownWidget {
  dropdowns: IDropDown[];
}

export const DROPDOWN_WIDGET: IDropDownWidget = {
  dropdowns: [],
};

export interface IDropDown {
  subjectName: string;
  dates: ICollapse[];
  state: boolean | null;
  isExpended: boolean;
}

export const DROPDOWN: IDropDown = {
  subjectName: '',
  dates: [],
  state: false,
  isExpended: false,
};

export interface ICollapse {
  name: string;
  state: boolean;
}

export const COLLAPSE: ICollapse = {
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
