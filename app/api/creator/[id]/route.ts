import { NextResponse } from 'next/server';

// think that we do not need this, we will never fetch creator to display their info
export async function GET() {
  try {
  } catch (err: any) {
    console.error(err);
  }

  return NextResponse.json({});
}
