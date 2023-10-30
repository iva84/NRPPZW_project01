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

/*
import { getCompetitionsByUser, getUserByEmail } from '@/lib/repo';
import { getSession } from '@auth0/nextjs-auth0';
import { NextResponse } from 'next/server';

// fetch all competitions created by current user
export async function GET() {
  const session = await getSession();

  if (!session) {
    return NextResponse.json(
      { error: 'Bad request!' },
      {
        status: 400
      }
    );
  }

  try {
    const user = await getUserByEmail();
    if (!user) {
      return NextResponse.json(
        { error: 'User does not exist!' },
        {
          status: 404
        }
      );
    }

    const competitionsByUser = await getCompetitionsByUser(user.id);
    return NextResponse.json(competitionsByUser);
  } catch (err: any) {
    return NextResponse.json(
      { error: `Error occured while fetching data! ${err}` },
      {
        status: 404
      }
    );
  }
}

*/
