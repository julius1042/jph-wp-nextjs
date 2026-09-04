import { cache } from "react";
import { getMenuItems } from '@/lib/wp-api'

export const getStaticHomePage = cache(() => {
  const menuItems = getMenuItems();
//   console.log(menuItems);
  const staticHomePageId = `server_session_${Math.random()}`; 
  return { staticHomePageId };
});