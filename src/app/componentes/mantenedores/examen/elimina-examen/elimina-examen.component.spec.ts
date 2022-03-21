import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminaExamenComponent } from './elimina-examen.component';

describe('EliminaExamenComponent', () => {
  let component: EliminaExamenComponent;
  let fixture: ComponentFixture<EliminaExamenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EliminaExamenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminaExamenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
