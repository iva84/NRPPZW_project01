import CompetitionForm from '@/components/CompetitionForm';
import styles from './page.module.css';
import { getSession } from '@auth0/nextjs-auth0';
import { redirect } from 'next/navigation';

export default async function NewCompetition() {
  const session = await getSession();
  if (!session) {
    redirect('/');
  }

  return (
    <main className={styles['main']}>
      <CompetitionForm />
    </main>
  );
}
