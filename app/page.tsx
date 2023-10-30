import LinkCard from '@/components/LinkCard';
import styles from './page.module.css';
import { getSession } from '@auth0/nextjs-auth0';

export default async function Home() {
  const session = await getSession();

  return (
    <main className={styles['main']}>
      <h1 className={styles['title']}>
        Welcome to the
        <br /> competition schedule app.
      </h1>
      <p className={styles['title-description']}>
        You can sign up to create a competition and we
        <br /> will make sure that the match schedule between the
        <br /> competitors is created using the Round Robin algorithm.
      </p>
      <div className={styles['menu']}>
        {session && (
          <LinkCard
            path="/competition/creator"
            label="Competitions list"
            description="Here you can see a list of all competitions you created."
          />
        )}
      </div>
    </main>
  );
}
