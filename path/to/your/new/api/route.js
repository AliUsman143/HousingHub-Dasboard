// Create a new file, for example: e:\Web Development\Project\househub2\frontend\src\app\api\verify-payment\route.js
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import UserSign from '@/models/usersign'; // Adjust path as per your UserSign model location

export async function POST(req) {
  try {
    const { sessionId } = await req.json();
    
    // Ensure mongoose is connected if not already
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGO_URI);
    }
    
    const user = await UserSign.findOne({
      'subscriptions.stripeSessionId': sessionId 
    });
    
    if (user && user.payment) {
      return NextResponse.json({ success: true, payment: true });
    }
    
    return NextResponse.json({ success: false, payment: false });
  } catch (error) {
    console.error('Error verifying payment:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}