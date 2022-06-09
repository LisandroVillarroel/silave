import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregaDatosEmpresaComponent } from './agrega-datos-empresa.component';

describe('AgregaDatosEmpresaComponent', () => {
  let component: AgregaDatosEmpresaComponent;
  let fixture: ComponentFixture<AgregaDatosEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregaDatosEmpresaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregaDatosEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
