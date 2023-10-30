import styles from './LinkCard.module.css';

interface LinkCardProps {
  path: string;
  label: string;
  description?: string;
}

export default function LinkCard({ path, label, description }: LinkCardProps) {
  return (
    <a href={path} className={styles['card']}>
      <h2>{label}</h2>
      {description && <p>{description}</p>}
    </a>
  );
}
