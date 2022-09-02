import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PruebasDeCoagulacionComponent } from './pruebas-de-coagulacion.component';

describe('PruebasDeCoagulacionComponent', () => {
  let component: PruebasDeCoagulacionComponent;
  let fixture: ComponentFixture<PruebasDeCoagulacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PruebasDeCoagulacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PruebasDeCoagulacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
