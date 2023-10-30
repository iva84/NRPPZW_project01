import { getCompetitionById, getTeamsByCompetition } from '@/lib/repo';
import styles from './TeamsOrder.module.css';
import OrderCard from './OrderCard';

interface TeamsOrderProps {
  competitionId: string;
}

async function getOrder(competitionId: string) {
  const competition = await getCompetitionById(competitionId);
  if (!competition) {
    return [];
  }

  const teams = await getTeamsByCompetition(competitionId);
  if (!teams) {
    return [];
  }

  const order = teams.map((team) => {
    const totalScore =
      (team.win ?? 0) * Number(competition.win_pts) +
      (team.draw ?? 0) * Number(competition.draw_pts) +
      (team.loss ?? 0) * Number(competition.loss_pts);
    return { ...team, totalScore: totalScore };
  });

  return order.sort((a, b) => b.totalScore - a.totalScore);
}

export default async function TeamsOrder({ competitionId }: TeamsOrderProps) {
  const orders = await getOrder(competitionId);

  return (
    <div>
      <h3 className={styles['title']}>Order:</h3>
      <div>
        {orders.map((order, index) => {
          return (
            <OrderCard
              key={order.id}
              index={index}
              name={order.name}
              win={order.win ?? 0}
              draw={order.draw ?? 0}
              loss={order.loss ?? 0}
              totalScore={order.totalScore}
            />
          );
        })}
      </div>
    </div>
  );
}
