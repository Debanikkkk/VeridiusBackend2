export interface ResUser {
  id?: number;
  name?: string;
  password?: string;
  address?: string;
  phone_number?: string;
  status?: boolean;
  email?: string;
  role?: {
    id?: number;
    name?: string;
    description?: string;
  };
  shows_count?: number; // Add this if you want to show user's shows count
}