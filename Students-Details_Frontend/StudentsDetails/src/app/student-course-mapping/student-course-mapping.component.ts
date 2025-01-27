import { NumberSymbol } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

interface Item {
  id: number;
  name: string;
}
interface courses {
  course_id : number;
  course_name : string;
}

@Component({
  selector: 'app-student-course-mapping',
  templateUrl: './student-course-mapping.component.html',
  styleUrls: ['./student-course-mapping.component.scss']
})
export class StudentCourseMappingComponent implements OnInit {

  constructor(private httpCLient : HttpClient,private route:ActivatedRoute ,private router:Router) { }

  ngOnInit(): void {
    
    this.getCourseName();
    this.getStudentsNames();
    this.getStudentsCourses();
  }

  private getStudentsNameURL = "http://localhost:8080/api/getStudentNames";
  private getCourseNameURL = "http://localhost:8080/api/getCourseNames";
  private CreateURL = "http://localhost:8080/api/create";
  private getURL = "http://localhost:8080/api/getMapping";
  private deleteURL = "http://localhost:8080/api/delete";
  private editURL = "http://localhost:8080/api/update";

  studentNames :Item[]=[];
  CourseNames:courses[]=[];
  searchStudentMapping : any[] =[];

  StudentName = {
    name : '',
    id : 0 
  }
  CourseName ={
    course_name : '',
    course_id : 0 
  }

selectedCourse : any[] = [];
selectedName : any[] = [];
 CourseId : any[] = [];
 NameId :any[] = [];
 studentCourseMapping : any[]= [];
 searchQuery:string='';
 idStore : number[] = [] ;
 button_name:string = 'save'

toShowCourse:boolean= true ;
toShowNames :boolean= true ;
toShowCourses:boolean =true ;

public getStudentsNames(): Promise<void> {
  return new Promise((resolve, reject) => {
    this.getStudentsDetailsList(this.studentMapping.year).subscribe(
      (data: any[]) => {
        this.studentNames = data;
        console.log('sdfg', this.studentNames);
        resolve();
      },
      (error) => {
        console.error('Error fetching student names', error);
        reject(error);
      }
    );
  });
}


  public getStudentsDetailsList(year:any):Observable<any[]>{
    console.log('3edfg',year)
    return this.httpCLient.get<any[]>(`${this.getStudentsNameURL}/${year}`)
  }

