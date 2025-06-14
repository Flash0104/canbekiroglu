import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Log the form submission
    console.log('📧 Contact form submission:', {
      name,
      email,
      subject,
      message,
      timestamp: new Date().toISOString(),
    });

    // Send email using Resend (if API key is configured)
    if (process.env.RESEND_API_KEY) {
      try {
        const emailData = await resend.emails.send({
          from: 'Portfolio Contact <onboarding@resend.dev>',
          to: 'canbek0104@gmail.com',
          subject: `[Portfolio] ${subject}`,
          replyTo: email,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #333; border-bottom: 2px solid #e1e5e9; padding-bottom: 10px;">
                New message from your portfolio
              </h2>
              <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
                <p style="margin: 10px 0;"><strong>Email:</strong> ${email}</p>
                <p style="margin: 10px 0;"><strong>Subject:</strong> ${subject}</p>
              </div>
              <div style="margin: 20px 0;">
                <h3 style="color: #333;">Message:</h3>
                <div style="background: white; padding: 15px; border-left: 4px solid #007bff; border-radius: 4px;">
                  ${message.replace(/\n/g, '<br/>')}
                </div>
              </div>
              <hr style="margin: 30px 0; border: none; border-top: 1px solid #e1e5e9;">
              <p style="color: #666; font-size: 14px;">
                This message was sent from your portfolio contact form.
              </p>
            </div>
          `,
        });

        console.log('✅ Email sent successfully:', emailData);
        
        return NextResponse.json(
          { 
            message: 'Message sent successfully',
            data: { name, email, subject },
            emailSent: true
          },
          { status: 200 }
        );
      } catch (emailError) {
        console.error('❌ Email send error:', emailError);
        
        // Still return success but indicate email wasn't sent
        return NextResponse.json(
          { 
            message: 'Message received but email notification failed',
            data: { name, email, subject },
            emailSent: false,
            emailError: (emailError as Error).message
          },
          { status: 200 }
        );
      }
    } else {
      console.log('⚠️ No RESEND_API_KEY configured, email not sent');
      
      return NextResponse.json(
        { 
          message: 'Message received successfully',
          data: { name, email, subject },
          emailSent: false,
          note: 'Email notifications not configured'
        },
        { status: 200 }
      );
    }

  } catch (error) {
    console.error('❌ Error processing contact form:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 