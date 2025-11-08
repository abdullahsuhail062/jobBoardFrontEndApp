import { RedirectCommand, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuardService } from './service/auth-guard.service';
import { AuthGuardServiceService } from './auth-guard-service-service';
import { AdminNotificationComponent } from './admin-notification/admin-notification.component';
import { AdminGuard } from './guards/admin.guard';
import { Jobposting } from './jobposting/jobposting';
import { PostedJobsComponent } from './posted-jobs/posted-jobs.component';
import { JobDetailComponent } from './job-detail/job-detail.component';
import { UserOptupComponent } from './user-optup/user-optup.component';
import { EmployerDashboardComponent } from './employer-dashboard/employer-dashboard.component';
import { RoleGuard } from './role-guard.guard';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';







 export const routes: Routes = [{path: '', component: LandingComponent,canActivate: [AuthGuardService]}, {path: 'signup', component: SignupComponent, canActivate: [AuthGuardService]}, {path: 'signin',
     component: SigninComponent, canActivate: [AuthGuardService]},
     {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardServiceService]},
     {path: 'admin-notification', component: AdminNotificationComponent, canActivate: [AdminGuard]},
     {path:'jobposting', component: Jobposting},{path: 'posted-jobs', component: PostedJobsComponent}, {
    path: 'job-detail/:id',
    component: JobDetailComponent
  },{path: 'user-optup', component: UserOptupComponent},{path: 'employer-dashboard',component:EmployerDashboardComponent},   {path: 'unauthorized', component: UnauthorizedComponent}]; 
