import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminaPerfilUsuarioComponent } from './elimina-perfil-usuario.component';

describe('EliminaPerfilUsuarioComponent', () => {
  let component: EliminaPerfilUsuarioComponent;
  let fixture: ComponentFixture<EliminaPerfilUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EliminaPerfilUsuarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminaPerfilUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
