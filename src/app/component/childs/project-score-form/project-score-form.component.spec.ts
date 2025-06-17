import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectScoreFormComponent } from './project-score-form.component';

describe('ProjectScoreFormComponent', () => {
  let component: ProjectScoreFormComponent;
  let fixture: ComponentFixture<ProjectScoreFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectScoreFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectScoreFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