  public getCourseName(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.getCourseList(this.studentMapping.year).subscribe(
        (data: any[]) => {
          this.CourseNames = data;
          console.log('jejkaj', this.CourseNames);
          resolve();
        },
        (error) => {
          console.error('Error fetching course names', error);
          reject(error);
        }
      );
    });
  }
  

  
  getCourseList(year:any):Observable<any[]>{
    return this.httpCLient.get<any[]>(`${this.getCourseNameURL}/${year}`)
    
  }
  
  
  
  isDropdownOpen = false;
  dropdownLabel = '';
  isDropDownCourse = false ;
  dropDownCourse = '' ;
  
  
  
  // this is for the name 
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  
  onCheckboxChange(event: any,n :Item) {
    if (event.target.checked) {
      this.selectedName.push(n);
      this.NameId.push(n.id);
      console.log('d',this.NameId);
      console.log(this.selectedName ,'sel')
    } else {
      this.selectedName = this.selectedName.filter(i => i.id !== n.id);
      this.NameId = this.NameId.filter(i => i !== n.id);
      console.log('d',this.NameId);
      console.log(this.selectedName ,'sel')
        }
        this.updateDropdownLabel();
      }
      
      updateDropdownLabel() {
        if (this.selectedName.length > 0) {
          this.dropdownLabel = this.selectedName.map(item => item.name).join(', ');
        } else {
          this.dropdownLabel = '';
        }
      }
      
      
      // this is for the course
      toggleDropdownCourse() {
        this.isDropDownCourse = !this.isDropDownCourse;
      }
      
      onCheckboxChangeCourse(event: any,n :courses) {
        if (event.target.checked) {
          this.selectedCourse.push(n);
          this.CourseId.push(n.course_id);
          // console.log('d',this.CourseId);
        } else {
          this.selectedCourse = this.selectedCourse.filter(i => i.course_id !== n.course_id);
          this.CourseId = this.CourseId.filter(i => i !== n.course_id);
          
          // console.log('d',this.CourseId);
        }
        console.log('d',this.CourseId);
        console.log('',this.selectedCourse);
        this.updateDropdownLabelCourse();
      }
      
      updateDropdownLabelCourse() {
        if (this.selectedCourse.length > 0) {
          this.dropDownCourse = this.selectedCourse.map(item => item.course_name).join(', ');
        } else {
          this.dropDownCourse = ' ';
        }
      }
      
     

      studentMapping = {
        name : this.NameId,
        course : this.CourseId,
        year : 1,
        id:[]   
        }
      
      
      createStudentMapping(studentMapping:any):Observable<Object>{
        return this.httpCLient.post(`${this.CreateURL}`,studentMapping)
      } 
      SaveStudentsMapping(){
        this.createStudentMapping(this.studentMapping).subscribe({
          next:(data:any)=>{
            console.log(data);
            // this.getStudentMappingCourse();
            console.log('selected students',this.selectedName);
            this.getStudentsCourses();
            console.log('selected course',this.CourseName,this.studentCourseMapping);
            console.log('names',)
            // this.resetMapping();
            // this.CourseId = [];
            // this.NameId = [];
            
          },
          error:(error:any) =>{
            console.error(error);
          }
        });
      }
      
      async onSave(){
        this.sameValidations();
        this.toEmpty();
        if(this.button_name == 'save'){
        if(this.toShowSame && this.toShowCourses && this.toShowNames){
        // this.validator();
        this.studentMapping.name = this.NameId;
        this.studentMapping.course = this.CourseId;
        this.SaveStudentsMapping();
        console.log("gfg",this.selectedCourse);
        
        // location.reload();
        this.resetMapping();
        }
      }
      else if(this.button_name == 'Update'){
        if(this.toShowCourses && this.toShowNames){
          this.studentMapping.name = this.NameId;
          this.studentMapping.course = this.CourseId;
          this.UpdateSaveStudentsMapping();
          this.resetMapping();
          // this.onYear();
          this.getCourseName();
          this.getStudentsNames();
        }
    } 
  
  }

      resetMapping(){
        this.selectedCourse = [] ;
        console.log('reset courses',this.selectedCourse); 
        this.selectedName = [];
        this.dropdownLabel = '';
        this.dropDownCourse = '';
        this.button_name = 'save';
        this.toShowCourse = true ;
        console.log(this.NameId,'name id');
        this.NameId = [] ;
        this.CourseId = [];
        this.studentMapping.year = 1 ;
        this.toShowSame =true ;
        this.toShowCourses =true ;
        this.toShowNames = true ;
        this.getCourseName();
        this.getStudentsNames();
      }
      
      async onYear(){
        this.studentMapping.year = +this.studentMapping.year;
        this.NameId = [] ;
        this.CourseId = [];
        this.selectedCourse = [];
        this.selectedName = [];
        this.dropdownLabel = '';
        this.dropDownCourse = '';
        // console.log('34rfv',this.studentMapping.year,typeof(this.studentMapping.year))
        await this.getStudentsNames();
        await this.getCourseName();
        this.toShowSame = true ; 
        console.log('ewf',this.selectedCourse,this.dropDownCourse);
    this.toShowCourses = true ;
    this.toShowNames = true ;
    this.toShowCourse = true ;
    this.toShowSame = true ;
    this.button_name = 'save';
    // location.reload();   
    
      }

     

      // to get the details from backend in table 
      getStudentsCoursesList():Observable<any[]>{
        return this.httpCLient.get<any>(`${this.getURL}`)
      }
    
    
      public getStudentsCourses(){
        this.getStudentsCoursesList().subscribe((data:any)=>{
          // console.log(data,'dfvb')
          this.studentCourseMapping = this.processStudentCourseData(data);
          this.searchStudentMapping = this.processStudentCourseData(data) ;
          // console.log("jhbwe",this.studentCourseMapping,typeof(this.studentCourseMapping));
          // console.log('ei',this.studentCourseMapping);
          // console.log(this.searchStudentMapping);
        })
      }

      processStudentCourseData(data: any): any[] {
        const courseMap: { [key: string]: { name: string, courses: string[], year: number,id:number[] } } = {};
        const result: any[] = [];
      
        Object.keys(data).forEach(name => {
          const courses = data[name];
          courses.forEach((course: any) => {
            if (!courseMap[name]) {
              courseMap[name] = { name: name, courses: [], year: course.year,id:[] };
            }
            courseMap[name].courses.push(course.course_name);
            courseMap[name].id.push(course.id);
            // console.log(courseMap[name]);
            
          });
          
          // console.log(courseMap[name].id,'this');  
        
          
        });
        Object.values(courseMap).forEach(entry => {
          result.push({
            name: entry.name,
            course: entry.courses.join(', '),
            year: entry.year,
            id :entry.id,
            courses : entry.courses
          });
          
        });
      
        return result;
      }


      validator(){
        this.toShowCourse = true ;
        if(this.studentMapping.name.length === 0 || this.studentMapping.course.length === 0){
          this.toShowCourse =false ;
        }
      }
      
      searchBar(){
        const query = this.searchQuery.toLowerCase();
        this.searchStudentMapping = [];
        for(let i = 0;i<this.studentCourseMapping.length;i++){
          if(this.studentCourseMapping[i].name.toLowerCase().includes(query)||this.studentCourseMapping[i].course.toLowerCase().includes(query)||this.studentCourseMapping[i].year.toString().includes(query)){
            this.searchStudentMapping.push(this.studentCourseMapping[i]);
          }
        }
      }

      deleteStudent(id:any[]):Observable<Object>{
        return this.httpCLient.post(`${this.deleteURL}`,id);
      }
  
      OnDelete(id:any[]){
        this.deleteStudent(id).subscribe(data=>{
          // console.log(data);
          this.getStudentsCourses();
          this.resetMapping();
        })
      }


      
    storage : number = 1;
    async onEdit(pre: any) {
      this.idStore = [];
      this.selectedName = [];
      this.selectedCourse = [];
      this.dropDownCourse = '';
      this.dropdownLabel = '';
      this.updateDropdownLabel();
        console.log('pre object:', pre);
        this.studentMapping.year = pre.year;
        // this.studentMapping.name = pre.name;
        // this.CourseId = pre.courses;
        await this.onYear();
        
        
        // console.log(this.studentNames,'wefgb')
        const item = this.studentNames.find((n) => n.name === pre.name);
        console.log(item,'dfgh');
        if (item) {
            this.onCheckboxChange({ target: { checked: true } }, item);
            // this.toggleDropdown();
            this.updateDropdownLabel();

          }
      
        pre.courses.forEach((coursename: string) => {
          const course = this.CourseNames.find((c) => c.course_name === coursename);
          if (course) {
            this.onCheckboxChangeCourse({ target: { checked: true } }, course);
            // this.toggleDropdownCourse();
            this.updateDropdownLabelCourse();
          }
          // this.SaveStudentsMapping();
          
        });
        
      this.storage = pre.id ;
        this.button_name = 'Update';
        this.idStore = pre.id;

      }
        
          

        resetCheck(){
          this.dropDownCourse = '';
          this.dropdownLabel = '';
        }
        
