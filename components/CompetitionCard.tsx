import styles from './CompetitionCard.module.css';

interface CompetitionCardProps {
  id: string;
  name: string;
  winPts: string;
  drawPts: string;
  lossPts: string;
}

export default function CompetitionCard({
  id,
  name,
  winPts,
  drawPts,
  lossPts
}: CompetitionCardProps) {
  return (
    <div className={styles['competition-card']}>
      <h3>{name}</h3>
      <div>
        Scoring system: <i>{`${winPts} / ${drawPts} / ${lossPts}`}</i>
      </div>
      <div>
        Competition Page URL:{' '}
        <i>
          <a
            href={`${process.env.NEXT_PUBLIC_API_URL}/competition/${id}`}>{`${process.env.NEXT_PUBLIC_API_URL}/competition/${id}`}</a>
        </i>
      </div>
    </div>
  );
}
