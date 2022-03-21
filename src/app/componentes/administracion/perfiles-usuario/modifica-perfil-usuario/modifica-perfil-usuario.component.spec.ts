import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificaPerfilUsuarioComponent } from './modifica-perfil-usuario.component';

describe('ModificaPerfilUsuarioComponent', () => {
  let component: ModificaPerfilUsuarioComponent;
  let fixture: ComponentFixture<ModificaPerfilUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificaPerfilUsuarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificaPerfilUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
