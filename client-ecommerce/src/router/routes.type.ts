export interface IRouterMeta {
  name?: string;
  path: string;
  isShow: boolean;
  isAuth?: boolean;
  isCommon?: boolean;
  feature?: string;
  site?: string;
  page?: string;
  file?: string;
  requiresLayout?: boolean;
}

export type RouterMetaType = {
  [key: string]: IRouterMeta;
};