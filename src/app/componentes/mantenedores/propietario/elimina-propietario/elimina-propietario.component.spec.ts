import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminaPropietarioComponent } from './elimina-propietario.component';

describe('EliminaComponent', () => {
  let component: EliminaPropietarioComponent;
  let fixture: ComponentFixture<EliminaPropietarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EliminaPropietarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminaPropietarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
