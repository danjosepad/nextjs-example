import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { Document } from 'prismic-javascript/types/documents';
import Prismic from 'prismic-javascript';
import PrismicDOM from 'prismic-dom';

// Project imports
import { Title } from '@/pages/styles/pages/Home';
import SEO from '@/components/SEO';
import { client } from '@/lib/prismic';

interface HomeProps {
  recommendedProducts: Document[];
}

// Time to First Byte = 2s

export default function Home({ recommendedProducts }: HomeProps) {
  return (
    <div>
      <SEO
        title="DevCommerce, a loja feita para você"
        shouldExcludeTittleSuffix />
      <section>
        <Title>Hello World</Title>

        <ul>
          {recommendedProducts.map(recommendedProduct => {
            return (
              <li key={+recommendedProduct.id}>
                <Link href={`/catalog/products/${recommendedProduct.uid}`}>
                  <a>
                    {PrismicDOM.RichText.asText(recommendedProduct.data.title)}
                  </a>
                </Link>
              </li>
            )
          })}
        </ul>
      </section>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const recommendedProducts = await client().query([
    // Return all elements that have product type

    // Predicates = where
    Prismic.Predicates.at('document.type', 'product')
  ]);


  return {
    props: {
      recommendedProducts: recommendedProducts.results,
    }
  }
}