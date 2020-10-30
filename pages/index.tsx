import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import { Title } from './styles/pages/Home';

interface IProduct {
  id: String;
  title: String;
}

interface HomeProps {
  recommendedProducts: IProduct[];
}

// Time to First Byte = 2s

export default function Home({ recommendedProducts }: HomeProps) {
  return (
    <div>
      <section>
        <Title>Hello World</Title>

        <ul>
          {recommendedProducts.map(recommendedProduct => {
            return (
              <li key={+recommendedProduct.id}>
                {recommendedProduct.title}
              </li>
            )
          })}
        </ul>
      </section>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const response = await fetch('http://localhost:3333/recommended');
  const recommendedProducts = await response.json();
  
  return {
    props: {
      recommendedProducts
    }
  }
}