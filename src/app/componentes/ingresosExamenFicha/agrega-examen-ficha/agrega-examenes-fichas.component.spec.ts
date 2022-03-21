import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregaExamenesFichasComponent } from './agrega-examenes-fichas.component';

describe('AgregaExamenesFichasComponent', () => {
  let component: AgregaExamenesFichasComponent;
  let fixture: ComponentFixture<AgregaExamenesFichasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregaExamenesFichasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregaExamenesFichasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
