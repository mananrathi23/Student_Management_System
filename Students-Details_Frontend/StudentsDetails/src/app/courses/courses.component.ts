import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';


interface DeleteResponse {
  deleted?: boolean;
}

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  searchQuery: string  = '';

  constructor(private httpClient:HttpClient,private route : ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.getCourse();

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

  private baseURL = "http://localhost:8080/api/Courses";
  private getURL = "http://localhost:8080/api/get"
  private deleteURL = "http://localhost:8080/api/delete";
  private updateURL = "http://localhost:8080/api/update";

  Courses :any[] = [];
  searchCourse :any[]=[];
  button_name :string = 'Save'
  toShowname :boolean = true ;

  toShowName :boolean = true ;
  toShowCode :boolean = true ;
  toShowN :boolean = true ;
  toShowF :boolean = true ;
  toShowB :boolean = true ;
  

  SaveCourse(){
    this.createCoList(this.Course).subscribe({
      next:(data:any) =>{
      console.log(data); 
      this.getCourse();
      

      },
      error:(error:any) =>{
        console.error(error);
      }
      
    });
  }

  Course={
    id: 0,
    course_name: '',
    course_code: '',
    course_status:'',
    year : 1 
  };
  

  createCoList(Course:any): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}`,Course)
  }

  getCoursesList(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.getURL}`);
  }

  updateClick(stu:any){
    this.courseModal = true ;
    this.Course.id=stu.id;
    this.Course.course_name = stu.course_name;
    this.Course.course_code = stu.course_code;
    this.Course.course_status = stu.course_status;
    this.Course.year = stu.year;
    // this.SaveCourse();
    this.button_name='update';
    window.scrollTo({ top: 0, behavior: 'smooth' });

    
  }


  deleteClick(id: any){
    this.courseModal = true ;
    this.deleteS(id);
    this.reset();
  }


  deleteCourse(id:number):Observable<DeleteResponse>{
    return this.httpClient.get<DeleteResponse>(`${this.deleteURL}/${id}`);
  }

courseModal :boolean = true ;
  deleteS(id: number) {
    this.courseModal = true ;
    this.deleteCourse(id).subscribe((data:DeleteResponse)=>{
      console.log(data["deleted"],'in')
      if (data["deleted"] === false) {
        console.log('Student not deleted:', data);
        this.courseModal = false ;
        this.showText();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        console.log('Student deleted successfully or another response:', data);
      }
      console.log(data);
      this.getCourse();
    })
  }

  reset() {
    this.Course.course_name= '';
    this.Course.course_code = '';
    this.Course.course_status = '';
    this.button_name = 'Save';
    this.courseModal = true ;
  }

  public getCourse(){
    this.getCoursesList().subscribe((data: any[])=>{
      this.Courses = data;
      this.searchCourse =data ;
      
    });
  }


  onClick(){
    this.courseModal = true ;
    this.validator(this.Course.course_name,this.Course.course_code);
    if(this.toShowName && this.toShowCode &&  this.toShowN && this.toShowB){
      this.SaveCourse();
      this.reset();
      // location.reload();  
      
    }
  }

  searchBar() {
    const query = this.searchQuery.toLowerCase();
    this.searchCourse = [];
   

    for (let i = 0; i < this.Courses.length; i++) {
      const statusString=this.Courses[i].course_status? 'Active' : 'Inactive';
      if (this.Courses[i].course_name.toLowerCase().includes(query) || this.Courses[i].course_code.toLowerCase().includes(query)||statusString.toLowerCase().includes(query)||this.Courses[i].year.toString().includes(query)) {
        this.searchCourse.push(this.Courses[i]);
      }
  }
}


validator(course_name:String,course_code:String){
  this.toShowName = true ;
  this.toShowCode = true ;
  this.toShowN = true ;
  this.toShowF = true ;
  this.toShowB = true ;
  


  if (course_name.length   === 0) {
      this.toShowN = false;
  }
  const trimmedName = course_name.trim();
  const namePattern = /^[a-zA-Z\s]+$/;
  if (trimmedName.length === 0 || !namePattern.test(trimmedName)) {
    this.toShowName = false;
  } else {
    this.Course.course_name = trimmedName; 
  }

  const trimmedCode = course_code.trim();
  const codePattern = /^[a-zA-Z0-9\s]+$/;
  if(course_name.length === 0){
    this.toShowF = false;
  }
  if (trimmedCode.length === 0 || !codePattern.test(trimmedCode)) {
    this.toShowCode = false;
  } else {
    this.Course.course_code = trimmedCode; 
  }

}
idStore : number = 0;
onStore(id:number){
this.idStore = id ;
this.courseModal = true ;
}

isTextSHow = false ;
showText():void{
  this.isTextSHow = true ;
  setTimeout(()=>{
    this.isTextSHow = false ;
  },3000);
}
}
