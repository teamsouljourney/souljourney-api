"use strict";

export const welcomeEmailTemplate = (username) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to Soul Journey</title>
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
        .tagline {
          color: #F6F4F0;
          font-size: 16px;
          margin-top: 10px;
        }
        .content {
          padding: 30px;
          background-color: white;
        }
        .greeting {
          font-size: 24px;
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
        .feature-box {
          background-color: #F6F4F0;
          border-left: 4px solid #4DA1A9;
          padding: 15px;
          margin: 20px 0;
          border-radius: 0 8px 8px 0;
        }
        .feature-title {
          color: #2E5077;
          font-weight: 600;
          margin-bottom: 8px;
          font-size: 18px;
        }
        .feature-text {
          color: #2f3132;
          margin: 0;
          font-size: 15px;
        }
        .cta-button {
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
        .cta-button:hover {
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
          <p class="tagline">Navigate to Inner Harmony</p>
        </div>
        
        <div class="content">
          <h2 class="greeting">Welcome to Your Journey, ${username}!</h2>
          
          <p>Thank you for joining Soul Journey. We're honored to be part of your path to mental well-being and personal growth. Our platform connects you with experienced therapists who are ready to support you through life's challenges.</p>

          <div class="feature-box">
            <h3 class="feature-title">Personalized Support</h3>
            <p class="feature-text">Each therapy session is tailored to your specific needs, ensuring you receive the right guidance and resources to thrive in your personal and professional life.</p>
          </div>

          <div class="feature-box">
            <h3 class="feature-title">Expert Guidance</h3>
            <p class="feature-text">Our licensed therapists bring trusted expertise to every session, combining evidence-based practices with personalized insights for your growth and stability.</p>
          </div>

          <div class="feature-box">
            <h3 class="feature-title">Flexible Communication</h3>
            <p class="feature-text">Connect through video sessions or secure chat, making professional support accessible whenever you need it.</p>
          </div>

          <div style="text-align: center; margin: 30px 0;">
            <a href="https://souljourney.com/dashboard" class="cta-button">Start Your Journey</a>
          </div>

          <div class="divider"></div>

          <p>Ready to begin? Here are your next steps:</p>
          <ul style="color: #2f3132; line-height: 1.6;">
            <li>Complete your profile to help us understand your needs better</li>
            <li>Browse our therapist profiles to find your ideal match</li>
            <li>Schedule your first session at a time that works for you</li>
            <li>Access our resource library for additional support tools</li>
          </ul>

          <p>Remember, your mental well-being is our priority, and we're here to support you every step of the way.</p>
        </div>
        
        <div class="footer">
          <p class="copyright">&copy; ${new Date().getFullYear()} Soul Journey. All rights reserved.</p>
          <p class="help-text">Questions? Contact us at <a href="mailto:team.souljourney@gmail.com" style="color: #4DA1A9;">team.souljourney@gmail.com</a></p>
        </div>
      </div>
    </body>
    </html>
  `;
};