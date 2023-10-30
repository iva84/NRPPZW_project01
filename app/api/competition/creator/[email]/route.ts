import { getCompetitionsByCurrentUser } from '@/lib/repo';
import { getSession } from '@auth0/nextjs-auth0';
import { NextResponse } from 'next/server';

// fetch all competitions created by current user
export async function GET() {
  const session = await getSession();

  if (!session) {
    return NextResponse.json(
      { error: 'Not Allowed!' },
      {
        status: 405
      }
    );
  }

  try {
    const currentUserCompetitions = await getCompetitionsByCurrentUser();
    return NextResponse.json(currentUserCompetitions);
  } catch (err: any) {
    return NextResponse.json(
      { error: `Error occured while fetching data! ${err}` },
      {
        status: 404
      }
    );
  }
}
