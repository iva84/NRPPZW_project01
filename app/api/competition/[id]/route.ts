import { getCompetitionById } from '@/lib/repo';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, context: { params: { id: string } }) {
  try {
    if (context.params.id === null) {
      return NextResponse.json(
        { error: 'Bad request!' },
        {
          status: 400
        }
      );
    }

    const competition = await getCompetitionById(context.params.id);
    return NextResponse.json(competition);
  } catch (err: any) {
    return NextResponse.json(
      { error: `Error occured while fetching data! ${err}` },
      {
        status: 404
      }
    );
  }
}
