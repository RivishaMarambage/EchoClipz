-- Create users table (extends Supabase auth.users)
create table public.users (
  id uuid references auth.users not null primary key,
  email text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create ideas table
create table public.ideas (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.users not null,
  niche text not null,
  results_json jsonb not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create clips table
create table public.clips (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.users not null,
  video_name text not null,
  transcript text,
  timestamps_json jsonb not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create posts table
create table public.posts (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.users not null,
  title text not null,
  platform text not null,
  views integer default 0,
  likes integer default 0,
  comments integer default 0,
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create planner table
create table public.planner (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.users not null,
  title text not null,
  status text not null,
  platform text not null,
  scheduled_date timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up Row Level Security (RLS)

alter table public.users enable row level security;
alter table public.ideas enable row level security;
alter table public.clips enable row level security;
alter table public.posts enable row level security;
alter table public.planner enable row level security;

-- Policies for users
create policy "Users can view own profile." on public.users for select using (auth.uid() = id);
create policy "Users can update own profile." on public.users for update using (auth.uid() = id);

-- Policies for ideas
create policy "Users can view own ideas." on public.ideas for select using (auth.uid() = user_id);
create policy "Users can insert own ideas." on public.ideas for insert with check (auth.uid() = user_id);
create policy "Users can update own ideas." on public.ideas for update using (auth.uid() = user_id);
create policy "Users can delete own ideas." on public.ideas for delete using (auth.uid() = user_id);

-- Policies for clips
create policy "Users can view own clips." on public.clips for select using (auth.uid() = user_id);
create policy "Users can insert own clips." on public.clips for insert with check (auth.uid() = user_id);
create policy "Users can update own clips." on public.clips for update using (auth.uid() = user_id);
create policy "Users can delete own clips." on public.clips for delete using (auth.uid() = user_id);

-- Policies for posts
create policy "Users can view own posts." on public.posts for select using (auth.uid() = user_id);
create policy "Users can insert own posts." on public.posts for insert with check (auth.uid() = user_id);
create policy "Users can update own posts." on public.posts for update using (auth.uid() = user_id);
create policy "Users can delete own posts." on public.posts for delete using (auth.uid() = user_id);

-- Policies for planner
create policy "Users can view own planner items." on public.planner for select using (auth.uid() = user_id);
create policy "Users can insert own planner items." on public.planner for insert with check (auth.uid() = user_id);
create policy "Users can update own planner items." on public.planner for update using (auth.uid() = user_id);
create policy "Users can delete own planner items." on public.planner for delete using (auth.uid() = user_id);

-- Function to handle new user creation from Supabase Auth
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, email)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;

-- Trigger to call the function when a user is created
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
