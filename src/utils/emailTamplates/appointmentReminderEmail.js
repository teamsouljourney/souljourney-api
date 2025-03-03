"use strict";

module.exports.appointmentReminderTemplate = (
  username,
  therapistName,
  appointmentDate,
  appointmentTime,
  meetingLink,
  appointmentType = "Video Session" // or "In-Person"
) => {
  // Convert date string to Date object for formatting
  const date = new Date(appointmentDate);
  const formattedDate = date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Your Upcoming Session - Soul Journey</title>
      <style>
        body {
          font-family: 'Urbanist', Arial, sans-serif;
          background-color: #F7F7F7;
          margin: 0;
          padding: 0;
          color: #181a1b;
        }
        .container {
          max-width: 600px;
          margin: 20px auto;
          background-color: #F6F4F0;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
        }
        .header {
          background-color: #2E5077;
          padding: 30px 20px;
          text-align: center;
          color: white;
        }
        .logo {
          font-size: 28px;
          font-weight: bold;
          color: #79D7B8;
          margin: 0;
          letter-spacing: 1px;
        }
        .content {
          padding: 30px;
          background-color: white;
        }
        .greeting {
          font-size: 22px;
          color: #8F5B8A;
          margin-bottom: 20px;
          font-weight: 600;
        }
        p {
          font-size: 16px;
          line-height: 1.6;
          color: #2f3132;
          margin-bottom: 20px;
        }
        .appointment-box {
          background-color: #F6F4F0;
          border-radius: 8px;
          padding: 20px;
          margin: 20px 0;
          border-left: 4px solid #4DA1A9;
        }
        .appointment-details {
          margin: 0;
          padding: 0;
          list-style: none;
        }
        .appointment-details li {
          display: flex;
          margin-bottom: 12px;
          color: #2f3132;
          align-items: center;
        }
        .detail-label {
          width: 100px;
          font-weight: 600;
          color: #2E5077;
        }
        .button-container {
          text-align: center;
          margin: 30px 0;
        }
        .button {
          display: inline-block;
          padding: 14px 30px;
          background-color: #D798B0;
          color: white;
          text-decoration: none;
          border-radius: 8px;
          font-weight: bold;
          font-size: 16px;
          transition: background-color 0.3s;
        }
        .button:hover {
          background-color: #c2899e;
        }
        .preparation-box {
          background-color: #f8f9fa;
          border-radius: 8px;
          padding: 20px;
          margin: 20px 0;
        }
        .preparation-title {
          color: #2E5077;
          font-size: 18px;
          margin-bottom: 15px;
          font-weight: 600;
        }
        .preparation-list {
          margin: 0;
          padding-left: 20px;
          color: #2f3132;
        }
        .preparation-list li {
          margin-bottom: 8px;
        }
        .notice-box {
          background-color: #fff3f3;
          border-left: 4px solid #D798B0;
          padding: 15px;
          margin: 20px 0;
          color: #8F5B8A;
        }
        .divider {
          height: 1px;
          background-color: #dddcd8;
          margin: 30px 0;
        }
        .footer {
          background-color: #F6F4F0;
          padding: 20px;
          text-align: center;
        }
        .copyright {
          font-size: 14px;
          color: #81527c;
        }
        .help-text {
          font-size: 14px;
          color: #6c757d;
          margin-top: 15px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 class="logo">Soul Journey</h1>
        </div>
        
        <div class="content">
          <h2 class="greeting">Hello ${username},</h2>
          
          <p>This is a friendly reminder about your upcoming therapy session with ${therapistName}.</p>
          
          <div class="appointment-box">
            <ul class="appointment-details">
              <li>
                <span class="detail-label">Date:</span>
                <span>${formattedDate}</span>
              </li>
              <li>
                <span class="detail-label">Time:</span>
                <span>${appointmentTime}</span>
              </li>
              <li>
                <span class="detail-label">Type:</span>
                <span>${appointmentType}</span>
              </li>
              <li>
                <span class="detail-label">With:</span>
                <span>${therapistName}</span>
              </li>
            </ul>
          </div>

          ${appointmentType === "Video Session" ? `
          <div class="button-container">
            <a href="${meetingLink}" class="button">Join Session</a>
          </div>
          ` : ''}
          
          <div class="preparation-box">
            <h3 class="preparation-title">Preparing for Your Session</h3>
            <ul class="preparation-list">
              <li>Find a quiet, private space where you won't be interrupted</li>
              <li>Test your internet connection if joining online</li>
              <li>Have water or tea nearby</li>
              <li>Take a few deep breaths before we begin</li>
              <li>Consider writing down any topics you'd like to discuss</li>
            </ul>
          </div>

          <div class="notice-box">
            <strong>Cancellation Policy:</strong>
            <p style="margin: 10px 0 0 0; font-size: 14px;">
              If you need to reschedule or cancel, please do so at least 24 hours before your appointment to avoid any cancellation fees. You can manage your appointments through your Soul Journey dashboard.
            </p>
          </div>

          ${appointmentType === "Video Session" ? `
          <p>Having technical issues? Test your connection before the session here: <a href="https://souljourney.com/test-connection" style="color: #4DA1A9;">Connection Test</a></p>
          ` : ''}

          <div class="divider"></div>

          <p>We look forward to supporting you in your journey.</p>
          
          <p style="margin-top: 30px;">Warm regards,<br>The Soul Journey Team</p>
        </div>
        
        <div class="footer">
          <p class="copyright">&copy; ${new Date().getFullYear()} Soul Journey. All rights reserved.</p>
          <p class="help-text">Need assistance? Contact us at <a href="mailto:team.souljourney@gmail.com" style="color: #4DA1A9;">team.souljourney@gmail.com</a></p>
        </div>
      </div>
    </body>
    </html>
  `;
};