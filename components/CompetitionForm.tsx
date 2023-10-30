'use client';

import { useEffect } from 'react';
import styles from './CompetitionForm.module.css';
import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form';
import { CompetitionFormInput } from '@/types';
import { useRouter } from 'next/navigation';

export default function CompetitionForm() {
  const { register, control, handleSubmit } = useForm<CompetitionFormInput>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'teams'
  });
  const router = useRouter();

  useEffect(() => {
    remove(0);
  }, [remove]);

  const handleSave: SubmitHandler<CompetitionFormInput> = (formValues, event) => {
    event?.preventDefault();

    fetch('/api/competition/new', {
      method: 'POST',
      body: JSON.stringify(formValues)
    }).then((res) => {
      if (res.ok) {
        router.replace('/competition/creator');
      }
      // else handle error
    });
  };

  return (
    <form className={styles['form']} onSubmit={handleSubmit(handleSave)}>
      <div className={styles['form-group']}>
        <label className={styles['label-primary']}>Competition name</label>
        <input className={styles['form-input']} {...register('competitionName')} type="text" />
      </div>
      <div className={styles['form-group']}>
        <label className={styles['label-primary']}>Scoring system</label>
        <div className={styles['form-inner-group']}>
          <label className={styles['label-secondary']}>Win:</label>
          <input
            className={styles['form-input']}
            {...register('winPts')}
            type="text"
            pattern="^\d*(\.\d{0,2})?$"
          />
        </div>
        <div className={styles['form-inner-group']}>
          <label className={styles['label-secondary']}>Draw:</label>
          <input
            className={styles['form-input']}
            {...register('drawPts')}
            type="text"
            pattern="^\d*(\.\d{0,2})?$"
          />
        </div>
        <div className={styles['form-inner-group']}>
          <label className={styles['label-secondary']}>Loss:</label>
          <input
            className={styles['form-input']}
            {...register('lossPts')}
            type="text"
            pattern="^\d*(\.\d{0,2})?$"
          />
        </div>
      </div>
      <div className={styles['form-group']}>
        <label className={styles['label-primary']}>Teams (must be at least two)</label>
        <div className={styles['team-input-container']}>
          {fields.map((field, index) => (
            <div className={styles['form-inner-group']} key={field.id}>
              <label className={styles['label-secondary']}>Team {index + 1}:</label>
              <input
                className={styles['form-input']}
                {...register(`teams.${index}.name`)}
                type="text"
              />
              <button
                className={styles['form-btn']}
                onClick={(e) => {
                  e.preventDefault();
                  remove(index);
                }}>
                Remove team
              </button>
            </div>
          ))}
          <button
            className={styles['form-btn']}
            onClick={(e) => {
              e.preventDefault();
              append({ name: '' });
            }}>
            Add team
          </button>
        </div>
      </div>
      <div className={styles['form-group']}>
        <button className={styles['submit-btn']} type="submit">
          Create
        </button>
      </div>
    </form>
  );
}
