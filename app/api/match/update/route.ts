import { db } from '@/lib/db';
import { getCurrentUserOrCreate } from '@/lib/repo';
import { TeamScoreInput } from '@/types';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const formData: TeamScoreInput = await req.json();

  //const session = await getSession();
  //if (!session) return;

  const user = await getCurrentUserOrCreate();
  if (!user) return;

  // update match
  const match = await db.match.update({
    where: {
      id: formData.matchId
    },
    data: {
      team1_score: formData.team1Score,
      team2_score: formData.team2Score
    }
  });

  const updateWin = {
    win: {
      increment: 1
    }
  };
  const updateDraw = {
    draw: {
      increment: 1
    }
  };
  const updateLoss = {
    loss: {
      increment: 1
    }
  };

  let team1Data;
  let team2Data;

  const draw: boolean = Number(formData.team1Score) === Number(formData.team2Score);
  if (draw) {
    team1Data = updateDraw;
    team2Data = updateDraw;
  } else if (Number(formData.team1Score) > Number(formData.team2Score)) {
    team1Data = updateWin;
    team2Data = updateLoss;
  } else {
    team1Data = updateLoss;
    team2Data = updateWin;
  }

  const team1Update = await db.team.update({
    where: {
      id: match.team1_id
    },
    data: team1Data
  });

  const team2Update = await db.team.update({
    where: {
      id: match.team2_id
    },
    data: team2Data
  });

  return NextResponse.json({}, { status: 200 });
}
