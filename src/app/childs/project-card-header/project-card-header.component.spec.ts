import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectCardHeaderComponent } from './project-card-header.component';

describe('ProjectCardHeaderComponent', () => {
  let component: ProjectCardHeaderComponent;
  let fixture: ComponentFixture<ProjectCardHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectCardHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectCardHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
