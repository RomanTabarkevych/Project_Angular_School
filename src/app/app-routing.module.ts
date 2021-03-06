import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { TeachersComponent } from "./teachers/teachers.component";
import { StudentsComponent } from './students/students.component';
import { AdminComponent } from './admin/admin.component';
import {TemporaryComponent} from './temporary/temporary.component';
import { SubjectsComponent } from './admin/subjects/subjects.component';

const routes: Routes = [
  {
    path: "",
    component: LoginComponent
  },
  {
    path: "teachers",
    component: TeachersComponent
  },
  {
    path: "students",
    component: StudentsComponent
  },
  {
    path: "admin",
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'pupils',
        pathMatch: 'full'
      },
      {
        path: 'pupils',
        component: TemporaryComponent
      },
      {
        path: 'teachers',
        component: TemporaryComponent
      },
      {
        path: 'subjects',
        component: SubjectsComponent
      },
      {
        path: 'classes',
        component: TemporaryComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
