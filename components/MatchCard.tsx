'use client';

import { FormEvent, useState } from 'react';
import styles from './MatchCard.module.css';
import { SubmitHandler, useForm } from 'react-hook-form';
import { TeamScoreInput } from '@/types';
import { useRouter } from 'next/navigation';

interface MatchCardProps {
  id: string;
  round: number;
  team1Name: string;
  team2Name: string;
  team1Score: string;
  team2Score: string;
  canEdit: boolean;
}

export default function MatchCard({
  id,
  round,
  team1Name,
  team2Name,
  team1Score,
  team2Score,
  canEdit
}: MatchCardProps) {
  const [editing, setEditing] = useState(false);
  const { register, handleSubmit } = useForm<TeamScoreInput>();
  const router = useRouter();

  const handleSave: SubmitHandler<TeamScoreInput> = (formValues, event) => {
    event?.preventDefault();

    fetch('/api/match/update', {
      method: 'POST',
      body: JSON.stringify({ ...formValues, matchId: id })
    })
      .then((res) => {
        if (res.ok) {
          setEditing(false);
        }
        // else handle error
      })
      .finally(() => router.refresh());
  };

  return (
    <form onSubmit={handleSubmit(handleSave)} className={styles['edit-match-card']}>
      <div className={styles['match-card']}>
        <span className={styles['round-label']}>{round}</span>
        <span>{team1Name}</span>
        <div className={styles['result']}>
          {editing ? (
            <input {...register('team1Score')} type="text" pattern="^\d*(\.\d{0,2})?$" />
          ) : (
            team1Score
          )}
          <span>-</span>
          {editing ? (
            <input {...register('team2Score')} type="text" pattern="^\d*(\.\d{0,2})?$" />
          ) : (
            team2Score
          )}
        </div>
        <span>{team2Name}</span>
      </div>
      {canEdit && (
        <>
          {editing ? (
            <button type="submit">Save</button>
          ) : (
            <button
              onClick={(e) => {
                e.preventDefault();
                setEditing(true);
              }}>
              Edit
            </button>
          )}
        </>
      )}
    </form>
  );
}
