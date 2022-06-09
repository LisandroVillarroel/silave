import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminaDatosEmpresaComponent } from './elimina-datos-empresa.component';

describe('EliminaDatosEmpresaComponent', () => {
  let component: EliminaDatosEmpresaComponent;
  let fixture: ComponentFixture<EliminaDatosEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EliminaDatosEmpresaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminaDatosEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
