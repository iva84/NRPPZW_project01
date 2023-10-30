import { getSession } from '@auth0/nextjs-auth0';
import styles from './page.module.css';
import { getCompetitionsByCurrentUser } from '@/lib/repo';
import { redirect } from 'next/navigation';
import LinkCard from '@/components/LinkCard';
import CompetitionCard from '@/components/CompetitionCard';

async function getCompetitions() {
  try {
    const currentUserCompetitions = await getCompetitionsByCurrentUser();
    return currentUserCompetitions;
  } catch (err: any) {
    console.error(`Error! ${err}`);
    return null;
  }
}

export default async function CompetitionsByUserPage() {
  const session = await getSession();
  if (!session) {
    redirect('/');
  }
  const competitions = await getCompetitions();

  return (
    <main className={styles['main']}>
      <h1>Competitions you created:</h1>
      <div className={styles['competitions-container']}>
        {competitions ? (
          competitions.map((competition) => (
            <CompetitionCard
              key={competition.id}
              id={competition.id}
              name={competition.name}
              winPts={competition.win_pts.toString()}
              drawPts={competition.draw_pts.toString()}
              lossPts={competition.loss_pts.toString()}
            />
          ))
        ) : (
          <div>You have not created any competitions yet!</div>
        )}
      </div>
      <LinkCard path="/competition/new" label="Create" description="Create new competition" />
    </main>
  );
}
