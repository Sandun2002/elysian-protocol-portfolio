// src/app/api/send-email/route.ts
import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const { name, email, message } = await request.json();

  try {
    const data = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>', 
      to: 'sandungunathilaka2002@gmail.com', 
      subject: `New Message from ${name} via Portfolio`,
      reply_to: email,
      html: `<p>Name: ${name}</p><p>Email: ${email}</p><p>Message: ${message}</p>`,
    });

    return NextResponse.json({ message: "Email sent successfully!", data });
  } catch (error) {
    return NextResponse.json({ message: "Error sending email", error }, { status: 500 });
  }
}