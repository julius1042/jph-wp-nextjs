import Nav from '@/components/nav';
import {getPosts} from '@/lib/wp-api';
import Link from 'next/link';
import { getSlug } from '@/utils/tools'


const blogBaseName = process.env.WORDPRESS_BLOG_BASE_NAME
const Page = async () => {
  const posts = await getPosts();
  
  // console.log(posts);

  // posts.map( (post: any) => {
  //   console.log(post.slug)
  // })
  return (
    <div>
      <Nav />

      <h1>Blog Posts</h1>
      <div className="flex">
        {
          posts.map((post: any) => (
            <div key={post.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
              <h2>{post.slug.replaceAll('-', ' ')}</h2>
              <p>Published: {new Date(post.date).toLocaleDateString()}</p>
              <Link href={`${blogBaseName}/${getSlug(post.link)}`}>Read More</Link>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Page
