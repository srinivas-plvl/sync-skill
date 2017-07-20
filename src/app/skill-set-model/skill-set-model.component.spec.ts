import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillSetModelComponent } from './skill-set-model.component';

describe('SkillSetModelComponent', () => {
  let component: SkillSetModelComponent;
  let fixture: ComponentFixture<SkillSetModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkillSetModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillSetModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
