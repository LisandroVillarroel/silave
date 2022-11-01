import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarraExamenesComponent } from './barra-examenes.component';

describe('BarraExamenesComponent', () => {
  let component: BarraExamenesComponent;
  let fixture: ComponentFixture<BarraExamenesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarraExamenesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BarraExamenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
