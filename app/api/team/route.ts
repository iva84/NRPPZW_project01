import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

// fetch all competitions by current user
export async function GET(req: NextRequest) {
  // fetch competitions that user creates
  try {
    const allTeams = await db.team.findMany();
    return NextResponse.json(allTeams);
  } catch (err: any) {
    console.error(err);
  }
}
