import { getMatchesByCompetitionId, getTeamById } from '@/lib/repo';
import styles from './CompetitionResults.module.css';
import MatchCard from './MatchCard';

interface CompetitionResultsProps {
  competitionId: string;
  canEdit: boolean;
}

export default async function CompetitionResults({
  competitionId,
  canEdit
}: CompetitionResultsProps) {
  // prikaz matcheva i rezultata matcheva
  const matches = await getMatchesByCompetitionId(competitionId);

  if (!matches) {
    return <></>;
  }

  return (
    <div>
      <h3 className={styles['title']}>Results by match:</h3>
      {matches.map(async (match) => {
        const team1 = await getTeamById(match.team1_id);
        const team2 = await getTeamById(match.team2_id);
        if (team1 && team2) {
          return (
            <MatchCard
              key={match.id}
              id={match.id}
              round={match.match_round}
              team1Name={team1.name}
              team2Name={team2.name}
              team1Score={match.team1_score ? match.team1_score.toString() : 'x'}
              team2Score={match.team2_score ? match.team2_score.toString() : 'x'}
              canEdit={canEdit}
            />
          );
        }
        return <></>;
      })}
    </div>
  );
}

/*
  return (
    <div>
      {matches.map(async (match) => {
        // fetch teams
        const team1 = await getTeamById(match.team1_id);
        const team2 = await getTeamById(match.team2_id);

        return (
          <div key={match.id}>
            <span>{team1?.name}</span>
            <span>{match.team1_score ? match.team1_score.toString() : 'x'}</span>
            <span></span>
            <span>{match.team2_score ? match.team2_score.toString() : 'x'}</span>
            <span>{team2?.name}</span>
          </div>
        );
      })}
    </div>
  );
  */
