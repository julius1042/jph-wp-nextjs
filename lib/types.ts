export interface MenuItem {
  ID: number;
  title: string;
  url: string;
  menu_item_parent: string;
  object_id: number;
  children?: MenuItem[];
}