toShowSame :boolean=true;
        sameValidations(){
          this.toShowSame = true;
          for(let i = 0;i<this.studentCourseMapping.length;i++){
            for(let j = 0;j<this.selectedName.length;j++){
              if(this.studentCourseMapping[i].name == this.selectedName[j].name){
                console.log(this.studentCourseMapping[i],this.selectedName[j],'equal');
                for(let k = 0 ; k<this.selectedCourse.length;k++){
                  console.log('abcd');
                  for(let l = 0;l<this.studentCourseMapping[i].courses.length;l++){
                  if(this.studentCourseMapping[i].courses[l] == this.selectedCourse[k].course_name){
                    this.toShowSame = false;
                    console.log(this.studentCourseMapping[i].courses[l],this.selectedCourse[k].course_name,'course equal');
                  }
                  console.log(this.studentCourseMapping[i].courses[l],this.selectedCourse[k].course_name,'course not equal');
                }
              }
              console.log(this.studentCourseMapping[i].name,this.selectedName[i],'not equal');
            }
          }
    }
  }

  toEmpty(){
    this.toShowCourses = true ;
    this.toShowNames = true ;
    if(this.selectedCourse.length == 0){
      this.toShowCourses = false ;  
    }

    if(this.selectedName.length == 0){
      this.toShowNames = false ;
    }
  }
  onreload(){
    this.resetMapping();
  }
  
      UpdateStudentMapping(studentMapping:any):Observable<Object>{
        return this.httpCLient.post(`${this.editURL}`,studentMapping)
      } 
      UpdateSaveStudentsMapping(){
        this.UpdateStudentMapping(this.studentMapping).subscribe({
          next:(data:any)=>{
            console.log(data);
            console.log('selected students',this.selectedName);
            this.getStudentsCourses();
            console.log('selected course',this.CourseName,this.studentCourseMapping);
            console.log('names')
            
          },
          error:(error:any) =>{
            console.error(error);
          }
        });
      }

      deleteStore : any[] = [] ;
      onStore(id:any[]){
        this.deleteStore = id ;

      }
  }
