import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarraGeneralComponent } from './barra-general.component';

describe('BarraGeneralComponent', () => {
  let component: BarraGeneralComponent;
  let fixture: ComponentFixture<BarraGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarraGeneralComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BarraGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
