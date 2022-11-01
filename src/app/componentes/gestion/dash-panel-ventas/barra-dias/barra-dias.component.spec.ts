import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarraDiasComponent } from './barra-dias.component';

describe('BarraDiasComponent', () => {
  let component: BarraDiasComponent;
  let fixture: ComponentFixture<BarraDiasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarraDiasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BarraDiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
