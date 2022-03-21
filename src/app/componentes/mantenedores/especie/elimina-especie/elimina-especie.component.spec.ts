import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminaEspecieComponent } from './elimina-especie.component';

describe('EliminaEspecieComponent', () => {
  let component: EliminaEspecieComponent;
  let fixture: ComponentFixture<EliminaEspecieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EliminaEspecieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminaEspecieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
