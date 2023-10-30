import { NextResponse } from 'next/server';

// think that we do not need this, we will never fetch all creators
export async function GET() {
  try {
  } catch (err: any) {
    console.error(err);
  }

  return NextResponse.json({});
}
