import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaPropietarioComponent } from './consulta-propietario.component';

describe('ConsultaPropietarioComponent', () => {
  let component: ConsultaPropietarioComponent;
  let fixture: ComponentFixture<ConsultaPropietarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultaPropietarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaPropietarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
