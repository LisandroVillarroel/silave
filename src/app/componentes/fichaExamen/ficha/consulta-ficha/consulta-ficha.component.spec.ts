import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaFichaComponent } from './consulta-ficha.component';

describe('ConsultaFichaComponent', () => {
  let component: ConsultaFichaComponent;
  let fixture: ComponentFixture<ConsultaFichaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultaFichaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaFichaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
