export interface MenuItem {
  _id?:string;
  displayName: string;
  iconName: string;
  route?: string;
  tipoPermiso?: string;
  selected?: boolean;
  children?: MenuItem[];
}
