import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, date, time, service, message, price } = body;

    // Validate required fields
    if (!name || !email || !date || !time || !service || !price) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Format the appointment date and time
    const appointmentDateTime = new Date(`${date}T${time}`);
    const formattedDate = appointmentDateTime.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    const formattedTime = appointmentDateTime.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });

    // Send email to yourself (notification)
    await resend.emails.send({
      from: "Portfolio Appointment <onboarding@resend.dev>",
      to: ["canbek0104@gmail.com"],
      subject: `New €${price} Appointment - ${service}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #333; margin-bottom: 20px; border-bottom: 2px solid #3B82F6; padding-bottom: 10px;">
              📅 New Appointment Request
            </h2>
            
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 8px; margin-bottom: 20px; color: white;">
              <h3 style="margin: 0 0 10px 0; font-size: 18px;">Appointment Details</h3>
              <p style="margin: 5px 0; font-size: 16px;"><strong>📅 Date:</strong> ${formattedDate}</p>
              <p style="margin: 5px 0; font-size: 16px;"><strong>🕒 Time:</strong> ${formattedTime} (CET)</p>
              <p style="margin: 5px 0; font-size: 16px;"><strong>🔧 Service:</strong> ${service}</p>
              <p style="margin: 5px 0; font-size: 18px;"><strong>💰 Price:</strong> €${price}</p>
            </div>

            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h3 style="color: #333; margin-bottom: 15px;">Contact Information</h3>
              <p style="margin: 8px 0; color: #555;"><strong>👤 Name:</strong> ${name}</p>
              <p style="margin: 8px 0; color: #555;"><strong>📧 Email:</strong> 
                <a href="mailto:${email}" style="color: #3B82F6; text-decoration: none;">${email}</a>
              </p>
              ${phone ? `<p style="margin: 8px 0; color: #555;"><strong>📞 Phone:</strong> ${phone}</p>` : ''}
            </div>

            ${message ? `
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h3 style="color: #333; margin-bottom: 15px;">Additional Message</h3>
              <p style="color: #555; line-height: 1.6; white-space: pre-wrap;">${message}</p>
            </div>
            ` : ''}

            <div style="background-color: #e7f3ff; padding: 20px; border-radius: 8px; border-left: 4px solid #3B82F6;">
              <p style="margin: 0; color: #1e40af; font-size: 14px;">
                <strong>💡 Next Steps:</strong><br>
                1. Reply to confirm the appointment<br>
                2. Send calendar invite with meeting details<br>
                3. Prepare agenda based on the service type
              </p>
            </div>
          </div>
        </div>
      `,
    });

    // Send confirmation email to the client
    await resend.emails.send({
      from: "Can Bekiroglu <onboarding@resend.dev>",
      to: [email],
      subject: `Appointment Request Received - ${formattedDate}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #333; margin-bottom: 20px; text-align: center;">
              Thank you for your appointment request! 🎉
            </h2>
            
            <p style="color: #555; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
              Hi ${name},
            </p>
            
            <p style="color: #555; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
              I've received your appointment request and I'm excited to discuss your project with you!
            </p>

            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 8px; margin: 20px 0; color: white;">
              <h3 style="margin: 0 0 15px 0; text-align: center;">Appointment Summary</h3>
              <p style="margin: 8px 0; text-align: center;"><strong>📅 Date:</strong> ${formattedDate}</p>
              <p style="margin: 8px 0; text-align: center;"><strong>🕒 Time:</strong> ${formattedTime} (CET)</p>
              <p style="margin: 8px 0; text-align: center;"><strong>🔧 Service:</strong> ${service}</p>
              <p style="margin: 8px 0; text-align: center; font-size: 18px;"><strong>💰 Total Paid:</strong> €${price}</p>
            </div>

            <div style="background-color: #f0f7ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3B82F6;">
              <h3 style="color: #1e40af; margin-bottom: 15px;">What happens next?</h3>
              <ul style="color: #374151; margin: 0; padding-left: 20px;">
                <li style="margin-bottom: 8px;">I'll review your request and confirm the appointment within 24 hours</li>
                <li style="margin-bottom: 8px;">You'll receive a calendar invite with the meeting link</li>
                <li style="margin-bottom: 8px;">We can meet via Google Meet, Zoom, or in-person if you're in the Duisburg area</li>
                <li>Feel free to prepare any questions or materials you'd like to discuss</li>
              </ul>
            </div>

            <p style="color: #555; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
              If you have any urgent questions or need to reschedule, don't hesitate to reach out to me directly at 
              <a href="mailto:canbek0104@gmail.com" style="color: #3B82F6; text-decoration: none;">canbek0104@gmail.com</a>
            </p>

            <p style="color: #555; font-size: 16px; line-height: 1.6;">
              Looking forward to speaking with you!<br>
              <strong>Can Bekiroglu</strong><br>
              <span style="color: #888; font-size: 14px;">Software Engineer & Full-Stack Developer</span>
            </p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ 
      message: "Appointment request sent successfully" 
    });

  } catch (error) {
    console.error("Error sending appointment request:", error);
    return NextResponse.json(
      { error: "Failed to send appointment request" },
      { status: 500 }
    );
  }
} 