import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'dashboard',
        loadComponent: ()=> import('./views/dashboard/dashboard.component').then((m)=> m.DashboardComponent)
    },
    {
        path:'admin',
        loadComponent: ()=> import('./views/admin/admin.component').then((m)=> m.AdminComponent)
    },
    {
        path:'manager',
        loadComponent: ()=> import('./views/manager/manager.component').then((m)=> m.ManagerComponent)
    },
    {
        path:'officer',
        loadComponent: ()=> import('./views/officer/officer.component').then((m)=> m.OfficerComponent)
    },
    {
        path:'employee',
        loadComponent: ()=> import('./views/employee/employee.component').then((m)=> m.EmployeeComponent)
    },
    {
        path:'performance',
        loadComponent: ()=> import('./views/performance/performance.component').then((m)=> m.PerformanceComponent)
    },
    {
        path:'work',
        loadComponent: ()=> import('./views/work/work.component').then((m)=> m.WorkComponent)
    },
];
