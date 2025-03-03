"use strict";

module.exports.changePasswordEmail = (userName, timestamp = new Date()) => {
  // Format the timestamp
  const formattedDate = new Date(timestamp).toLocaleString('en-US', {
    dateStyle: 'long',
    timeStyle: 'short'
  });

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Password Changed - Soul Journey</title>
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
        .confirmation-box {
          background-color: #edf7f0;
          border-left: 4px solid #79D7B8;
          padding: 15px;
          margin: 20px 0;
          border-radius: 0 8px 8px 0;
        }
        .timestamp {
          background-color: #F6F4F0;
          padding: 12px;
          border-radius: 6px;
          color: #2E5077;
          font-size: 14px;
          margin: 20px 0;
          text-align: center;
        }
        .security-notice {
          background-color: #fff3f3;
          border-left: 4px solid #D798B0;
          padding: 15px;
          margin: 20px 0;
          color: #8F5B8A;
        }
        .security-notice strong {
          display: block;
          margin-bottom: 5px;
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
          <h2 class="greeting">Hello ${userName},</h2>
          
          <div class="confirmation-box">
            <p style="margin: 0;">Your Soul Journey account password has been successfully changed.</p>
          </div>

          <div class="timestamp">
            Password changed on: ${formattedDate}
          </div>
          
          <p>This email confirms that your password was changed from the account settings page. If you made this change, no further action is required.</p>

          <div class="security-notice">
            <strong>Didn't change your password?</strong>
            <p style="margin: 0; font-size: 14px;">
              If you didn't make this change, please secure your account immediately:
              <ol style="margin: 10px 0 0 0; padding-left: 20px;">
                <li>Reset your password right away</li>
                <li>Review your recent account activity</li>
                <li>Contact our support team</li>
              </ol>
            </p>
          </div>

          <div class="button-container">
            <a href="https://team.souljourney.com" class="button">Review Account Security</a>
          </div>

          <p>For your security, we recommend:</p>
          <ul style="color: #2f3132; margin-bottom: 20px;">
            <li>Using a unique password that you don't use for other accounts</li>
            <li>Enabling two-factor authentication if available</li>
            <li>Regularly checking your account for any unusual activity</li>
          </ul>

          <p style="margin-top: 30px;">Best regards,<br>The Soul Journey Team</p>
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