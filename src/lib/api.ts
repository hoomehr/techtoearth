// API client for fetching data from the backend

// Courses
export async function getCourses() {
  const res = await fetch('/api/courses', { next: { revalidate: 60 } });
  if (!res.ok) throw new Error('Failed to fetch courses');
  return res.json();
}

export async function getCourse(id: number) {
  const res = await fetch(`/api/courses/${id}`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error('Failed to fetch course');
  return res.json();
}

// Events
export async function getEvents() {
  const res = await fetch('/api/events', { next: { revalidate: 60 } });
  if (!res.ok) throw new Error('Failed to fetch events');
  return res.json();
}

export async function getEvent(id: number) {
  const res = await fetch(`/api/events/${id}`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error('Failed to fetch event');
  return res.json();
}

// Groups
export async function getGroups() {
  const res = await fetch('/api/groups', { next: { revalidate: 60 } });
  if (!res.ok) throw new Error('Failed to fetch groups');
  return res.json();
}

export async function getGroup(id: number) {
  const res = await fetch(`/api/groups/${id}`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error('Failed to fetch group');
  return res.json();
}

// Users
export async function getUsers() {
  const res = await fetch('/api/users', { next: { revalidate: 60 } });
  if (!res.ok) throw new Error('Failed to fetch users');
  return res.json();
}

export async function getUser(id: number) {
  const res = await fetch(`/api/users/${id}`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error('Failed to fetch user');
  return res.json();
}

// Current user (for profile)
export async function getCurrentUser() {
  // For now, we'll just return the first user
  const res = await fetch('/api/users/1', { next: { revalidate: 60 } });
  if (!res.ok) throw new Error('Failed to fetch current user');
  return res.json();
}
