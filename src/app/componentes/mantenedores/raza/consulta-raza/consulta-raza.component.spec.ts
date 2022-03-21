import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaRazaComponent } from './consulta-raza.component';

describe('ConsultaRazaComponent', () => {
  let component: ConsultaRazaComponent;
  let fixture: ComponentFixture<ConsultaRazaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultaRazaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaRazaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
