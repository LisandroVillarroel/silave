import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaDatosEmpresaComponent } from './consulta-datos-empresa.component';

describe('ConsultaDatosEmpresaComponent', () => {
  let component: ConsultaDatosEmpresaComponent;
  let fixture: ComponentFixture<ConsultaDatosEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultaDatosEmpresaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaDatosEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
