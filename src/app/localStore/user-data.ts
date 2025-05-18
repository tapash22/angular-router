// src/app/data/mock-users.ts

import { Project, User } from "../interfaces/user";

export const MOCK_USERS: User[] = [
  {
    id: 1,
    name: 'Tapash Paul',
    email: 'tapasp263@gmail.com',
    password: 'Mnbvc0(8',
    role: 'admin',
  },
  {
    id: 2,
    name: 'Bob Smith',
    email: 'bob@example.com',
    password: 'password123',
    role: 'manager',
  },
  {
    id: 3,
    name: 'Carol Williams',
    email: 'carol@example.com',
    password: 'password123',
    role: 'officer',
  },
  {
    id: 4,
    name: 'David Lee',
    email: 'david@example.com',
    password: 'password123',
    role: 'user',
  },
    {
    id: 5,
    name: 'David Lee',
    email: 'paul@example.com',
    password: 'password123',
    role: 'user',
  },
];

export const projects: Project[] = [
  {
    id: 1,
    project_title: "Website Redesign",
    project_subtitle: "Modernize corporate website",
    project_project_length: 6,
    project_estimated_date: "2025-06-01",
    project_costing_needed: 50000,
    project_resource_needed: 5,
    project_requirement: ["UI/UX Design", "Frontend Development", "Backend Integration"],
    working_resource: [
      { id: 101, name: "Alice",email:'alice@gmail.com' },
      { id: 102, name: "Bob",email:'bob@gmail.com' }
    ],
    projectStatus:'start'
  },
  {
    id: 2,
    project_title: "Mobile App Development",
    project_subtitle: "iOS and Android application",
    project_project_length: 8,
    project_estimated_date: "2025-07-15",
    project_costing_needed: 80000,
    project_resource_needed: 7,
    project_requirement: ["Flutter", "Firebase", "API Integration"],
    working_resource: [
      { id: 103, name: "Charlie",email:'charlie@gmail.com'},
      { id: 104, name: "Diana",email:'diana@gmail.com' }
    ],
    projectStatus:'on-process'
  },
    {
    id: 3,
    project_title: "web Development",
    project_subtitle: "cloud web service",
    project_project_length: 12,
    project_estimated_date: "2025-07-15",
    project_costing_needed: 80000,
    project_resource_needed: 7,
    project_requirement: ["java", "vue.js", "API Integration"],
    working_resource: [
      { id: 103, name: "Charlie",email:'charlie@gmail.com'},
      { id: 104, name: "Diana",email:'diana@gmail.com' }
    ],
    projectStatus:'on-process'
  }
];


// export const MOCK_USERS: User[] = [
//   {
//     id: 1,
//     name: 'Tapash Paul',
//     email: 'tapash.paul@techcorp.com',
//     role: 'admin',
//     department: 'IT',
//     phone: '+1-555-0101',
//     avatarUrl: 'https://i.pravatar.cc/150?img=1',
//     status: 'active',
//     joiningDate: '2020-01-15',
//     location: 'New York, USA',
//     performanceScore: 91,
//     rating: 4.8,
//     completedProjects: 25,
//     ongoingProjects: 3,
//     salary: 120000,
//     lastEvaluationDate: '2024-12-20',
//     totalTimeSpentHours: 2500,
//     projects: [
//       {
//         id: 1,
//         project_title: 'Website Redesign',
//         project_subtitle: 'Modernize corporate website',
//         project_project_length: 6,
//         project_estimated_date: '2025-06-01',
//         project_costing_needed: 50000,
//         project_resource_needed: 5,
//         project_requirement: ['UI/UX Design', 'Frontend Development', 'Backend Integration'],
//         working_resource: [
//           {
//             id: 1,
//             name: 'Tapash Paul',
//             email: 'tapash.paul@techcorp.com',
//             time_spent_hours: 140,
//             performance_score: 95,
//           },
//           {
//             id: 2,
//             name: 'Alice',
//             email: 'alice@gmail.com',
//             time_spent_hours: 120,
//             performance_score: 88,
//           },
//         ],
//         projectStatus: 'start',
//       },
//       {
//         id: 2,
//         project_title: 'CRM Integration',
//         project_subtitle: 'Connect internal tools with CRM',
//         project_project_length: 4,
//         project_estimated_date: '2025-04-15',
//         project_costing_needed: 30000,
//         project_resource_needed: 3,
//         project_requirement: ['API Integration', 'Database Sync'],
//         working_resource: [
//           {
//             id: 1,
//             name: 'Tapash Paul',
//             email: 'tapash.paul@techcorp.com',
//             time_spent_hours: 100,
//             performance_score: 90,
//           },
//         ],
//         projectStatus: 'completed',
//       },
//     ],
//   },
// ];

