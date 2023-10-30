import { getSession } from '@auth0/nextjs-auth0';
import styles from './page.module.css';
import CompetitionResults from '@/components/CompetitionResults';
import TeamsOrder from '@/components/TeamsOrder';
import { getCompetitionById } from '@/lib/repo';
import { useRouter } from 'next/navigation';

export default async function CompetitionsByIdPage({ params }: { params: { id: string } }) {
  const session = await getSession();
  const router = useRouter();

  const competition = await getCompetitionById(params.id);

  return (
    <main className={styles['main']}>
      <h1 className={styles['title']}>{competition?.name}</h1>
      <h3 className={styles['sub-title']}>
        W / D / L<br />
        {competition?.win_pts.toString()} / {competition?.draw_pts.toString()} /{' '}
        {competition?.loss_pts.toString()}
      </h3>
      {session && (
        <button
          onClick={(e) => {
            e.preventDefault();
            router.back();
          }}>
          Go Back
        </button>
      )}
      <TeamsOrder competitionId={params.id} />
      <CompetitionResults competitionId={params.id} canEdit={session ? true : false} />
    </main>
  );
}
