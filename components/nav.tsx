import Link from 'next/link';
import { getMenuItems } from '@/lib/wp-api'
import { getSlug } from '@/utils/tools'
import { MenuItem } from '@/lib/types';

const Nav = async () => {
  const menuItems = await getMenuItems();

  const buildMenu = (items: MenuItem[], parentId = "0"): MenuItem[] => {
      return items
        .filter((item) => item.menu_item_parent === parentId)
        .map((item) => ({
          ...item,
          children: buildMenu(items, String(item.ID)),
        }));
    };

    const navItems = buildMenu(menuItems);
   

  return (
    <nav>
      <ul>
          {
            
            navItems.map((item) => (
              <li key={item.ID}>
                <Link href={`/${getSlug(item.url)}`}>{item.title}</Link>

                {item.children && item.children.length > 0 && (
                  <ul>
                    {
                      item.children.map((child) => (
                        <li key={child.ID}>
                          <Link href={`/${getSlug(child.url)}`}>{child.title}</Link>
                        </li>
                      ))
                    }
                  </ul>
                )}
              </li>
            ))
          }
        </ul>
    </nav>
  )
}

export default Nav
