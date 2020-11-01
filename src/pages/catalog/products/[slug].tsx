
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Prismic from 'prismic-javascript';
import { Document } from 'prismic-javascript/types/documents';
import PrismicDOM from 'prismic-dom';
import Link from 'next/link';

// Product imports

import { client } from '@/lib/prismic';
import { sanitizeProp } from '@/lib/sanitizeDOM';

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
      <h1>{PrismicDOM.RichText.asText(product.data.title)}</h1>

      <div
        {...sanitizeProp(PrismicDOM.RichText.asHtml(product.data.description))}
      />
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