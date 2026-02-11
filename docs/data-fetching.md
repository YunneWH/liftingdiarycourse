# Data Fetching

## Core Rule: Server Components ONLY

**ALL data fetching in this application MUST be done via Server Components.** This is non-negotiable.

Do NOT fetch data via:
- Route handlers (`route.ts`)
- Client components (`"use client"`)
- API routes
- Any other method

Server Components are the ONLY acceptable way to fetch data.

## Database Queries: The `/data` Directory

All database queries MUST be implemented as helper functions inside the `/data` directory.

- Every query function lives in `/data`
- Every query function uses **Drizzle ORM** — do NOT use raw SQL
- Import and call these helper functions from Server Components

Example structure:
```
src/data/
  workouts.ts    # getWorkouts(), getWorkoutById(), etc.
  exercises.ts   # getExercises(), etc.
```

## User Data Isolation (CRITICAL)

A logged-in user must ONLY be able to access **their own data**. They must NEVER be able to access another user's data.

Every `/data` helper function MUST:
1. Retrieve the current authenticated user's ID
2. Include a `WHERE userId = currentUserId` filter (or equivalent) in every query
3. Never accept a raw user ID from client input as a trusted value — always derive it from the authenticated session on the server

No exceptions. Every query that touches user-owned data must be scoped to the authenticated user.
