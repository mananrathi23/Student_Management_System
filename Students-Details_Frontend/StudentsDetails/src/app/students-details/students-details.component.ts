import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable, last } from 'rxjs';
import * as $ from 'jquery';
import 'datatables.net';

interface DeleteResponse {
  deleted?: boolean;
}


// declare var $: any;
@Component({
  selector: 'app-students-details',
  templateUrl: './students-details.component.html',
  styleUrls: ['./students-details.component.scss']
})
export class StudentsDetailsComponent implements OnInit {

  @ViewChild('Modal') Modal!: ElementRef;
  StudentsDetails :any[] = [];
  SearchStudentsDetails :any[]=[];
  SearchDetailsQuery:String='';
  button_name:string = 'Save';
  constructor(private httpCLient : HttpClient,private route:ActivatedRoute ,private router:Router) { }

  ngOnInit(): void {
    this.getStudentsDetails();
    // for  sccrolling on top
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });

  }

  private   StudentCreateURL = "http://localhost:8080/api/students/Savedetails";
  private   StudentGetURL = "http://localhost:8080/api/students/getdetails";
  private deleteStudentsDetails = "http://localhost:8080/api/students/details/delete";
  
  toShowFirst:boolean =true;
  toShowLast :boolean= true;
  toShowGaurdian:boolean=true;
  toShowPhone:boolean=true;
  toShowAddress:boolean=true;
    toShowPh:boolean=true;
  idStorage:number = 0;
  

  studentsDetails ={
    id :0,
    firstname :'',
    lastname :'', 
    gaurdianname:'',
    gaurdianphoneno:'',
    address:'',
    year:1
  };
  selectedStudent: any = null;

  
  detailsValidator(firstname:string,lastname:string,gaurdianname:string,gaurdianphoneno:string,address:string){
  this.toShowFirst =true;
  this.toShowLast = true;
  this.toShowGaurdian=true;
  this.toShowPhone=true;
  this.toShowAddress=true;
  const trimmedFirstName = firstname.trim();
  const trimmedLastName = lastname.trim();
  const trimmedGaurdianName = gaurdianname.trim();
  const trimmedPhoneNo = gaurdianphoneno.trim();
  const trimmedAddress = address.trim();
  const namePattern = /^[a-zA-Z\s]+$/;
  const PhoneNo = /^[0-9]{10}$/;
  const Addresses = /^[a-zA-z0-9/.\s]+$/;
  if (trimmedFirstName.length === 0 || !namePattern.test(trimmedFirstName)) {
    this.toShowFirst = false;
  } else {
    this.studentsDetails.firstname = trimmedFirstName; 
  }

  if (trimmedLastName.length === 0 || !namePattern.test(trimmedLastName)) {
    this.toShowLast = false;
  } else {
    this.studentsDetails.lastname = trimmedLastName; 
  }

  if (trimmedGaurdianName.length === 0 || !namePattern.test(trimmedGaurdianName)) {
    this.toShowGaurdian = false;
  } else {
    this.studentsDetails.gaurdianname = trimmedGaurdianName; 
  }

  if (trimmedPhoneNo.length === 0 || !PhoneNo.test(trimmedPhoneNo)) {
    this.toShowPhone = false;
  } else {
    this.studentsDetails.gaurdianphoneno = trimmedPhoneNo; 
  }

  if (trimmedAddress.length === 0 || !Addresses.test(trimmedAddress)) {
    this.toShowAddress = false;
  } else {
    this.studentsDetails.address = trimmedAddress; 
  }



  
  }
  createStudentDetails(studentsDetails:any):Observable<Object>{
    return this.httpCLient.post(`${this.StudentCreateURL}`,studentsDetails)
  } 
  SaveStudentsDetails(){
    this.createStudentDetails(this.studentsDetails).subscribe({
      next:(data:any)=>{
        console.log(data);
        this.getStudentsDetails();

      },
        error:(error:any) =>{
          console.error(error);
        }
  });
  }

  // OnSubmit(){
  //   console.log(this.studentsDetails)
  //   this.SaveStudentsDetails();

  // }

  onSave(){
    this.modalChecker = true ;
    this.detailsValidator(this.studentsDetails.firstname,this.studentsDetails.lastname,this.studentsDetails.gaurdianname,this.studentsDetails.gaurdianphoneno,this.studentsDetails.address);

    if(this.button_name === 'Update'){
    this.updatePhoneChecker(this.studentsDetails.id,this.studentsDetails.gaurdianphoneno);
      if(this.toShowAddress && this.toShowFirst && this.toShowLast && this.toShowGaurdian && this.toShowPhone && this.updatePhoneNo){
        this.SaveStudentsDetails();
        this.resetDetails();
        this.toShowPh = true;
        this.modalChecker = true ;
      }
    }
    else if(this.button_name === 'Save'){
    this.checkerPhone(this.studentsDetails.gaurdianphoneno);
    if(this.toShowAddress && this.toShowFirst && this.toShowLast && this.toShowGaurdian && this.toShowPhone && this.toShowPh){
      this.SaveStudentsDetails();
      this.resetDetails();
      this.modalChecker = true ;
    }
  }
}

  onDelete(id:number){
    this.deleteDetails(id);
    // window.scrollTo(0,0);
    this.resetDetails();
  }

  

  onUpdate(student:any){
    this.studentsDetails.id = student.id ;
    this.studentsDetails.firstname = student.firstname;
    this.studentsDetails.lastname=student.lastname;
    this.studentsDetails.gaurdianname=student.gaurdianname;
    this.studentsDetails.gaurdianphoneno=student.gaurdianphoneno;
    this.studentsDetails.address=student.address;
    this.studentsDetails.year = student.year;
    // this.SaveStudentsDetails();
    this.button_name = 'Update';
    this.modalChecker = true ;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  
  getStudentsDetailsList():Observable<any[]>{
    return this.httpCLient.get<any[]>(`${this.StudentGetURL}`)
  }


  public getStudentsDetails(){
    this.getStudentsDetailsList().subscribe((data:any[])=>{
      this.StudentsDetails = data ;
      this.SearchStudentsDetails = data ;
    })
  }

    modalChecker :boolean  = true ;
  deleteStudentD(id: number): Observable<DeleteResponse> {
    return this.httpCLient.get<DeleteResponse>(`${this.deleteStudentsDetails}/${id}`);
  }
  
  deleteDetails(id: number) {
    this.modalChecker = true ;
    this.deleteStudentD(id).subscribe((data: DeleteResponse) => {
      console.log(data,'jdv');
      if (data["deleted"] === false) {
        console.log('Student not deleted:', data);
        this.modalChecker = false ;
        window.scrollTo({ top: 0, behavior: 'smooth' });
        this.showText();
      } 
      else {
        console.log('Student deleted successfully or another response:', data); 
      }
  
      // Refresh the students' details
      this.getStudentsDetails();
    });
  }

  // openModal() {
  //   const modalElement = this.Modal.nativeElement;
  //   const modal = new bootstrap.Modal(modalElement);
  //   modal.show();
  // }
  

  


  resetDetails(){
    this.studentsDetails.id =0;
    this.studentsDetails.firstname ='';
    this.studentsDetails.lastname ='';
    this.studentsDetails.gaurdianname='';
    this.studentsDetails.gaurdianphoneno='';
    this.studentsDetails.address='';
    this.studentsDetails.year = 1 ;
    this.button_name = 'Save'

    this.toShowAddress =true;
    this.toShowFirst =true ;
    this.toShowGaurdian = true ;
    this.toShowLast = true;
    this.toShowPhone = true;
    this.toShowPh = true;
    this.modalChecker = true ;
  }


  studentsDetailsSearchBar(){
    const SearchQuery = this.SearchDetailsQuery.toLowerCase();
    this.SearchStudentsDetails = [];
    for(let i = 0;i< this.StudentsDetails.length;i++){
      if(this.StudentsDetails[i].firstname.toLowerCase().includes(SearchQuery) || this.StudentsDetails[i].lastname.toLowerCase().includes(SearchQuery) || this.StudentsDetails[i].gaurdianname.toLowerCase().includes(SearchQuery) || this.StudentsDetails[i].address.toLowerCase().includes(SearchQuery) || this.StudentsDetails[i].gaurdianphoneno.toLowerCase().includes(SearchQuery)){
        this.SearchStudentsDetails.push(this.StudentsDetails[i])
      }
    }
  }

  checkerPhone(gaurdianphoneno:string){
    this.toShowPh = true;
    for(let i = 0 ;i<this.StudentsDetails.length;i++){
      if(this.studentsDetails.gaurdianphoneno === this.StudentsDetails[i].gaurdianphoneno){
        this.toShowPh = false;
      }
    }
  }

  idfirstname :string = ''
  idlastname :string = ''
  onStoreid(id:number,firstname:string,lastname:string){
    this.modalChecker = true ;
    this.idStorage = id;
    this.idfirstname = firstname ;
    this.idlastname = lastname;
  }


  marksOrName: string = 'firstname';

  sort(event: any) {
    const value = event.target.value;
    if (value === 'gaurdianname' || value === 'firstname') {
      this.marksOrName = value;
    }
  }

  sorting(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const order = selectElement.value;

    if (this.marksOrName === 'gaurdianname') {
      if (order === 'ascending') {
        this.SearchStudentsDetails.sort((a, b) => a.gaurdianname.localeCompare(b.gaurdianname));
      } else if (order === 'descending') {
        this.SearchStudentsDetails.sort((a, b) => b.gaurdianname.localeCompare(a.gaurdianname));
      }
    } else if (this.marksOrName === 'firstname') {
      if (order === 'ascending') {
        this.SearchStudentsDetails.sort((a, b) => a.firstname.localeCompare(b.firstname));
      } else if (order === 'descending') {
        this.SearchStudentsDetails.sort((a, b) => b.firstname.localeCompare(a.firstname));
      }
    }
  }
updatePhoneNo :boolean = true;

updatePhoneChecker(id:number,gaurdianphoneno:string){
  this.updatePhoneNo = true;
  console.log('sdfghj');
  for(let i = 0 ;i<this.StudentsDetails.length;i++){
    console.log('sdfghj',i);
    if(this.StudentsDetails[i].id != id){
      console.log(this.StudentsDetails[i].id,i,id);
      if(this.StudentsDetails[i].gaurdianphoneno == gaurdianphoneno){
        this.updatePhoneNo = false;
      }
}
}
}
isTextVisible = false;

showText(): void {
  this.isTextVisible = true;
  setTimeout(() => {
    this.isTextVisible = false;
  }, 3000);
}



}
