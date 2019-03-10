import Link from 'next/link'

const PostLink = (props) => (
  <li>
    <Link as={`/p/${props.id}`} href={`/post?title=${props.title}`}>
    <a>
      {props.title}
    </a>
    </Link>
  </li>
)

export default () => (
  <div>
    <Link href='/about'><a>About</a></Link>
    <h1>My Blog</h1>
    <ul>
      <PostLink id='hello-nextjs' title='Hello Next.js' />
      <PostLink id='learn-nextjs' title='Learn Next.js is awesome' />
      <PostLink id='deploy-nextjs' title='Deploy apps with Zeit' />
    </ul>
  </div>
)
