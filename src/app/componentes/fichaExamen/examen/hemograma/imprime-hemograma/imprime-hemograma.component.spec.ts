import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImprimeHemogramaComponent } from './imprime-hemograma.component';

describe('ImprimeHemogramaComponent', () => {
  let component: ImprimeHemogramaComponent;
  let fixture: ComponentFixture<ImprimeHemogramaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImprimeHemogramaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImprimeHemogramaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
