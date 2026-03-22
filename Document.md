# BabyBloom - Complete Project Documentation

## Table of Contents

1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Project Architecture](#project-architecture)
4. [Folder Structure](#folder-structure)
5. [Environment Setup](#environment-setup)
6. [Authentication Flow](#authentication-flow)
7. [Database Design](#database-design)
8. [API Reference](#api-reference)
9. [Page Routes & Features](#page-routes--features)
10. [Component Library](#component-library)
11. [UI/UX Design System](#uiux-design-system)
12. [Third-Party Integrations](#third-party-integrations)
13. [ML Health Predictor](#ml-health-predictor)
14. [Payment System](#payment-system)
15. [Document Management](#document-management)
16. [Vaccination Tracker](#vaccination-tracker)
17. [Patient Management](#patient-management)
18. [Animations & Interactions](#animations--interactions)
19. [Security Measures](#security-measures)
20. [Deployment Guide](#deployment-guide)

---

## Project Overview

**BabyBloom** is a full-stack maternal and child healthcare web application designed to help parents and healthcare providers manage child health records, vaccination schedules, medical documents, payments, and AI-powered health risk predictions.

### Key Features

- Secure user authentication with Google OAuth and email/password
- Child health profile management
- Vaccination tracking with national schedule reference
- Medical document vault with cloud storage
- Payment tracking with UPI payment verification
- AI-powered child health risk predictor
- AI chatbot assistant
- Premium UI with custom cursor, smooth scrolling, parallax effects, and animations

---

## Tech Stack

### Frontend

| Technology | Version | Purpose |
|---|---|---|
| **Next.js** | 16.1.6 | React framework with App Router, SSR, API routes |
| **React** | 19.2.3 | UI component library |
| **TypeScript** | 5.x | Static type checking |
| **Tailwind CSS** | 4.x | Utility-first CSS framework |
| **Framer Motion** | 12.36.0 | Declarative animations and gestures |
| **GSAP** | 3.14.2 | Advanced timeline-based animations |
| **Lenis** | 1.3.18 | Smooth scroll library |
| **Recharts** | 3.8.0 | Data visualization charts |
| **Lucide React** | 0.577.0 | Icon library |
| **React Hot Toast** | 2.6.0 | Toast notifications |
| **React Hook Form** | 7.71.2 | Form state management |
| **Zod** | 4.3.6 | Schema validation |
| **Canvas Confetti** | 1.9.4 | Confetti animation effects |
| **Axios** | 1.13.6 | HTTP client |
| **class-variance-authority** | 0.7.1 | Component variant styling |
| **tailwind-merge** | 3.5.0 | Tailwind class deduplication |
| **next-themes** | 0.4.6 | Theme management |

### Backend

| Technology | Version | Purpose |
|---|---|---|
| **Next.js API Routes** | 16.1.6 | Serverless API endpoints |
| **NextAuth.js** | 5.0.0-beta.30 | Authentication (Auth.js v5) |
| **Mongoose** | 9.3.0 | MongoDB ODM |
| **bcryptjs** | 3.0.3 | Password hashing |

### Cloud Services

| Service | Purpose |
|---|---|
| **MongoDB Atlas** | Cloud database |
| **Cloudinary** | Image/document cloud storage and CDN |
| **Google Cloud** | OAuth 2.0 authentication provider |
| **Vercel** | Deployment platform |

---

## Project Architecture

```
Client (Browser)
    |
    v
+-------------------+
|   Next.js App     |
|   (App Router)    |
+-------------------+
    |           |
    v           v
+--------+  +----------+
| Pages  |  | API      |
| (SSR/  |  | Routes   |
| CSR)   |  | (/api/*) |
+--------+  +----------+
                |
        +-------+-------+
        |       |       |
        v       v       v
   MongoDB  Cloudinary  Google
   Atlas    (Files)     OAuth
```

### Request Flow

1. **Client** sends request to Next.js server
2. **Middleware** (`middleware.ts`) checks authentication via `authjs.session-token` cookie
3. **Protected routes** (`/dashboard/*`) redirect unauthenticated users to `/login`
4. **API routes** connect to MongoDB via cached Mongoose connection
5. **File uploads** stream directly to Cloudinary, metadata stored in MongoDB
6. **Auth** handled by NextAuth.js with JWT strategy (30-day session)

---

## Folder Structure

```
babybloom/
|
+-- app/                              # Next.js App Router
|   +-- (auth)/                       # Auth route group (no layout nesting)
|   |   +-- login/
|   |       +-- page.tsx              # Login/Register page
|   |
|   +-- (dashboard)/                  # Dashboard route group
|   |   +-- dashboard/
|   |       +-- page.tsx              # Main dashboard
|   |       +-- patient/
|   |       |   +-- page.tsx          # Child health profile
|   |       +-- vaccinations/
|   |       |   +-- page.tsx          # Vaccination tracker
|   |       +-- documents/
|   |       |   +-- page.tsx          # Document vault
|   |       +-- payments/
|   |           +-- page.tsx          # Payment tracker
|   |
|   +-- api/                          # API Routes
|   |   +-- auth/
|   |   |   +-- [...nextauth]/
|   |   |   |   +-- route.ts          # NextAuth handler
|   |   |   +-- register/
|   |   |       +-- route.ts          # User registration
|   |   +-- patient/
|   |   |   +-- route.ts              # GET/PUT patient
|   |   |   +-- create/
|   |   |       +-- route.ts          # POST create patient
|   |   +-- vaccines/
|   |   |   +-- route.ts              # GET vaccines
|   |   |   +-- add/
|   |   |   |   +-- route.ts          # POST add vaccine
|   |   |   +-- [id]/
|   |   |       +-- route.ts          # PUT/DELETE vaccine
|   |   +-- payments/
|   |   |   +-- route.ts              # GET payments
|   |   |   +-- add/
|   |   |       +-- route.ts          # POST add payment
|   |   +-- documents/
|   |   |   +-- route.ts              # GET documents
|   |   |   +-- upload/
|   |   |   |   +-- route.ts          # POST upload document
|   |   |   +-- [id]/
|   |   |       +-- route.ts          # DELETE document
|   |   +-- ml/
|   |       +-- predict/
|   |           +-- route.ts          # POST ML prediction
|   |
|   +-- ml-predictor/
|   |   +-- page.tsx                  # ML predictor page
|   |
|   +-- globals.css                   # Global styles & design system
|   +-- layout.tsx                    # Root layout (fonts, providers, cursor)
|   +-- page.tsx                      # Homepage
|   +-- providers.tsx                 # Client providers (Lenis, SessionProvider)
|
+-- components/
|   +-- home/
|   |   +-- HeroSection.tsx           # Hero with parallax and geometric shapes
|   |   +-- FeaturesGrid.tsx          # Features showcase grid
|   |   +-- StatsSection.tsx          # Statistics counter section
|   |   +-- MaternalSection.tsx       # Maternal care information cards
|   |   +-- ChatbotWidget.tsx         # AI chatbot floating widget
|   |
|   +-- layout/
|   |   +-- Navbar.tsx                # Responsive navigation bar
|   |   +-- Footer.tsx                # Site footer
|   |
|   +-- shared/
|   |   +-- CustomCursor.tsx          # Spring-physics custom cursor
|   |   +-- PageTransition.tsx        # Page fade-in animation wrapper
|   |   +-- SplitText.tsx             # Staggered text reveal animation
|   |   +-- ScrollReveal.tsx          # IntersectionObserver scroll reveal
|   |   +-- StaggerContainer.tsx      # Staggered children animation
|   |   +-- MagneticButton.tsx        # Magnetic hover effect button
|   |   +-- LoadingSpinner.tsx        # Skeleton loading components
|   |
|   +-- ui/                           # Base UI components (shadcn/ui)
|
+-- lib/
|   +-- auth.ts                       # NextAuth configuration
|   +-- mongodb.ts                    # MongoDB connection with caching
|   +-- cloudinary.ts                 # Cloudinary configuration
|
+-- models/
|   +-- User.ts                       # User schema
|   +-- Patient.ts                    # Patient/child schema
|   +-- Vaccination.ts                # Vaccination record schema
|   +-- Payment.ts                    # Payment record schema
|   +-- MedDocument.ts                # Medical document schema
|
+-- types/
|   +-- next-auth.d.ts                # NextAuth type extensions
|
+-- middleware.ts                      # Route protection middleware
+-- next.config.ts                     # Next.js configuration
+-- tailwind.config.ts                 # Tailwind CSS configuration
+-- tsconfig.json                      # TypeScript configuration
+-- package.json                       # Dependencies and scripts
+-- .env                               # Environment variables (gitignored)
```

---

## Environment Setup

### Prerequisites

- Node.js 18+ and npm
- MongoDB Atlas account
- Google Cloud Console project (for OAuth)
- Cloudinary account

### Environment Variables (.env)

```env
# MongoDB Atlas connection string
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/babybloom

# NextAuth.js configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=<random-base64-string>    # Generate with: openssl rand -base64 32

# Google OAuth 2.0 credentials
GOOGLE_CLIENT_ID=<your-google-client-id>.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-<your-google-client-secret>

# Cloudinary cloud storage
CLOUDINARY_CLOUD_NAME=<your-cloud-name>
CLOUDINARY_API_KEY=<your-api-key>
CLOUDINARY_API_SECRET=<your-api-secret>
```

### Installation & Running

```bash
# Clone the repository
git clone https://github.com/riyaa-mishra/babybloom-new.git
cd babybloom

# Install dependencies
npm install

# Create .env file and add your credentials
cp .env.example .env

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Navigate to **APIs & Services > OAuth consent screen**
4. Configure as External, add app name "BabyBloom"
5. Add test users (your email)
6. Go to **Credentials > Create Credentials > OAuth client ID**
7. Application type: Web application
8. Add authorized JavaScript origins: `http://localhost:3000`
9. Add authorized redirect URIs: `http://localhost:3000/api/auth/callback/google`
10. Copy Client ID and Client Secret to `.env`

### MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Create a free cluster
3. Create a database user with read/write access
4. Go to **Network Access > Add IP Address > Allow from Anywhere** (`0.0.0.0/0`)
5. Go to **Connect > Drivers** and copy the connection string
6. Replace `<password>` with your database user password
7. Add to `.env` as `MONGODB_URI`

### Cloudinary Setup

1. Go to [Cloudinary](https://cloudinary.com/) and create a free account
2. From the Dashboard, copy Cloud Name, API Key, and API Secret
3. Add to `.env`

---

## Authentication Flow

### Architecture

BabyBloom uses **NextAuth.js v5 (Auth.js)** with JWT session strategy.

```
User clicks "Sign In"
        |
        v
+------------------+
| Login Page       |
| /login           |
+------------------+
    |           |
    v           v
+--------+  +----------+
| Google |  | Email/   |
| OAuth  |  | Password |
+--------+  +----------+
    |           |
    v           v
+-------------------+
| NextAuth Handler  |
| /api/auth/[...]   |
+-------------------+
    |
    v
+-------------------+
| MongoDB           |
| User Collection   |
+-------------------+
    |
    v
+-------------------+
| JWT Token Created |
| (30-day session)  |
+-------------------+
    |
    v
+-------------------+
| Cookie Set        |
| authjs.session-   |
| token             |
+-------------------+
    |
    v
+-------------------+
| Redirect to       |
| /dashboard        |
+-------------------+
```

### Auth Providers

**1. Google OAuth:**
- User clicks "Continue with Google"
- Redirected to Google consent screen
- On success, checks if user exists in MongoDB
- If new user, creates account automatically with Google profile data
- Returns JWT session token

**2. Credentials (Email/Password):**
- User enters email and password
- Password verified against bcrypt hash in database
- If match, returns JWT session token
- Password hashing: bcryptjs with 12 salt rounds

### Registration Flow

```
POST /api/auth/register
{
  "name": "User Name",
  "email": "user@example.com",
  "password": "securepassword"
}
```

1. Validate all fields are provided
2. Check if email already exists in database
3. Hash password with bcryptjs (12 rounds)
4. Create new User document in MongoDB
5. Return success response
6. Client auto-signs in with credentials

### Middleware Protection

```typescript
// middleware.ts
- Checks for `authjs.session-token` cookie
- Protected paths: /dashboard, /dashboard/*
- Unauthenticated users -> redirect to /login
- Authenticated users on /login -> redirect to /dashboard
```

### Session Structure

```typescript
interface Session {
  user: {
    id: string;        // MongoDB ObjectId
    name: string;
    email: string;
    image?: string;    // Google profile picture URL
  }
}
```

---

## Database Design

### Entity Relationship Diagram

```
+----------+       +----------+       +-----------+
|  User    |<------| Patient  |<------| Vaccination|
+----------+  1:1  +----------+  1:N  +-----------+
| _id      |       | _id      |       | _id       |
| name     |       | userId   |       | patientId |
| email    |       | childName|       | userId    |
| password |       | age      |       | vaccineName|
| image    |       | gender   |       | dueDate   |
| provider |       | dob      |       | status    |
| createdAt|       | weight   |       | dateTaken |
| updatedAt|       | height   |       | createdAt |
+----------+       | bloodType|       +-----------+
                   | healthIssue|
                   | guardianName|     +-----------+
                   | phoneNumber|      | Payment   |
                   | physicianName|    +-----------+
                   | physicianPhone|   | _id       |
                   | createdAt|        | patientId |
                   +----------+        | userId    |
                       |               | amount    |
                       | 1:N           | description|
                       v               | paymentDate|
                   +-----------+       | paymentStatus|
                   | MedDocument|      | createdAt |
                   +-----------+       +-----------+
                   | _id       |
                   | patientId |
                   | userId    |
                   | documentName|
                   | fileUrl   |
                   | fileType  |
                   | fileSize  |
                   | publicId  |
                   | uploadDate|
                   +-----------+
```

### Model Schemas

#### User Model

```typescript
{
  name:      String (required)
  email:     String (required, unique)
  password:  String (hashed with bcrypt, optional for OAuth users)
  image:     String (profile picture URL)
  provider:  String (default: "credentials" | "google")
  createdAt: Date (auto)
  updatedAt: Date (auto)
}
```

#### Patient Model

```typescript
{
  userId:         ObjectId -> User (required)
  childName:      String (required)
  age:            String
  gender:         String ("Male" | "Female" | "Other")
  dob:            Date
  weight:         Number (kg)
  height:         Number (cm)
  bloodType:      String ("A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-")
  healthIssue:    String
  guardianName:   String
  phoneNumber:    String
  physicianName:  String
  physicianPhone: String
  createdAt:      Date (auto)
  updatedAt:      Date (auto)
}
```

#### Vaccination Model

```typescript
{
  patientId: ObjectId -> Patient (required)
  userId:    ObjectId -> User (required)
  vaccineName: String (required)
  dueDate:     Date (required)
  status:      String ("Completed" | "Pending", default: "Pending")
  dateTaken:   Date
  createdAt:   Date (auto)
  updatedAt:   Date (auto)
}
```

#### Payment Model

```typescript
{
  patientId:     ObjectId -> Patient (required)
  userId:        ObjectId -> User (required)
  amount:        Number (required)
  description:   String
  paymentDate:   Date (required)
  paymentStatus: String ("Paid" | "Pending", default: "Pending")
  createdAt:     Date (auto)
  updatedAt:     Date (auto)
}
```

#### MedDocument Model

```typescript
{
  patientId:    ObjectId -> Patient (required)
  userId:       ObjectId -> User (required)
  documentName: String (required)
  fileUrl:      String (Cloudinary URL, required)
  fileType:     String (required)
  fileSize:     Number (bytes)
  publicId:     String (Cloudinary public ID)
  uploadDate:   Date (default: now)
  createdAt:    Date (auto)
  updatedAt:    Date (auto)
}
```

---

## API Reference

### Authentication

#### POST `/api/auth/register`
Register a new user account.

**Request Body:**
```json
{
  "name": "Riya Mishra",
  "email": "riya@example.com",
  "password": "mySecurePassword123"
}
```

**Response (201):**
```json
{
  "message": "User registered successfully"
}
```

**Errors:**
- `400` - Missing required fields
- `409` - Email already exists
- `500` - Server error

#### GET/POST `/api/auth/[...nextauth]`
NextAuth.js catch-all handler for sign-in, sign-out, session, CSRF, and callback routes.

---

### Patient

#### GET `/api/patient`
Fetch the current user's patient profile.

**Headers:** Requires valid session cookie

**Response (200):**
```json
{
  "patient": {
    "_id": "...",
    "childName": "Arya",
    "age": "3",
    "gender": "Female",
    "weight": 14,
    "height": 95,
    "bloodType": "B+",
    ...
  }
}
```

#### PUT `/api/patient`
Update existing patient profile.

**Request Body:** Any patient fields to update
```json
{
  "weight": 15,
  "height": 97
}
```

#### POST `/api/patient/create`
Create a new patient profile for the current user.

**Request Body:**
```json
{
  "childName": "Arya",
  "age": "3",
  "gender": "Female",
  "dob": "2023-06-15",
  "weight": 14,
  "height": 95,
  "bloodType": "B+",
  "guardianName": "Riya Mishra",
  "phoneNumber": "9876543210"
}
```

---

### Vaccinations

#### GET `/api/vaccines`
Get all vaccination records for the user's patient.

**Response (200):**
```json
{
  "vaccines": [
    {
      "_id": "...",
      "vaccineName": "BCG",
      "dueDate": "2023-06-15",
      "status": "Completed",
      "dateTaken": "2023-06-15"
    }
  ]
}
```

#### POST `/api/vaccines/add`
Add a new vaccination record.

**Request Body:**
```json
{
  "vaccineName": "OPV",
  "dueDate": "2024-01-15",
  "status": "Pending"
}
```

#### PUT `/api/vaccines/[id]`
Update a vaccination record by ID.

#### DELETE `/api/vaccines/[id]`
Delete a vaccination record by ID.

---

### Payments

#### GET `/api/payments`
Get all payment records for the user's patient.

**Response (200):**
```json
{
  "payments": [
    {
      "_id": "...",
      "amount": 1500,
      "description": "Consultation Fee",
      "paymentDate": "2024-03-10",
      "paymentStatus": "Paid"
    }
  ]
}
```

#### POST `/api/payments/add`
Add a new payment record.

**Request Body:**
```json
{
  "amount": 2000,
  "description": "Vaccination - DPT",
  "paymentDate": "2024-03-15",
  "paymentStatus": "Pending"
}
```

---

### Documents

#### GET `/api/documents`
Get all medical documents for the user's patient.

**Response (200):**
```json
{
  "documents": [
    {
      "_id": "...",
      "documentName": "blood-report.pdf",
      "fileUrl": "https://res.cloudinary.com/...",
      "fileType": "application/pdf",
      "fileSize": 245760,
      "uploadDate": "2024-03-10"
    }
  ]
}
```

#### POST `/api/documents/upload`
Upload a document to Cloudinary and save metadata.

**Request Body:** `FormData` with `file` field

#### DELETE `/api/documents/[id]`
Delete a document from both Cloudinary and MongoDB.

---

### ML Predictor

#### POST `/api/ml/predict`
Calculate a health risk prediction.

**Request Body:**
```json
{
  "age": 3,
  "weight": 14,
  "height": 95,
  "gender": "Female",
  "issues": ["Fever", "Respiratory"]
}
```

**Response (200):**
```json
{
  "riskScore": 45,
  "riskLevel": "Moderate",
  "bmi": 15.51,
  "recommendations": [
    "Schedule a follow-up with your pediatrician within 2 weeks",
    "Ensure the child is getting adequate hydration",
    "Monitor for respiratory symptoms like wheezing or shortness of breath"
  ]
}
```

---

## Page Routes & Features

### Homepage (`/`)

The landing page with five main sections:

1. **Hero Section** - Animated headline with scroll-linked parallax, abstract geometric shapes, gradient background blobs, and CTA buttons
2. **Stats Section** - Animated counter cards showing key statistics (users, records, uptime, security)
3. **Features Grid** - Six feature cards highlighting platform capabilities
4. **Maternal Section** - Information cards about maternal and childcare features
5. **Chatbot Widget** - Floating AI chatbot with predefined responses

### Login Page (`/login`)

Dual-tab authentication interface:

- **Sign In Tab**: Email/password login + Google OAuth
- **Sign Up Tab**: Name, email, password registration
- Animated floating stat badges
- Phone mockup preview
- Toast notifications for success/error states
- Auto-redirect to dashboard on successful auth

### Dashboard (`/dashboard`)

Main hub after login with:

- Greeting banner with user's name
- Stats cards (height, weight, blood type, upcoming vaccines)
- Navigation cards to sub-pages (Patient, Vaccinations, Documents, Payments)
- Growth chart (Recharts line chart)
- Recent activity feed
- ML predictor promo card

### Patient Profile (`/dashboard/patient`)

- Create/edit child health profile
- Sections: Personal Info, Physical Details, Guardian Info, Physician Info
- Hero card with avatar and quick-view badges
- Toggle between view and edit modes
- Form validation with React Hook Form

### Vaccinations (`/dashboard/vaccinations`)

- View all vaccination records as cards
- Add/edit/delete vaccinations via modal
- Filter by status: All / Completed / Pending
- Color-coded status indicators (green=completed, orange=pending)
- Days until due / overdue calculation
- Collapsible national vaccination schedule reference table

### Documents (`/dashboard/documents`)

- Grid display of uploaded documents
- Drag-and-drop file upload to Cloudinary
- Search by filename
- Filter by type: All / PDF / Image / Other
- Actions: Preview (images), Open, Download, Delete
- File size and upload date display

### Payments (`/dashboard/payments`)

- Summary cards: Total Paid (INR), Total Pending (INR), Last Payment
- Monthly bar chart (Paid vs Pending)
- Sortable, paginated payment table
- "Pay Now" button on pending payments
- UPI payment verification popup (UPI ID, UTR number, mobile number)
- All amounts in Indian Rupees (INR)

### ML Predictor (`/ml-predictor`)

- Input form: age, weight, height, gender, health issues (multi-select)
- Real-time BMI calculation
- Risk score gauge visualization
- Risk level classification (Low / Moderate / High)
- Personalized health recommendations
- Confetti animation on low-risk results

---

## Component Library

### Home Components

| Component | File | Description |
|---|---|---|
| HeroSection | `components/home/HeroSection.tsx` | Animated hero with parallax blobs, geometric shapes, scroll-linked opacity/scale transforms |
| StatsSection | `components/home/StatsSection.tsx` | Animated statistics cards with Lucide icons |
| FeaturesGrid | `components/home/FeaturesGrid.tsx` | Six-card feature grid with hover effects |
| MaternalSection | `components/home/MaternalSection.tsx` | Info cards about maternal/child care features |
| ChatbotWidget | `components/home/ChatbotWidget.tsx` | Floating chatbot with predefined Q&A responses |

### Layout Components

| Component | File | Description |
|---|---|---|
| Navbar | `components/layout/Navbar.tsx` | Responsive nav with session handling, sign in/out |
| Footer | `components/layout/Footer.tsx` | Site footer with links and branding |

### Shared Components

| Component | File | Description |
|---|---|---|
| CustomCursor | `components/shared/CustomCursor.tsx` | Spring-physics cursor with ring + dot, scales on interactive elements |
| PageTransition | `components/shared/PageTransition.tsx` | Framer Motion fade-in + slide-up wrapper |
| SplitText | `components/shared/SplitText.tsx` | Text that animates in word-by-word or character-by-character |
| ScrollReveal | `components/shared/ScrollReveal.tsx` | IntersectionObserver-based reveal on scroll |
| StaggerContainer | `components/shared/StaggerContainer.tsx` | Container that staggers children animation |
| MagneticButton | `components/shared/MagneticButton.tsx` | Button with magnetic hover attraction effect |
| LoadingSpinner | `components/shared/LoadingSpinner.tsx` | Skeleton card and spinner loading states |

---

## UI/UX Design System

### Color Palette

```
Primary Background:    #FDF7F8  (Warm blush white)
Secondary Background:  #FFF5F7  (Soft pink)
Card Background:       #FFFFFF  (White)

Text Primary:          #1A0A0D  (Deep dark)
Text Secondary:        #4A1E2E  (Dark rose)
Text Muted:            #8C5A6E  (Muted rose)

Accent Primary:        #C2185B  (Rose)
Accent Gradient:       #C2185B -> #E91E63 (Rose to Pink)

Border:                rgba(194, 24, 91, 0.08)  (Rose tint)
Shadow:                rgba(194, 24, 91, 0.10)  (Rose tint)

Status - Success:      #10B981 (Emerald)
Status - Warning:      #F59E0B (Amber)
Status - Error:        #EF4444 (Red)
```

### Typography

```
Display Font:  "DM Serif Display" (serif, italic)
  - Used for: Headings, hero text, card titles
  - Weights: 400

Body Font:     "DM Sans" (sans-serif)
  - Used for: Body text, buttons, labels
  - Weights: 300, 400, 500, 600, 700
```

### CSS Utilities

```css
.text-heading-shadow    /* Text shadow for headings on light backgrounds */
.text-outlined          /* 1px pink text stroke for contrast */
.text-outlined-strong   /* 1.5px pink text stroke for stronger contrast */
.gradient-text          /* Rose-to-pink gradient text fill */
```

### Design Patterns

- **Border Radius**: `rounded-2xl` (1rem) for cards, `rounded-xl` (0.75rem) for buttons
- **Shadows**: Rose-tinted box shadows for warmth
- **Gradients**: `from-rose-500 to-pink-500` for CTAs, subtle gradients for card backgrounds
- **Hover States**: Scale transforms, shadow depth increase, color transitions
- **Glass Effect**: `backdrop-blur-sm` with semi-transparent backgrounds

---

## Third-Party Integrations

### Cloudinary (Document Storage)

**Configuration (`lib/cloudinary.ts`):**
```typescript
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
```

**Upload Flow:**
1. Client sends file via `FormData` to `/api/documents/upload`
2. Server reads file as `Buffer`
3. Stream upload to Cloudinary `babybloom/` folder
4. Cloudinary returns `secure_url` and `public_id`
5. Metadata saved to MongoDB `MedDocument` collection

**Deletion Flow:**
1. Client calls `DELETE /api/documents/[id]`
2. Server fetches document from MongoDB
3. Deletes file from Cloudinary using `public_id`
4. Removes document record from MongoDB

### Google OAuth

**Configuration (`lib/auth.ts`):**
```typescript
GoogleProvider({
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
})
```

**Callback Flow:**
1. User redirected to Google consent screen
2. Google returns authorization code
3. NextAuth exchanges code for tokens
4. Profile data extracted (name, email, image)
5. Check if user exists in MongoDB by email
6. If new: create User with `provider: "google"`
7. Return JWT session with user ID

---

## ML Health Predictor

### Algorithm Overview

The ML predictor uses a rule-based scoring system to assess child health risk:

```
Total Risk Score = BMI Score + Issue Score
(capped at 0-100)
```

### BMI Calculation

```
BMI = weight (kg) / (height (cm) / 100)^2
```

### BMI Scoring (Age-Stratified)

| Age Group | Underweight BMI | Normal BMI | Overweight BMI |
|---|---|---|---|
| 0-2 years | < 14 | 14-18 | > 18 |
| 3-5 years | < 13.5 | 13.5-17 | > 17 |
| 6-12 years | < 14 | 14-21 | > 21 |
| 13+ years | < 16 | 16-25 | > 25 |

**Scores:**
- Underweight: 30 points
- Normal: 10 points
- Overweight: 20 points

### Health Issue Scoring

- Each health issue adds 15 points
- Maximum 45 points for 3+ issues
- Tracked issues: Fever, Respiratory, Digestive, Other

### Risk Classification

| Score Range | Risk Level | Color |
|---|---|---|
| 0-20 | Low | Green |
| 21-50 | Moderate | Amber |
| 51-100 | High | Red |

### Recommendations Engine

The system generates personalized recommendations based on:

1. **Risk Level**: Base recommendations per level
   - Low: Continue regular checkups
   - Moderate: Schedule follow-up within 2 weeks
   - High: Consult pediatrician immediately

2. **BMI Status**: Specific dietary/monitoring advice
   - Underweight: Nutrition guidance
   - Overweight: Activity recommendations

3. **Health Issues**: Issue-specific suggestions
   - Fever: Hydration, temperature monitoring
   - Respiratory: Breathing exercises, allergen avoidance
   - Digestive: Dietary adjustments, probiotics

---

## Payment System

### Currency

All amounts are displayed in **Indian Rupees (INR)** using:
```typescript
new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0
}).format(amount)
```

### Payment Dashboard Features

- **Summary Cards**: Total Paid, Total Pending, Last Payment Date
- **Bar Chart**: Monthly payment breakdown (Paid vs Pending) using Recharts
- **Data Table**: Sortable by any column, paginated (8 per page)

### UPI Payment Verification Flow

```
User clicks "Pay Now" on pending payment
        |
        v
+--------------------+
| UPI Payment Modal  |
+--------------------+
| - Amount to pay    |
| - Clinic UPI ID    |
|   (copy button)    |
| - Your UPI ID      |
|   input            |
| - UTR Number       |
|   input            |
| - Mobile Number    |
|   input (+91)      |
+--------------------+
        |
        v (Submit)
+--------------------+
| Verification       |
| Processing...      |
+--------------------+
        |
        v
+--------------------+
| Success Screen     |
| - Amount confirmed |
| - UTR displayed    |
| - UPI ID shown     |
+--------------------+
```

### Payment States

- **Paid**: Green badge, "Done" with checkmark in action column
- **Pending**: Orange badge, "Pay Now" button in action column

---

## Document Management

### Supported File Types

- **Images**: JPG, PNG, GIF, WebP
- **Documents**: PDF
- **Others**: Any file type accepted by Cloudinary

### Upload Flow

```
User drags file or clicks upload
        |
        v
+------------------+
| FormData created |
| with file        |
+------------------+
        |
        v
POST /api/documents/upload
        |
        v
+------------------+
| File buffered    |
| on server        |
+------------------+
        |
        v
+------------------+
| Stream upload to |
| Cloudinary       |
| folder: babybloom|
+------------------+
        |
        v
+------------------+
| Save metadata to |
| MongoDB          |
| (name, url, type,|
|  size, publicId) |
+------------------+
        |
        v
+------------------+
| Return document  |
| to client        |
+------------------+
```

### Search & Filter

- **Search**: Filter documents by filename (case-insensitive)
- **Type Filter**: All / PDF / Image / Other
- **Actions**: Preview (images in modal), Open (new tab), Download, Delete

---

## Vaccination Tracker

### Features

- Add new vaccination records with name, due date, status
- Edit existing records
- Delete records with confirmation
- Filter: All / Completed / Pending
- Visual indicators: Green (completed), Orange (pending), Red (overdue)
- Days until due / days overdue calculation

### National Vaccination Schedule Reference

The page includes a collapsible reference table with the Indian national immunization schedule:

| Age | Vaccine | Details |
|---|---|---|
| Birth | BCG, OPV-0, Hep B-1 | Given at birth |
| 6 weeks | DTwP/DTaP-1, IPV-1, Hep B-2, Hib-1, Rotavirus-1, PCV-1 | First primary doses |
| 10 weeks | DTwP/DTaP-2, IPV-2, Hib-2, Rotavirus-2, PCV-2 | Second primary doses |
| 14 weeks | DTwP/DTaP-3, IPV-3, Hib-3, Rotavirus-3, PCV-3 | Third primary doses |
| 6 months | OPV-1, Hep B-3 | Continued series |
| 9 months | MMR-1, MCV-1 | Measles protection |
| ...and more through 16 years | Various boosters | As per schedule |

---

## Patient Management

### Profile Creation Flow

```
First visit to /dashboard/patient
        |
        v
+------------------+
| No patient found |
| Show create form |
+------------------+
        |
        v (Fill form)
+------------------+
| Sections:        |
| 1. Personal Info |
|    - Child Name  |
|    - DOB / Age   |
|    - Gender      |
| 2. Physical      |
|    - Weight      |
|    - Height      |
|    - Blood Type  |
|    - Health Issues|
| 3. Guardian      |
|    - Name        |
|    - Phone       |
| 4. Physician     |
|    - Name        |
|    - Phone       |
+------------------+
        |
        v (Submit)
POST /api/patient/create
        |
        v
+------------------+
| Profile created  |
| Show view mode   |
| with hero card   |
+------------------+
```

### Edit Flow

- Toggle "Edit" button switches form fields to editable
- Save sends PUT request to `/api/patient`
- Cancel reverts to view mode without saving

---

## Animations & Interactions

### Smooth Scrolling (Lenis)

```typescript
// providers.tsx
new Lenis({
  duration: 1.4,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: "vertical",
  touchMultiplier: 2,
})
```

### Custom Cursor

- **Outer ring**: 40x40px border circle with spring physics (`stiffness: 150, damping: 15`)
- **Inner dot**: 6x6px solid dot following mouse position
- **Interactive hover**: Scales to 2.5x when hovering over buttons, links, inputs
- **Visibility**: Hidden on touch devices and screens below `md` breakpoint
- **CSS**: `cursor: none !important` on all elements (desktop only via `@media (pointer: fine)`)

### Page Transitions

```typescript
// PageTransition.tsx
initial:  { opacity: 0, y: 20, filter: "blur(4px)" }
animate:  { opacity: 1, y: 0,  filter: "blur(0px)" }
duration: 0.5s with ease-out
```

### Scroll Parallax (Hero Section)

```typescript
// HeroSection.tsx
const { scrollYProgress } = useScroll()

blobY1:     0 -> -120px    (fastest parallax)
blobY3:     0 -> -160px    (medium parallax)
blobY2:     0 -> -80px     (slowest parallax)
contentY:   0 -> -60px     (content moves up)
mockupScale: 1 -> 0.95     (mockup shrinks)
opacity:     1 -> 0         (fade out on scroll)
```

### Stagger Animations

```typescript
// StaggerContainer.tsx
container: { staggerChildren: 0.06 }
item: {
  hidden:  { opacity: 0, y: 20 }
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}
```

### Magnetic Button

- Tracks mouse position within button bounds
- Applies transform offset toward mouse (magnetic pull)
- Springs back to center on mouse leave

---

## Security Measures

### Authentication Security

- **Password Hashing**: bcryptjs with 12 salt rounds (industry standard)
- **JWT Sessions**: 30-day expiry, server-validated
- **OAuth**: Google OAuth 2.0 with PKCE
- **CSRF Protection**: Built-in NextAuth CSRF tokens
- **Session Cookie**: `authjs.session-token` (HTTP-only, secure in production)

### API Security

- **Route Protection**: All `/api/patient`, `/api/vaccines`, `/api/payments`, `/api/documents` routes check for valid session
- **User Isolation**: All queries filter by `userId` from session (users can only access their own data)
- **Input Validation**: Required field checks on all POST/PUT routes
- **File Upload**: Server-side validation before Cloudinary upload

### Environment Security

- **`.env` gitignored**: Secrets never committed to version control
- **`.env*` pattern**: Catches all env variants (.env, .env.local, .env.production)

### Middleware

```typescript
// middleware.ts
- Runs before every request
- Checks auth cookie existence
- Protects dashboard routes
- Redirects unauthorized access
```

---

## Deployment Guide

### Vercel Deployment

1. Push code to GitHub repository
2. Go to [Vercel](https://vercel.com/) and import the repository
3. Add all environment variables from `.env` to Vercel project settings
4. Set `NEXTAUTH_URL` to your Vercel domain (e.g., `https://babybloom.vercel.app`)
5. Deploy

### Environment Variables for Production

```env
MONGODB_URI=mongodb+srv://...           # Production MongoDB URI
NEXTAUTH_URL=https://your-domain.com    # Production URL
NEXTAUTH_SECRET=<strong-random-secret>  # Generate new for production
GOOGLE_CLIENT_ID=...                    # Add production redirect URI in Google Console
GOOGLE_CLIENT_SECRET=...
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
```

### Google OAuth for Production

Update Google Cloud Console credentials:
- Add production URL to **Authorized JavaScript origins**
- Add `https://your-domain.com/api/auth/callback/google` to **Authorized redirect URIs**

### MongoDB Atlas for Production

- Ensure production IP is whitelisted (or use `0.0.0.0/0` for Vercel's dynamic IPs)
- Use a dedicated database user with minimal permissions
- Enable MongoDB Atlas audit logging

---

## Scripts

```json
{
  "dev":   "next dev",           // Start development server
  "build": "next build",         // Build for production
  "start": "next start",         // Start production server
  "lint":  "next lint"           // Run ESLint
}
```

---

## License

This project is developed as part of a healthcare technology initiative. All rights reserved.

---

*Documentation generated for BabyBloom v1.0 - March 2026*
