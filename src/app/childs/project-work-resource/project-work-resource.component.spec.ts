import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectWorkResourceComponent } from './project-work-resource.component';

describe('ProjectWorkResourceComponent', () => {
  let component: ProjectWorkResourceComponent;
  let fixture: ComponentFixture<ProjectWorkResourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectWorkResourceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectWorkResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
