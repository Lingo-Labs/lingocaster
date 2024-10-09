import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { recipient } = await request.json();

  const options = {
    method: 'POST',
    headers: {
      'X-API-KEY': process.env.CROSSMINT_API_KEY!,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      metadata: {
        name: "2 Day Streak",
        image: "https://avatars.githubusercontent.com/u/908687?s=200&v=4",
        description: "1 day streak."
      },
      recipient: `solana:${recipient}`
    })
  };

  try {
    const response = await fetch(`https://staging.crossmint.com/api/2022-06-09/collections/${process.env.COLLECTION_ID}/nfts`, options);
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
}