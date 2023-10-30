import { getSession } from '@auth0/nextjs-auth0';
import { db } from './db';
import { equal } from 'assert';

/*
export async function isUserLoggedIn() {
  const session = await getSession();
  if (!session) {
    return false;
  }
  return true;
}
*/

// only for logged in user
export async function getCurrentUserOrCreate() {
  const session = await getSession();
  if (!session) {
    return null;
  }

  try {
    let user = await db.creator.findFirst({
      where: {
        email: session.user.email
      }
    });

    if (!user) {
      user = await db.creator.create({
        data: {
          email: session.user.email as string,
          name: session.user.name as string
        }
      });
    }

    return user;
  } catch (err: any) {
    return null;
  }
}

// only for logged in user
export async function getCompetitionsByCurrentUser() {
  const session = await getSession();
  if (!session) {
    throw new Error('You do not have access!');
  }

  try {
    const user = await db.creator.findFirst({
      where: {
        email: session.user.email
      }
    });

    if (!user) {
      return null;
    }

    const competitionsByUser = await db.competition.findMany({
      where: {
        creator_id: user.id
      }
    });
    return competitionsByUser;
  } catch (err: any) {
    throw new Error(`Error occured! ${err}`);
  }
}

// for everyone
export async function getCompetitionById(id: string) {
  try {
    const competition = await db.competition.findUnique({
      where: {
        id: id
      }
    });
    return competition;
  } catch (err: any) {
    return null;
  }
}

// for everyone
export async function getMatchesByCompetitionId(competitionId: string) {
  try {
    const matches = await db.match.findMany({
      where: {
        competition_id: competitionId
      }
    });
    return matches;
  } catch (err: any) {
    return null;
  }
}

// for everyone
export async function getTeamById(id: string) {
  try {
    const team = await db.team.findUnique({
      where: {
        id: id
      }
    });
    return team;
  } catch (err: any) {
    return null;
  }
}

export async function getTeamsByCompetition(competitionId: string) {
  try {
    const team = await db.team.findMany({
      where: {
        competition_id: competitionId
      }
    });
    return team;
  } catch (err: any) {
    return null;
  }
}
