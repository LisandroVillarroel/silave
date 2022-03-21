import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminaFichaComponent } from './elimina-ficha.component';

describe('EliminaFichaComponent', () => {
  let component: EliminaFichaComponent;
  let fixture: ComponentFixture<EliminaFichaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EliminaFichaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminaFichaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
