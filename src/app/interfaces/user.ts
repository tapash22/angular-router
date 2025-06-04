export type UserRole = "admin" | "manager" | "officer" | "user";

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  department?: string;
  phone?: string;
  avatarUrl?: string;
  status?: "active" | "inactive" | "on-leave";
  joiningDate?: string;
  location?: string;
  performanceScore?: number; // average performance across all projects
  rating?: number;
  completedProjects?: number;
  ongoingProjects?: number;
  salary?: number;
  lastEvaluationDate?: string;
  totalTimeSpentHours?: number; // ✅ Total time spent in all projects
  projects?: Project[];
}

export type LoginPayload = Pick<User, "email" | "password">;

export type RegistrationPayload = Pick<User, "name" | "email" | "password">;
export type WorkingResource = Pick<User, "id" | "name" | "email"> & {
  time_spent_hours?: number;
  performance_score?: number;
};

export interface Project {
  id: number;
  project_title: string;
  project_subtitle: string;
  project_project_length: number; // duration in weeks or months
  project_estimated_date: string;
  project_costing_needed: number;
  project_resource_needed: number;
  project_requirement: string[];
  working_resource: {
    id: number;
    name: string;
    email: string;
    time_spent_hours: number; // ✅ Time spent by the individual user
    performance_score: number; // ✅ User's performance in this project (0–100 or 0–10 scale)
  }[];
  projectStatus: "start" | "in-progress" | "completed";
}

export interface WrokingPerformance {
  id: number;
  project_name: string;
  haveRole: string;
  project_status: string;
  performanceScore: number;
  projectBenefit: string[];
  project_challenges: string[];
  project_time_length: number;
}

export interface Performance {
  id: number;
  user_name: string;
  user_email: string;
  working_list: WrokingPerformance[];
}
