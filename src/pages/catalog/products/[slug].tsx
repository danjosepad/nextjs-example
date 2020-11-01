
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { Document } from 'prismic-javascript/types/documents';
import PrismicDOM from 'prismic-dom';

// Product imports

import { client } from '@/lib/prismic';

//  ssr option makes component only be rendered from client side
// const AddToCartModal = dynamic(
//   () => import('@/components/AddToCartModal'),
//   { loading: () => <p>Carregando...</p> }
// )

interface ProductProps {
  product: Document;
}

export default function Product({ product }: ProductProps) {
  const router = useRouter();

  // Because of getStaticPaths, when page starts to be loaded we create this condition
  // to improve UX
  if(router.isFallback) {
    return <p>Carregando...</p>
  }


  return (
    <div>
      {console.log(product.data)}
      <h1>{PrismicDOM.RichText.asText(product.data.title)}</h1>

      <img src={product.data.thumbnail.url} width="500" alt={product.data.thumbnail.alt} />
      <div
       dangerouslySetInnerHTML={ {__html: PrismicDOM.RichText.asHtml(product.data.rich_text)}}
      />
      <p>Price: ${product.data.price }</p>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  // Optimize only most searched products

  return {
    paths: [],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<ProductProps> = async (context) => {
  const { slug } = context.params;

  const product = await client().getByUID('product', String(slug), {});

  return {
    props: {
      product
    },
    revalidate: 10 // Lower to maintain the correct price
  }
}