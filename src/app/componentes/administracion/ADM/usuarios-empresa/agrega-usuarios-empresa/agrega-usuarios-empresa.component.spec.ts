import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregaUsuariosEmpresaComponent } from './agrega-usuarios-empresa.component';

describe('AgregaUsuariosEmpresaComponent', () => {
  let component: AgregaUsuariosEmpresaComponent;
  let fixture: ComponentFixture<AgregaUsuariosEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregaUsuariosEmpresaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregaUsuariosEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
