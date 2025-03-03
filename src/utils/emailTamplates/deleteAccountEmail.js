"use strict";

module.exports.deleteAccountEmail = (username) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Farewell from Soul Journey</title>
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
        .message-box {
          background-color: #F6F4F0;
          border-left: 4px solid #4DA1A9;
          padding: 20px;
          margin: 20px 0;
          border-radius: 0 8px 8px 0;
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
        .feedback-box {
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
        .return-info {
          background-color: #f8f9fa;
          border-radius: 8px;
          padding: 20px;
          margin: 20px 0;
        }
        .return-info h3 {
          color: #2E5077;
          margin-top: 0;
          margin-bottom: 10px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 class="logo">Soul Journey</h1>
        </div>
        
        <div class="content">
          <h2 class="greeting">Goodbye for now, ${username}</h2>
          
          <div class="message-box">
            <p style="margin-top: 0;">We're sad to see you go, but we want you to know that your account has been successfully deleted as requested. Thank you for being part of our community and trusting us with your personal growth journey.</p>
          </div>

          <p>We hope that Soul Journey has contributed positively to your well-being during our time together. Your mental health journey is important to us, and we respect your decision to move forward in a different direction.</p>

          <div class="return-info">
            <h3>Thinking of Coming Back?</h3>
            <p style="margin-bottom: 0;">We'll always welcome you back with open arms. If you decide to return, simply create a new account using your email address, and we'll help you get started again. Your future well-being matters to us, and our doors remain open for you.</p>
          </div>

          <div class="feedback-box">
            <p style="margin: 0;">Would you mind sharing what we could have done better? Your feedback helps us improve our service for others. Feel free to send your thoughts to <a href="mailto:team.souljourney@gmail.com" style="color: #4DA1A9;">team.souljourney@gmail.com</a></p>
          </div>

          <div class="divider"></div>

          <p>Remember that investing in your mental health is always worthwhile, whether with us or through another path. We wish you the very best on your continued journey.</p>
          
          <p style="margin-top: 30px;">With warm regards,<br>The Soul Journey Team</p>
        </div>
        
        <div class="footer">
          <p class="copyright">&copy; ${new Date().getFullYear()} Soul Journey. All rights reserved.</p>
          <p class="help-text">If you change your mind or need support, we're here at <a href="mailto:team.souljourney@gmail.com" style="color: #4DA1A9;">team.souljourney@gmail.com</a></p>
        </div>
      </div>
    </body>
    </html>
  `;
};