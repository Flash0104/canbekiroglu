import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  console.log("📧 Contact API route hit!");
  
  const { name, email, subject, message } = await req.json();
  console.log("📝 Form data:", { name, email, subject, message });

  try {
    console.log("🔑 API Key exists:", !!process.env.RESEND_API_KEY);
    
    const data = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "canbek0104@gmail.com",
      subject: `[Portfolio] ${subject}`,
      replyTo: email,
      html: `
        <h2>New message from your portfolio</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br/>${message.replace(/\n/g, "<br/>")}</p>
      `,
    });

    console.log("✅ Email sent successfully:", data);
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("❌ Email send error:", error);
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
} 