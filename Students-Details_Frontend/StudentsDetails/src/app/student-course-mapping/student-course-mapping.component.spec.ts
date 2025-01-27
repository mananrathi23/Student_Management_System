import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentCourseMappingComponent } from './student-course-mapping.component';

describe('StudentCourseMappingComponent', () => {
  let component: StudentCourseMappingComponent;
  let fixture: ComponentFixture<StudentCourseMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentCourseMappingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentCourseMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
