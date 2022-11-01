import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarraComparaComponent } from './barra-compara.component';

describe('BarraComparaComponent', () => {
  let component: BarraComparaComponent;
  let fixture: ComponentFixture<BarraComparaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarraComparaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BarraComparaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
