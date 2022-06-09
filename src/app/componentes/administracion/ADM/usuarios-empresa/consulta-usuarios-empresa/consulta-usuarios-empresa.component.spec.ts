import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaUsuariosEmpresaComponent } from './consulta-usuarios-empresa.component';

describe('ConsultaUsuariosEmpresaComponent', () => {
  let component: ConsultaUsuariosEmpresaComponent;
  let fixture: ComponentFixture<ConsultaUsuariosEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultaUsuariosEmpresaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaUsuariosEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
