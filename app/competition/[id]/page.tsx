import { getSession } from '@auth0/nextjs-auth0';
import styles from './page.module.css';
import CompetitionResults from '@/components/CompetitionResults';
import TeamsOrder from '@/components/TeamsOrder';
import { getCompetitionById, getCreator } from '@/lib/repo';

async function checkIfCreator(email: string, competitionId: string) {
  const creator = await getCreator(competitionId);
  if (creator && creator.email === email) {
    return true;
  }
  return false;
}

export default async function CompetitionsByIdPage({ params }: { params: { id: string } }) {
  const session = await getSession();
  const canEdit = session ? await checkIfCreator(session.user.email, params.id) : false;
  const competition = await getCompetitionById(params.id);

  return (
    <main className={styles['main']}>
      <h1 className={styles['title']}>{competition?.name}</h1>
      <h3 className={styles['sub-title']}>
        W / D / L<br />
        {competition?.win_pts.toString()} / {competition?.draw_pts.toString()} /{' '}
        {competition?.loss_pts.toString()}
      </h3>
      <TeamsOrder competitionId={params.id} />
      <CompetitionResults competitionId={params.id} canEdit={canEdit} />
    </main>
  );
}
