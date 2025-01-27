import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsComponent } from './students/students.component';
import { StudentsDetailsComponent } from './students-details/students-details.component';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { CoursesComponent } from './courses/courses.component';
import { StudentCourseMappingComponent } from './student-course-mapping/student-course-mapping.component';


const routes: Routes = [
  {path:'',component:StudentsDetailsComponent},
  {path:'Students-academics',component:StudentsComponent},
  {path:'Courses',component:CoursesComponent},
  {path:'', redirectTo:'students-details' ,pathMatch:'full'},
  {path :'student-course-mapping',component : StudentCourseMappingComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}