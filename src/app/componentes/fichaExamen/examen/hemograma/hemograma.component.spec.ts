import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HemogramaComponent } from './hemograma.component';

describe('HemogramaComponent', () => {
  let component: HemogramaComponent;
  let fixture: ComponentFixture<HemogramaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HemogramaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HemogramaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
