/// <reference types="react-scripts" />
import {
  BackgroundProps, ColorProps, BorderProps, LayoutProps,
  PositionProps, SpaceProps, FlexboxProps, TextStyleProps,
  BackgroundImageProps, TypographyProps, FontStyleProps
} from 'styled-system';
import themes from './themes/default';
import { CHANGE_GROUPBY, groupByOptions, sortByOptions, RESET_STATE, allowedPriorities, allowedCurrentStates } from './actions/todo';
import { initialState } from './reducers/todo';
import { ReactNode } from 'react';

type fontSizeType = keyof theme.fontSizes;
type buttonVariantType = keyof typeof theme.buttons
export interface BoxProps extends BackgroundProps, ColorProps, BorderProps, LayoutProps, PositionProps, SpaceProps, TypographyProps, FontStyleProps {
  cursor?: string;
}

export interface FlexProps extends FlexboxProps, BoxProps {}

export interface TextProps extends BoxProps, TextStyleProps {
  fontSize?: fontSizeType | Array<fontSizeType>;
}

export interface ButtonProps extends FlexProps {
  variant?: buttonVariantType;
  disabled?: boolean;
  type?: string;
}

export interface ImageProps extends BackgroundImageProps, PositionProps, SpaceProps, BackgroundProps, LayoutProps {
  rotate?: string | number;
}

export interface InputProps extends FlexProps {
  value: string;
  name?: string;
  disabled?: boolean;
  as?: string;
  type?: string;
}


type priorityTypes = keyof allowedPriorities;
type currentStateTypes = keyof allowedCurrentStates;

export interface TaskType {
  id: number;
  currentState: currentStateTypes;
  title: string;
  description: string;
  createdAt: string;
  dueDate: string;
  priority: priorityTypes;
}

export interface FormInputsHookOption {
  [key: string]: {
    minLength: number;
    maxLength: number;
    value: string;
  }
}

export interface FormInputsHookReturnType {
  hasErrors: boolean;
  errors: formErrorsType;
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  values: {
      [key: string]: string;
  }
}

export type optionType = {id: string | number; label: string;}
export interface DropdownProps {
  selected: string;
  options: optionType[];
  onSelect: (selection: string) => void;
}

export interface TableActionsProps {
  id: number;
  onEdit: () => void;
  onDelete: () => void;
  onStatusChange: () => void;
  onClickSort: () => void;
  currentState: currentStateTypes;
  sortOrder?: 'ASC' | 'DESC';
  sortBy?: sortByOptions;
}

export interface ModalFormProps {
  children: ReactNode;
  open: boolean;
  onCloseModal: () => void;
}


export interface formErrorsType {
  [key: string]: string[];
}
export interface TaskEntryFormProps {
  selectedTask: TaskType;
  onCloseModal: () => void;
  onFormSubmit: ({
    priority: priorityTypes, title: string,
    description: string, dueDate: string, id: number
  }) => void;
}

export interface TableProps extends Omit<TableActionsProps, 'currentState'> {
  columns: string[];
  config: ConfigType[];
  data: TaskType[] | {[key: string]: TaskType[]};
}

export interface TabbarProps extends DropdownProps {}

export type ConfigType = {
  name: string;
  allowGroupBy: boolean;
  allowSortBy: boolean;
  allowSearch: boolean;
  id: string;
  label: string;
}

type PayloadType = {
  value: string;
}
export interface StateType {
  list: TaskType[];
  groupBy: typeof groupByOptions;
  searchTerm: string;
  sortOrder: 'ASC' | 'DESC';
  sortBy: typeof sortByOptions;
}
export type ActionType = 
  | { type: typeof CHANGE_GROUPBY; payload: PayloadType }
  | { type: typeof RESET_STATE }