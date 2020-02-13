/// <reference types="react-scripts" />
import {
  BackgroundProps, ColorProps, BorderProps, LayoutProps,
  PositionProps, SpaceProps, FlexboxProps, TextStyleProps,
  BackgroundImageProps, TypographyProps, FontStyleProps
} from 'styled-system';
import theme from './theme';
import { CHANGE_GROUPBY, groupByOptions, sortByOptions, RESET_STATE } from './actions/todo';
import { initialState } from './reducers/todo';

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
  rotate?: string;
}

export interface InputProps extends FlexProps {
  value: string;
  name?: string;
  disabled?: boolean;
  as?: string;
  type?: string;
}


type priorityTypes = 'none' | 'low' |  'medium' | 'high';

export interface TaskType {
  id: number;
  currentState: boolean;
  title: string;
  description: string;
  createdAt: string;
  dueDate: string;
  priority: priorityTypes;
}

export interface DropdownProps {
  selected: string;
  options: string[];
  onSelect: (selection: string) => void;
}

export interface TableActionsProps {
  id: number;
  onEdit: () => void;
  onDelete: () => void;
  onStatusChange: () => void;
}

export interface TableProps extends TableActionsProps {
  columns: string[];
  config: ConfigType[];
  data: TaskType[];
}

export interface TabbarProps extends DropdownProps {}

export type ConfigType = {
  name: string;
  allowGroupBy: boolean;
  allowSortBy: boolean;
  allowSearch: boolean;
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