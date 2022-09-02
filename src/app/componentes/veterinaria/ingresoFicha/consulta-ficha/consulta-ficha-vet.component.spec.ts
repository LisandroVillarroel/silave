import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaFichaVetComponent } from './consulta-ficha-vet.component';

describe('ConsultaFichaComponent', () => {
  let component: ConsultaFichaVetComponent;
  let fixture: ComponentFixture<ConsultaFichaVetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultaFichaVetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaFichaVetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
