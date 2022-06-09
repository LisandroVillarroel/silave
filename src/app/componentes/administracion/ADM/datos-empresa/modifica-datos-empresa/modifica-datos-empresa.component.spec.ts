import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificaDatosEmpresaComponent } from './modifica-datos-empresa.component';

describe('ModificaDatosEmpresaComponent', () => {
  let component: ModificaDatosEmpresaComponent;
  let fixture: ComponentFixture<ModificaDatosEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificaDatosEmpresaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificaDatosEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
