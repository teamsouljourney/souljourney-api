# SoulJourney - Mental Health & Therapy Platform

## Project Demo

https://www.souljourney-onlinetherapy.com/

## Project Gif

![Soul_Journey](https://github.com/user-attachments/assets/838b6e7a-2c74-42f7-839d-45d88966c34d)


## Project Overview

SoulJourney is a comprehensive full-stack mental health platform designed to connect users with therapists, facilitate appointment scheduling, provide secure video calls, enable messaging, and share mental health resources through blogs. The platform aims to make mental health services more accessible while providing a user-friendly experience for both clients and therapists.

## Project Structure

### Frontend Structure

```
📦components
 ┣ 📂About - About page components
 ┣ 📂adminPanel - Admin dashboard components
 ┣ 📂appointment - Appointment management components
 ┣ 📂auth - Authentication related components
 ┣ 📂blog - Blog display components
 ┣ 📂button - Reusable button components
 ┣ 📂calendar - Calendar and scheduling components
 ┣ 📂chat - Chat functionality components
 ┣ 📂contact - Contact page components
 ┣ 📂dashboard - User dashboard components
 ┣ 📂home - Homepage components
 ┣ 📂pricing - Pricing page components
 ┣ 📂ServicesPage - Services page components
 ┣ 📂sidebar - Sidebar navigation components
 ┣ 📂team - Therapist team components
 ┣ 📂videoCall - Video call components
 ┣ 📂writeBlog - Blog creation components
 ┣ 📜CookieConsent.jsx - Cookie consent popup
 ┣ 📜Footer.jsx - Site footer
 ┣ 📜LanguageSelector.jsx - Language selection component
 ┣ 📜MoreCategories.jsx - Categories display component
 ┣ 📜Navbar.jsx - Navigation bar
 ┣ 📜ScrollToTop.jsx - Scroll to top utility
 ┣ 📜Sidebar.jsx - Main sidebar component
 ┣ 📜SoulJourneyLogo.jsx - Logo component
 ┣ 📜Switch.jsx - Toggle switch component
 ┣ 📜TabSwitch.jsx - Tab navigation component
 ┗ 📜ViewNotifications.jsx - Notifications component
```

### Backend Structure

```
📦routes
 ┣ 📜appointment.js - Appointment management routes
 ┣ 📜auth.js - Authentication routes
 ┣ 📜blog.js - Blog management routes
 ┣ 📜category.js - Category management routes
 ┣ 📜document.js - Document handling routes
 ┣ 📜feedback.js - User feedback routes
 ┣ 📜index.js - Main router configuration
 ┣ 📜message.js - Messaging system routes
 ┣ 📜notes.js - Therapist notes routes
 ┣ 📜notification.js - Notification system routes
 ┣ 📜payment.js - Payment processing routes
 ┣ 📜therapist.js - Therapist management routes
 ┣ 📜therapistTimeTable.js - Therapist availability routes
 ┣ 📜token.js - Token management routes
 ┗ 📜user.js - User management routes
```

## Technologies Used

### Frontend:

- **React**: Library for building the user interface
- **Vite**: Build tool for faster development
- **Redux Toolkit**: State management library
- **React Router DOM**: For routing and navigation
- **Tailwind CSS**: Utility-first CSS framework
- **Material UI**: Component library
- **Headless UI**: Unstyled, accessible UI components
- **Formik & Yup**: Form handling and validation
- **FullCalendar**: Calendar and scheduling
- **Socket.io-client**: Real-time communication
- **React-Quill**: Rich text editor for blog creation
- **React-Toastify**: Toast notifications
- **i18next**: Internationalization
- **Stripe**: Payment processing
- **WebRTC**: For video calls (with webrtc-adapter)
- **EmailJS**: Email functionality
- **SweetAlert2**: Enhanced alert dialogs

### Backend:

- **Node.js**: JavaScript runtime
- **Express**: Web framework
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling
- **Passport**: Authentication middleware
- **JSON Web Token**: Secure token-based authentication
- **Socket.io**: Real-time communication
- **AWS S3**: Cloud storage for files
- **Nodemailer**: Email sending
- **Stripe**: Payment processing
- **Swagger & ReDoc**: API documentation
- **i18next**: Internationalization
- **bcryptjs**: Password hashing
- **multer**: File uploads

## Key Features

### User Authentication & Management

- User registration and login
- Social login with Google
- Profile management
- Password reset functionality
- Account deletion

### Therapist Management

- Therapist profiles and specializations
- Therapist availability management
- Client-therapist matching
- Feedback and rating system

### Appointment Scheduling

- Calendar-based appointment booking
- Time slot selection
- Appointment management (view, edit, cancel)
- Notifications and reminders

### Video Calls

- Secure WebRTC-based video sessions
- Camera and microphone controls
- Screen sharing capability
- Session information display

### Messaging System

- Real-time chat between users and therapists
- Message notifications
- Emoji support
- Chat history

### Blog System

- Blog creation and publishing
- Rich text editing
- Category management
- Blog listing and search

### Admin Panel

- User management
- Therapist management
- Content moderation
- System statistics and reporting

### Payment Processing

- Secure payment with Stripe
- Payment history
- Subscription management
- Pricing plans

### Additional Features

- Multilingual support (i18next)
- Responsive design for all devices
- Dark/light mode
- Cookie consent management
- Mental health quiz/assessment
- FAQ section
- Contact form

## Installation and Setup

### Prerequisites

- Node.js (v16 or later)
- npm or yarn
- MongoDB
- AWS account (for S3 file storage)
- Stripe account (for payments)
- Google OAuth credentials (for social login)

### Frontend Setup

```bash
# Clone the repository
git clone https://github.com/your-username/souljourney.git

# Navigate to project directory
cd souljourney

# Install dependencies
npm install

# Create .env file with necessary environment variables
# Example:
# VITE_API_URL=http://localhost:3000/api
# VITE_SOCKET_URL=http://localhost:3000
# VITE_STRIPE_PUBLIC_KEY=your_stripe_key

# Run development server
npm run dev
```

### Backend Setup

```bash
# Clone the repository
git clone https://github.com/your-username/souljourney-api.git

# Navigate to project directory
cd souljourney-api

# Install dependencies
npm install

# Create .env file with necessary environment variables
# Example:
# PORT=3000
# MONGODB_URI=mongodb://localhost:27017/souljourney
# JWT_SECRET=your_jwt_secret
# AWS_ACCESS_KEY_ID=your_aws_key
# AWS_SECRET_ACCESS_KEY=your_aws_secret
# STRIPE_SECRET_KEY=your_stripe_secret
# etc.

# Run development server
npm run dev
```

## Deployment

The application can be deployed using various platforms:

### Frontend

- Vercel

### Backend

- Render

### API:

https://souljourney-api.onrender.com

## Project Outcomes and Learnings

Through this project, skills were developed in:

- Building secure authentication systems
- Real-time communication with Socket.io
- WebRTC implementation for video calls
- Payment processing integration
- State management with Redux Toolkit
- Creating responsive and accessible UI components
- Internationalization for multiple languages
- Working with MongoDB and Mongoose
- AWS S3 integration for file storage
- Creating a full admin panel

## Future Enhancements

- Mobile app versions (React Native)
- AI-powered therapist matching
- Group therapy sessions
- Integration with wearable devices for mood tracking
- Enhanced analytics for therapists
- Additional payment methods

## Contributors

- SoulJourney Developer Team

## License

ISC

---

<p align="center">
  <img src="path/to/logo.png" alt="SoulJourney Logo" width="200"/>
  <br>
  <em>Empowering mental wellness through technology</em>
</p>

