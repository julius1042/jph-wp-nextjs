import Nav from '@/components/nav';
import {
  getMenuItems,
  getPageDataByPageId,
} from '@/lib/wp-api';

import { MenuItem } from '@/lib/types';

export default async function Page() {
  const navItems: MenuItem[] = await getMenuItems();

  const homePage = navItems.find(
    (nav) => nav.url === `${process.env.WORDPRESS_HOME_URL}/`
  );

  if (!homePage) {
    return (
      <div>
        <Nav />
        <p>Homepage not found.</p>
      </div>
    );
  }

  const pageResult = await getPageDataByPageId(homePage.object_id);

  if (!pageResult) {
    return (
      <div>
        <Nav />
        <p>Unable to load homepage content.</p>
      </div>
    );
  }

  return (
    <div>
      <Nav />

      <div
        dangerouslySetInnerHTML={{
          __html: pageResult.content.rendered,
        }}
      />
    </div>
  );
}