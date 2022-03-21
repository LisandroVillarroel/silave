import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaPerfilUsuarioComponent } from './consulta-perfil-usuario.component';

describe('ConsultaPerfilUsuarioComponent', () => {
  let component: ConsultaPerfilUsuarioComponent;
  let fixture: ComponentFixture<ConsultaPerfilUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultaPerfilUsuarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaPerfilUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
