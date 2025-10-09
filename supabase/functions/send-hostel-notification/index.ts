import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface NotificationRequest {
  email: string;
  hostelName: string;
  status: "approved" | "rejected";
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, hostelName, status }: NotificationRequest = await req.json();

    console.log(`Sending ${status} notification to ${email} for ${hostelName}`);

    const subject = status === "approved" 
      ? `Congratulations! Your Hostel "${hostelName}" has been Approved`
      : `Update on Your Hostel Application - "${hostelName}"`;

    const html = status === "approved"
      ? `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #22c55e;">Congratulations!</h1>
          <p>Great news! Your hostel <strong>${hostelName}</strong> has been approved and is now live on HostelHub.</p>
          <p>Students can now discover and book your hostel. You'll start receiving booking requests shortly.</p>
          <h3>What's Next?</h3>
          <ul>
            <li>Keep your availability updated</li>
            <li>Respond promptly to booking inquiries</li>
            <li>Maintain your hostel's rating by providing excellent service</li>
          </ul>
          <p>Thank you for choosing HostelHub!</p>
          <p style="color: #666; font-size: 12px; margin-top: 30px;">
            If you have any questions, reply to this email or contact our support team.
          </p>
        </div>
      `
      : `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #ef4444;">Application Update</h1>
          <p>Thank you for your interest in listing <strong>${hostelName}</strong> on HostelHub.</p>
          <p>After careful review, we're unable to approve your hostel listing at this time.</p>
          <h3>Common reasons for rejection:</h3>
          <ul>
            <li>Incomplete or inaccurate information</li>
            <li>Photos don't meet quality standards</li>
            <li>Location or facilities don't match our criteria</li>
          </ul>
          <p>You're welcome to resubmit your application with updated information.</p>
          <p>Thank you for your understanding.</p>
          <p style="color: #666; font-size: 12px; margin-top: 30px;">
            If you have questions about this decision, please contact our support team.
          </p>
        </div>
      `;

    // Simulate email sending (replace with actual email service when ready)
    console.log("=== EMAIL NOTIFICATION ===");
    console.log("To:", email);
    console.log("Subject:", subject);
    console.log("HTML:", html);
    console.log("========================");

    const response = {
      success: true,
      message: "Notification logged (email service placeholder)",
      to: email,
      subject: subject,
    };

    console.log("Email notification processed:", response);

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-hostel-notification function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
