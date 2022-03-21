import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaExamenComponent } from './consulta-examen.component';

describe('ConsultaExamenComponent', () => {
  let component: ConsultaExamenComponent;
  let fixture: ComponentFixture<ConsultaExamenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultaExamenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaExamenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
