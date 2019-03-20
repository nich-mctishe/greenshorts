import Link from 'next/link'
import Grid from '../components/partials/grid'
import GridItem from '../containers/products/grid-item'

import Cart from '../containers/checkout/cart'

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
  <div className="header">
    <Link href='/about'><a>About</a></Link>
    <Cart />
    <h1>My Blog</h1>
    <ul>
      <PostLink id='hello-nextjs' title='Hello Next.js' />
      <PostLink id='learn-nextjs' title='Learn Next.js is awesome' />
      <PostLink id='deploy-nextjs' title='Deploy apps with Zeit' />
    </ul>
    <Grid>
      <GridItem />
      <GridItem image='./static/images/product-1.jpg' name="test 2" sku="54321" price='31.99'/>
    </Grid>
  </div>
)
