import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregaPerfilUsuarioComponent } from './agrega-perfil-usuario.component';

describe('AgregaPerfilUsuarioComponent', () => {
  let component: AgregaPerfilUsuarioComponent;
  let fixture: ComponentFixture<AgregaPerfilUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregaPerfilUsuarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregaPerfilUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
