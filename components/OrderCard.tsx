import styles from './OrderCard.module.css';

interface OrderCardProps {
  index: number;
  name: string;
  win: number;
  draw: number;
  loss: number;
  totalScore: number;
}

export default function OrderCard({ index, name, win, draw, loss, totalScore }: OrderCardProps) {
  return (
    <div className={styles['order-card']}>
      <span className={styles['order-num']}>{index + 1}.</span>
      <span className={styles['name']}>{name}</span>
      <div className={styles['result']}>
        {win}
        <span>/</span>
        {draw}
        <span>/</span>
        {loss}
      </div>
      <span className={styles['total-score']}>{totalScore}</span>
    </div>
  );
}
