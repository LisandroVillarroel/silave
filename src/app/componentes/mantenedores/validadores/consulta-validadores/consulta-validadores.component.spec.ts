import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaValidadoresComponent } from './consulta-validadores.component';

describe('ConsultaValidadoresComponent', () => {
  let component: ConsultaValidadoresComponent;
  let fixture: ComponentFixture<ConsultaValidadoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultaValidadoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaValidadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
