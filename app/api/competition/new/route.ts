import roundRobin from '@/lib/algoritam';
import { db } from '@/lib/db';
import { getCurrentUserOrCreate } from '@/lib/repo';
import { CompetitionFormInput, RoundResult } from '@/types';
import { getSession } from '@auth0/nextjs-auth0';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const formData: CompetitionFormInput = await req.json();

  //const session = await getSession();
  //if (!session) return;

  const user = await getCurrentUserOrCreate();
  if (!user) return;

  // create competition
  const competition = await db.competition.create({
    data: {
      name: formData.competitionName,
      win_pts: formData.winPts,
      draw_pts: formData.drawPts,
      loss_pts: formData.lossPts,
      creation_timestamp: new Date(Date.now()),
      creator_id: user.id,
      current_round: 0
    }
  });

  // create teams
  // TODO handle if they have a same name
  const teamNames = formData.teams;
  const teams = [];
  for (const teamName of teamNames) {
    const team = await db.team.create({
      data: {
        name: teamName.name,
        win: 0,
        draw: 0,
        loss: 0,
        competition_id: competition.id
      }
    });
    teams.push(team);
  }

  // generate competition scedule
  const scedule: RoundResult[] = roundRobin(teamNames.length);
  console.log(scedule.map((s) => console.log(s.round, s.pairs)));

  // create matches
  const matches = [];
  for (const round of scedule) {
    for (const pair of round.pairs) {
      const match = await db.match.create({
        data: {
          team1_id: teams[pair[0] - 1].id,
          team2_id: teams[pair[1] - 1].id,
          team1_score: null,
          team2_score: null,
          match_timestamp: null,
          match_round: round.round,
          competition_id: competition.id
        }
      });
      matches.push(match);
    }
  }

  return NextResponse.json({}, { status: 200 });
}
