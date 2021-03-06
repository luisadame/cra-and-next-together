import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import snakeCase from "lodash/snakeCase";

async function getCharacters() {
  const data = await (
    await fetch("https://rickandmortyapi.com/api/character")
  ).json();
  const characters = data.results
    .slice(0, 5)
    .map((char: { name: string }) => char.name);
  return characters as string[];
}

async function getCharacter(slug: string) {
  const data = await (
    await fetch("https://rickandmortyapi.com/api/character")
  ).json();
  const characters = data.results;
  const character = characters.find(
    (char: { name: string }) => snakeCase(char.name) === slug
  );
  return character.name as string;
}

export async function getStaticPaths() {
  const characters = await getCharacters();

  const paths = characters.map((name) => ({
    params: { partner: name, slug: snakeCase(name) },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const characterName = await getCharacter(params.slug);
  return { props: { partner: characterName } };
}

export default function PartnerPage({
  partner,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div className={styles.container}>
      <Head>
        {/* see? we can have our custom meta tags! */}
        <title>MyApp - {partner}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to {partner}</h1>
      </main>
    </div>
  );
}
