import type { ParamListBase } from '@react-navigation/native';

export interface RootStackParamList extends ParamListBase {
  Tabs: undefined;
  Article: { id: string };
  Settings: undefined;
}

export interface TabParamList extends ParamListBase {
  Home: undefined;
  Following: undefined;
  Search: undefined;
  Library: undefined;
  Profile: undefined;
}