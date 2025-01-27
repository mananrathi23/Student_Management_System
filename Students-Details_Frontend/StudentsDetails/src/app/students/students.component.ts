  import { HttpClient } from '@angular/common/http';
  import { Component, OnInit } from '@angular/core';
  import { Observable } from 'rxjs';
  import { FormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


  @Component({
    selector: 'app-students',
    templateUrl: './students.component.html',
    styleUrls: ['./students.component.scss'],
  })
  export class StudentsComponent implements OnInit {
    [x: string]: any;

    isSuccessModalVisible: boolean = false;
    students: any[] = [];
    searchStudent : any[] =[];
    searchQuery : string = '' ;
    isExiting: boolean = false;
    
  SaveStudent(){
    this.createStudentList(this.student).subscribe({
      next:(data:any) =>{
      console.log(data); 
      this.getstudents();
      this.showSuccessModal();
      },
      error:(error:any) =>{
        console.error(error);
      }
    });
  }


  showSuccessModal() {
    this.isSuccessModalVisible = true;
    setTimeout(() => {
      this.hideSuccessModal();
    }, 1100); 
  }

  hideSuccessModal() {
    this.isExiting = true;

    setTimeout(() => {
      this.isSuccessModalVisible = false;
      this.isExiting = false;
    }, 500); 
  }

  

  private baseURL = "http://localhost:8080/api/students";
  private deleteURL = "http://localhost:8080/api/students/delete";
  private updateURL = "http://localhost:8080/api/students/update"
    constructor(private httpClient:HttpClient,private route : ActivatedRoute,private router:Router) { }

  
    
    
    student={
      id: 0,
      name: '',
      email: '',
      subject:'',
      marks: 0,
      status: true,
    };
    toshowtext:boolean=true;
    toShowName:boolean =true;
    toShowSubject:boolean=true;
    toShowMark:boolean = true;
    toShowTemp :boolean =true;
    button_name:string='save';
    idStore:number= 0 ;
    nameStore:String= '' ;
    updateEmail :boolean=true;

    // Student:student= new student();
    toShowCorrectMark :boolean =true ;
    toShowPositiveMarks :boolean =true ;

    validator(email:String,name:String,subject:String){
    this.toshowtext = true;
    this.toShowSubject = true;
    this.toShowName = true;
    this.toShowMark = true;
    this.toShowCorrectMark =true;
    this.toShowPositiveMarks =true ;

    const trimmedEmail = email.trim();
    const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
   
    if (email.length === 0 || email.indexOf('@') === -1 || !email.endsWith('.com') || !emailPattern.test(trimmedEmail)) {
        this.toshowtext = false;
    }

  
    if (subject.length   === 0) {
        this.toShowSubject = false;
    }
    const trimmedName = name.trim();
    const namePattern = /^[a-zA-Z\s]+$/;
    if (trimmedName.length === 0 || !namePattern.test(trimmedName)) {
      this.toShowName = false;
    } else {
      this.student.name = trimmedName; 
    }

    if(this.student.marks==null){
      this.toShowMark = false;
    }
    else if(this.student.marks>100){
      this.toShowCorrectMark = false;
    }
    else if (this.student.marks<0){
      this.toShowPositiveMarks =false ;
    }

  }
    
    ngOnInit(): void {
      this.getstudents();
    }

    createStudentList(student:any): Observable<Object>{
      return this.httpClient.post(`${this.baseURL}`,student)
    }

    onClick() { 
      
        // console.log(this.toShowName,this.student.name.length,'efg');
        // console.log(this.toShowSubject,'efg');
        // console.log(this.toshowtext,this.student.email.length,'efg');
        this.validator(this.student.email, this.student.name, this.student.subject);
        

        if(this.button_name == 'update'){
          this.updateEmailChecker(this.student.id,this.student.email);
          this.toShowTemp =true;
          if(this.toShowName && this.toShowSubject && this.toshowtext && this.toShowMark && this.updateEmail){
            this.SaveStudent();
            this.reset();
            
          }
        }
        else if(this.button_name =='save'){
          this.emailChecker(this.student.email);
        if(this.toShowName && this.toShowSubject && this.toshowtext && this.toShowMark && this.toShowTemp){
          this.SaveStudent();
          this.reset();
      }
    }
      }

    public getstudents(){
      this.getStudentsList().subscribe((data: any[])=>{
        this.students = data;
        this.searchStudent=data;
        
      });
    }

    toShowMarks(event:any){
       console.log("dfgfdfggf",event);
       const value = event.target.value;
    if (value < 0 || value > 100) {
        this.student.marks = 0;
    }

    }

    getStudentsList(): Observable<any[]> {
      return this.httpClient.get<any[]>(`${this.baseURL}`);
    }

    updateClick(stu:any){
      this.student.id=stu.id;
      this.student.name = stu.name;
      this.student.email = stu.email;
      this.student.marks = stu.marks;
      this.student.subject=stu.subject;
      this.student.status=stu.status;
      // this.SaveStudent();
      this.button_name='update';
      
    }

    deleteClick(id: any){
      this.deleteS(id);
      this.reset();
    }


    deleteStudent(id:number):Observable<Object>{
      return this.httpClient.get(`${this.deleteURL}/${id}`);
    }


    deleteS(id: number) {
      this.deleteStudent(id).subscribe(data=>{
        console.log(data);
        this.getstudents();
      })
    }

    reset() {
      this.student.id=0;
      this.student.name = '';
      this.student.email = '';
      this.student.marks = 0;
      this.student.subject='';
      this.student.status=true;
      this.button_name = 'save';
      // console.log(this.toShowName,'efg');
      this.toShowMark =true ;
      this.toShowName = true ;
      this.toShowTemp = true ;
      this.toShowSubject = true ;
      this.toshowtext = true ;
      this.toShowCorrectMark =true ;
      this.toShowPositiveMarks =true ;

  }
  searchBar() {
    const query = this.searchQuery.toLowerCase();
    this.searchStudent = [];
   

    for (let i = 0; i < this.students.length; i++) {
      const statusString=this.students[i].status? 'Active' : 'Inactive';
      if (this.students[i].name.toLowerCase().includes(query) || this.students[i].email.toLowerCase().includes(query) || this.students[i].subject.toLowerCase().includes(query)||statusString.toLowerCase().includes(query)||this.students[i].marks.toString().includes(query)) {
        this.searchStudent.push(this.students[i]);
      }
  }
}
sortAttribute: string = 'marks'; 
  sortOrder: string = 'ascending';
sort() {
  // Sort the searchStudent array based on selected attribute and order
  if (this.sortAttribute === 'marks') {
    this.searchStudent.sort((a, b) => {
      if (this.sortOrder === 'ascending') {
        return a.marks - b.marks;
      } else {
        return b.marks - a.marks;
      }
    });
  } else if (this.sortAttribute === 'name') {
    this.searchStudent.sort((a, b) => {
      if (this.sortOrder === 'ascending') {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
  }
}


sorting(event: any) {
  this.sortOrder = event.target.value;
  this.sort(); 
}


onSortAttributeChange(event: any) {
  this.sortAttribute = event.target.value;
  this.sort(); 
}

  emailChecker(email:string){
    this.toShowTemp = true ;
    for(let i =0;i<this.students.length;i++){
      if(this.student.email === this.students[i].email){
        this.toShowTemp = false;
      }
    }
  }   

  onStore(id:number,name:string){
    this.idStore = id ;
    this.nameStore=name;
  }

  updateEmailChecker(id:number,email:string){
    this.updateEmail = true;
    console.log('sdfghj');
    for(let i = 0 ;i<this.students.length;i++){
      console.log('sdfghj',i);
      if(this.students[i].id != id){
        console.log(this.students[i].id,i,id);
        if(this.students[i].email == email){
          this.updateEmail = false;
        }
  }
  }
  }

  
}