export function isAdmin(email: string | undefined): boolean {
  if (!email) return false;
  
  const adminUsers = process.env.ADMIN_USERS?.split(',').map(u => u.trim()) || [];
  return adminUsers.includes(email);
}

export function getRoleFromUser(email: string | undefined): 'admin' | 'user' {
  return isAdmin(email) ? 'admin' : 'user';
}

export function checkAdminAccess(email: string | undefined): void {
  if (!isAdmin(email)) {
    throw new Error('Unauthorized: Admin access required');
  }
}
