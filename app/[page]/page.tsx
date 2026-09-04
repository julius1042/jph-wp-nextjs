import { getPageBySlug } from '../lib/wordpress'
import Nav from '../components/nav'

type Props = {
  params: Promise<{
    page: string;
  }>;
};

const Pages = async ({ params }: Props) => {
  const { page } = await params;

  const pageData = await getPageBySlug(page);

  if (!pageData) {
    return <div>Page not found</div>;
  }

  return (
    <main>
      <Nav />
      <h1>{pageData.title.rendered}</h1>

      <div
        dangerouslySetInnerHTML={{
          __html: pageData.content.rendered,
        }}
      />
    </main>
  );
};

export default Pages;


      