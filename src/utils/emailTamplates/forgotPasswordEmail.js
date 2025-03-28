"use strict";

/* ------------------------------------------------- */
/*                  SOULJOURNEY API                  */
/* ------------------------------------------------- */

module.exports.forgotPasswordEmail = (userName, resetURL, verificationCode) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Reset Your Password - Soul Journey</title>
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
        .verification-code-box {
          background-color: #F6F4F0;
          border: 2px dashed #4DA1A9;
          border-radius: 8px;
          padding: 20px;
          margin: 20px 0;
          text-align: center;
        }
        .verification-code {
          font-size: 32px;
          letter-spacing: 4px;
          color: #2E5077;
          font-weight: bold;
          margin: 10px 0;
          font-family: monospace;
        }
        .code-label {
          color: #8F5B8A;
          font-size: 14px;
          margin-bottom: 5px;
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
        .method-divider {
          text-align: center;
          margin: 30px 0;
          position: relative;
        }
        .method-divider::before {
          content: "";
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          height: 1px;
          background-color: #dddcd8;
          z-index: 1;
        }
        .method-divider span {
          background-color: white;
          padding: 0 15px;
          color: #6c757d;
          position: relative;
          z-index: 2;
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
          <h2 class="greeting">Password Reset Request</h2>
          
          <p>Hello ${userName},</p>
          
          <p>We received a request to reset the password for your Soul Journey account. You can reset your password using either the verification code or the button below:</p>

          <div class="verification-code-box">
            <div class="code-label">Your Verification Code</div>
            <div class="verification-code">${verificationCode}</div>
            <div style="font-size: 14px; color: #6c757d;">Enter this code on the password reset page</div>
          </div>
          
          <div class="method-divider">
            <span>OR</span>
          </div>

          <div class="button-container">
            <a href="${resetURL}" class="button">Reset Password</a>
          </div>
          
          <div class="security-notice">
            <strong>Important Security Information:</strong>
            <ul style="margin: 0; padding-left: 20px; color: #2f3132;">
              <li>Both the verification code and link will expire in 10 minutes</li>
              <li>If you didn't request this password reset, please ignore this email</li>
              <li>For additional security, consider changing your password regularly</li>
              <li>Never share your verification code with anyone</li>
            </ul>
          </div>

          <div class="divider"></div>
          
          <p>If you're having trouble with the button above, copy and paste this URL into your browser:</p>
          <p style="word-break: break-all; font-size: 14px; color: #4DA1A9;">${resetURL}</p>
          
          <p>For your security, this password reset link and code can only be used once. If you need to reset your password again, please visit <a href="https://souljourney.com/forgot-password" style="color: #4DA1A9;">our forgot password page</a> and submit a new request.</p>

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
