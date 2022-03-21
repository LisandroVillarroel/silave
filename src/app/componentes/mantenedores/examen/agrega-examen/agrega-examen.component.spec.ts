import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregaExamenComponent } from './agrega-examen.component';

describe('AgregaExamenComponent', () => {
  let component: AgregaExamenComponent;
  let fixture: ComponentFixture<AgregaExamenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregaExamenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregaExamenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
