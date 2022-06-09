import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificaUsuariosEmpresaComponent } from './modifica-usuarios-empresa.component';

describe('ModificaUsuariosEmpresaComponent', () => {
  let component: ModificaUsuariosEmpresaComponent;
  let fixture: ComponentFixture<ModificaUsuariosEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificaUsuariosEmpresaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificaUsuariosEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
