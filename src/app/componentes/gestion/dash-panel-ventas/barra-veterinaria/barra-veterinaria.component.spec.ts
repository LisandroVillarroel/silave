import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarraVeterinariaComponent } from './barra-veterinaria.component';

describe('BarraVeterinariaComponent', () => {
  let component: BarraVeterinariaComponent;
  let fixture: ComponentFixture<BarraVeterinariaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarraVeterinariaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BarraVeterinariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
