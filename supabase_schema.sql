-- DROP EXISTING TABLES (in reverse dependency order)
drop table if exists notifications cascade;
drop table if exists emergency_help cascade;
drop table if exists appointments cascade;
drop table if exists chat_messages cascade;
drop table if exists documents cascade;
drop table if exists family_members cascade;
drop table if exists feedback cascade;
drop table if exists free_trial_bookings cascade;
drop table if exists medicine_orders cascade;
drop table if exists medicines cascade;
drop table if exists organ_repository_requests cascade;
drop table if exists reminders cascade;
drop table if exists tutorials cascade;
drop table if exists blood_bank_requests cascade;
drop table if exists users cascade;
drop table if exists user_profiles cascade;

-- USERS TABLE
create table if not exists users (
  id uuid primary key default uuid_generate_v4(),
  email text unique not null,
  name text,
  role text, -- 'patient', 'doctor', 'admin'
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- USER PROFILES TABLE
create table if not exists user_profiles (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id) unique,
  bio text,
  avatar_url text,
  phone text,
  address text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- APPOINTMENTS TABLE
create table if not exists appointments (
  id uuid primary key default uuid_generate_v4(),
  patient_id uuid references users(id),
  doctor_id uuid references users(id),
  appointment_date timestamp with time zone not null,
  status text default 'scheduled',
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- CHAT MESSAGES TABLE
create table if not exists chat_messages (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id),
  message text not null,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- DOCUMENTS TABLE
create table if not exists documents (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id),
  document_type text,
  file_url text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- FAMILY MEMBERS TABLE
create table if not exists family_members (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id),
  name text,
  relationship text,
  contact_number text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- FEEDBACK TABLE
create table if not exists feedback (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id),
  doctor_id uuid references users(id),
  rating int,
  comments text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- FREE TRIAL BOOKINGS TABLE
create table if not exists free_trial_bookings (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id),
  trial_type text,
  booking_date timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- MEDICINES TABLE
create table if not exists medicines (
  id uuid primary key default uuid_generate_v4(),
  name text,
  dosage text,
  frequency text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- MEDICINE ORDERS TABLE
create table if not exists medicine_orders (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id),
  medicine_id uuid references medicines(id),
  quantity int,
  order_date timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- ORGAN REPOSITORY REQUESTS TABLE
create table if not exists organ_repository_requests (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id),
  organ_type text,
  status text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- REMINDERS TABLE
create table if not exists reminders (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id),
  reminder_text text,
  reminder_time timestamp with time zone,
  is_completed boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- TUTORIALS TABLE
create table if not exists tutorials (
  id uuid primary key default uuid_generate_v4(),
  title text,
  content text,
  step_number int,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- BLOOD BANK REQUESTS TABLE
create table if not exists blood_bank_requests (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id),
  blood_group text,
  units int,
  description text,
  location_lat float8,
  location_lng float8,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- NOTIFICATIONS TABLE
create table if not exists notifications (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id),
  message text not null,
  is_read boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- EMERGENCY HELP TABLE
create table if not exists emergency_help (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id),
  description text,
  location_lat float8,
  location_lng float8,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- VISITS TABLE
create table if not exists visits (
  id uuid primary key default uuid_generate_v4(),
  patient_id uuid references users(id),
  doctor_id uuid references users(id),
  visit_date timestamp with time zone not null,
  visit_type text,
  status text,
  notes text,
  address text,
  is_urgent boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- EARNINGS TABLE
create table if not exists earnings (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id),
  date timestamp with time zone not null,
  patient_name text,
  consultation_type text,
  amount numeric,
  status text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- MODULES TABLE
create table if not exists modules (
  id uuid primary key default uuid_generate_v4(),
  title text,
  description text,
  duration text,
  progress int,
  image text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- REPORTS TABLE
create table if not exists reports (
  id uuid primary key default uuid_generate_v4(),
  patient_id uuid references users(id),
  doctor_id uuid references users(id),
  date timestamp with time zone not null,
  type text,
  status text,
  results jsonb,
  notes text,
  file_url text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- CONSULTATIONS TABLE
create table if not exists consultations (
  id uuid primary key default uuid_generate_v4(),
  patient_id uuid references users(id),
  doctor_id uuid references users(id),
  date timestamp with time zone not null,
  time text,
  status text,
  type text,
  symptoms jsonb,
  diagnosis text,
  prescription jsonb,
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- =========================
-- ENABLE RLS AND ADD POLICIES
-- =========================

-- Enable RLS
alter table users enable row level security;
alter table appointments enable row level security;
alter table chat_messages enable row level security;
alter table documents enable row level security;
alter table family_members enable row level security;
alter table feedback enable row level security;
alter table free_trial_bookings enable row level security;
alter table medicine_orders enable row level security;
alter table medicines enable row level security;
alter table organ_repository_requests enable row level security;
alter table reminders enable row level security;
alter table blood_bank_requests enable row level security;
alter table notifications enable row level security;
alter table emergency_help enable row level security;
alter table tutorials enable row level security;
alter table user_profiles enable row level security;

-- Policies: users can access their own rows
create policy "Users can access own rows" on users
  using (id = auth.uid());
create policy "Users can access own rows" on appointments
  using (patient_id = auth.uid() or doctor_id = auth.uid());
create policy "Users can access own rows" on chat_messages
  using (user_id = auth.uid());
create policy "Users can access own rows" on documents
  using (user_id = auth.uid());
create policy "Users can access own rows" on family_members
  using (user_id = auth.uid());
create policy "Users can access own rows" on feedback
  using (user_id = auth.uid() or doctor_id = auth.uid());
create policy "Users can access own rows" on free_trial_bookings
  using (user_id = auth.uid());
create policy "Users can access own rows" on medicine_orders
  using (user_id = auth.uid());
create policy "Users can access own rows" on organ_repository_requests
  using (user_id = auth.uid());
create policy "Users can access own rows" on reminders
  using (user_id = auth.uid());
create policy "Users can access own rows" on blood_bank_requests
  using (user_id = auth.uid());
create policy "Users can access own rows" on notifications
  using (user_id = auth.uid());
create policy "Users can access own rows" on emergency_help
  using (user_id = auth.uid());
create policy "Users can access own rows" on user_profiles
  using (user_id = auth.uid());

-- Public read for tutorials and medicines
create policy "Public can read tutorials" on tutorials
  for select
  using (true);
create policy "Public can read medicines" on medicines
  for select
  using (true); 