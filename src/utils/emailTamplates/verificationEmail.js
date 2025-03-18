"use strict";

/* ------------------------------------------------- */
/*                  SOULJOURNEY API                  */
/* ------------------------------------------------- */

module.exports.verificationEmail = (username, verificationUrl) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Verify Your Email - Soul Journey</title>
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
        .button-container {
          text-align: center;
          margin: 30px 0;
        }
        .button {
          display: inline-block;
          padding: 14px 30px;
          background-color:rgb(4, 87, 59);
          color: white !important;
          text-decoration: none;
          border-radius: 8px;
          font-weight: bold;
          font-size: 16px;
          transition: background-color 0.3s;
        }
        .button:hover {
          background-color: #c2899e;
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
        .urgent-notice {
          background-color: #fff3f3;
          border-left: 4px solid #D798B0;
          padding: 12px;
          margin: 20px 0;
          color: #8F5B8A;
          font-size: 14px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 class="logo">Soul Journey</h1>
        </div>
        <div class="content">
          <h2 class="greeting">Welcome, ${username}!</h2>
          <p>Thank you for choosing <strong>Soul Journey</strong> as your partner in personal growth and well-being. We're here to support you on your journey to inner harmony.</p>
          <p>To begin your therapeutic journey and access our services, please verify your email address by clicking the button below:</p>
          
          <div class="button-container">
            <a href="${verificationUrl}" class="button">Verify My Email</a>
          </div>
          
          <div class="urgent-notice">
            <strong>Important:</strong> This verification link will expire in 10 minutes for your security.
          </div>
          
          <div class="divider"></div>
          
          <p>Once verified, you'll have access to:</p>
          <ul style="color: #2f3132; line-height: 1.6;">
            <li>Schedule video therapy sessions with licensed professionals</li>
            <li>Access secure chat support</li>
            <li>Book and manage your appointments</li>
            <li>Access therapeutic resources and self-help tools</li>
          </ul>
          
          <p>If you're having trouble with the button above, copy and paste this URL into your browser:</p>
          <p style="word-break: break-all; font-size: 14px; color: #4DA1A9;">${verificationUrl}</p>
          
          <p>If you didn't create an account with Soul Journey, please ignore this email.</p>
        </div>
        
        <div class="footer">
          <p class="copyright">&copy; ${new Date().getFullYear()} Soul Journey. All rights reserved.</p>
          <p class="help-text">Need support? Contact us at <a href="mailto:team.souljourney@gmail.com" style="color: #4DA1A9;">team.souljourney@gmail.com</a></p>
        </div>
      </div>
    </body>
    </html>
  `;
};
