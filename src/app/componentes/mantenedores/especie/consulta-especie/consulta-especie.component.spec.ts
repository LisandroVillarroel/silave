import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaEspecieComponent } from './consulta-especie.component';

describe('ConsultaEspecieComponent', () => {
  let component: ConsultaEspecieComponent;
  let fixture: ComponentFixture<ConsultaEspecieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultaEspecieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaEspecieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
