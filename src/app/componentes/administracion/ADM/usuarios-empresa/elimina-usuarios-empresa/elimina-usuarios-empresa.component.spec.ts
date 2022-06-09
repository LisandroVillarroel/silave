import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminaUsuariosEmpresaComponent } from './elimina-usuarios-empresa.component';

describe('EliminaUsuariosEmpresaComponent', () => {
  let component: EliminaUsuariosEmpresaComponent;
  let fixture: ComponentFixture<EliminaUsuariosEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EliminaUsuariosEmpresaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminaUsuariosEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
