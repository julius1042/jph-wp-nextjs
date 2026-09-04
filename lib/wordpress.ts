const WORDPRESS_URL = process.env.WORDPRESS_URL;

export async function getPageBySlug(slug: string) {
  const response = await fetch(
    `${WORDPRESS_URL}/wp-json/wp/v2/pages?slug=${slug}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch WordPress page');
  }

  const data = await response.json();

  return data[0] ?? null;
}