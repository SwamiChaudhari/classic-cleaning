import { NextResponse } from 'next/server';

const subscribers: string[] = [];

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const { email } = body;

  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
  }

  if (subscribers.includes(email)) {
    return NextResponse.json({ error: 'Already subscribed' }, { status: 409 });
  }

  subscribers.push(email);
  return NextResponse.json({ success: true, message: 'Subscribed successfully!' });
}

export async function GET() {
  return NextResponse.json({ count: subscribers.length });
}
