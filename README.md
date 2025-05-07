# Welli Unified Healthcare Platform

This project is an original idea and implementation by Prathamesh. All rights reserved.

**Any unauthorized use, reproduction, or distribution of this code, design, or concept is strictly prohibited.**

For licensing or collaboration, contact the author.

---

## Database Schema (Supabase)

The following tables are required for all features to work:

- **users**: All user accounts (patients, doctors, admins)
- **user_profiles**: Extended user profile info (bio, avatar, etc.)
- **appointments**: Patient-doctor appointments
- **chat_messages**: Chat/AI messages
- **documents**: Medical documents
- **family_members**: Family account members
- **feedback**: Feedback and ratings
- **free_trial_bookings**: Free trial bookings
- **medicines**: Medicine catalog
- **medicine_orders**: Medicine orders
- **organ_repository_requests**: Organ donation/transplant requests
- **reminders**: Reminders for users
- **blood_bank_requests**: Blood bank requests
- **notifications**: User notifications
- **emergency_help**: Emergency help requests
- **tutorials**: Public tutorials

All tables have Row Level Security (RLS) enabled and policies to ensure users can only access their own data (except for public tutorials/medicines).

To set up the schema, run the contents of `supabase_schema.sql` in your Supabase SQL editor.

---

## Local AI Backend (No API Key Required)

This project now includes a free, self-hosted AI backend for the Welli Assistant chatbot. No API key or environment variable is required.

### To run the AI backend:

```sh
pip install fastapi uvicorn
python ai_server.py
```

The server will start at http://localhost:8000. The frontend will automatically use this for all AI chatbot features.

---

## Deployment & Setup

1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Set up your Supabase project:**
   - Run the SQL in `supabase_schema.sql` to create all tables and policies.
   - Set your Supabase URL and anon key in `.env.local` (not committed to git).
3. **Start the frontend:**
   ```sh
   npm run dev
   ```
4. **Deploy:**
   - All dependencies are pre-installed. No Vercel/NPM install loop.
   - Set environment variables in your deployment platform (never commit secrets).

---

## Legal & Originality Notice

This project, its schema, and all features are the original intellectual property of Prathamesh. Any copying, reproduction, or use without explicit permission is strictly prohibited and may result in legal action.

---

Deployment trigger: minor update.

---

Test commit: verifying git push functionality.
