# TaskFlow — Next.js Migration Progress

## Migration Branch

`feature/next-migration`

## Important Notes

- Backend remains unchanged.
- `frontend-react/` is the original React/Vite version.
- `frontend/` is the new Next.js version.
- JWT authentication currently remains in localStorage.
- Authentication upgrade to HttpOnly cookies will be handled separately in the future.

---

## Day 1 — Setup & Architecture

- [x] Create Next.js frontend
- [x] Understand App Router structure
- [x] Understand Vite vs Next.js architecture

## Day 2 — Routing

- [x] Migrate basic routes
- [x] Understand Next.js App Router routing

## Day 3 — Layouts

- [x] Create root layout
- [x] Create auth layout
- [x] Understand nested layouts and route groups

## Day 4 — Server vs Client Components

- [x] Understand Server Components
- [x] Understand Client Components
- [x] Identify components requiring `"use client"`

## Day 5 — Authentication

- [x] Migrate AuthContext
- [x] Connect AuthProvider to root layout
- [x] Restore authentication state from localStorage

## Day 6 — Login

- [x] Migrate Login page
- [x] Migrate authentication service
- [x] Connect login to AuthContext
- [x] Store JWT in localStorage
- [x] Test login successfully

## Day 7 — Register

- [x] Migrate Register page
- [x] Connect register API
- [x] Redirect to Login after successful registration
- [x] Test registration successfully

## Day 8 — Data Fetching

- [x] Understand Client-side Data Fetching
- [x] Keep JWT authentication in localStorage for current migration
- [x] Create taskService.ts
- [x] Migrate MainContent to Next.js
- [x] Migrate TaskList to Next.js
- [x] Fetch tasks from NestJS API
- [x] Handle loading state
- [x] Handle error state
- [x] Delete task and refresh task list
- [x] Test task fetching successfully

### Day 8 Architecture

MainContent
→ useEffect
→ fetchTasks
→ taskService.getTasks()
→ Axios
→ JWT from localStorage
→ NestJS /tasks
→ setTasks
→ TaskList

## Day 9 — Dashboard

- [ ] Migrate Dashboard
- [ ] Migrate Navbar
- [ ] Migrate Sidebar
- [ ] Connect Dashboard layout
- [ ] Test responsive dashboard

## Day 10 — Tasks

- [ ] Migrate task creation
- [ ] Migrate task editing
- [ ] Migrate task deletion
- [ ] Test complete task flow

## Day 11 — Teams

- [ ] Migrate Teams
- [ ] Migrate team-related components
- [ ] Test team functionality

## Day 12 — Profile

- [ ] Migrate Profile
- [ ] Migrate username update
- [ ] Migrate password change
- [ ] Test profile functionality

## Day 13 — Loading / Error / Not Found

- [ ] Add loading UI
- [ ] Add error boundaries
- [ ] Add not-found page
- [ ] Test error states

## Day 14 — Final Migration & Production

- [ ] Final testing
- [ ] Remove migration issues
- [ ] Production environment configuration
- [ ] Build successfully
- [ ] Deploy Next.js frontend
- [ ] Verify production
- [ ] Final Git cleanup