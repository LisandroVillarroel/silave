import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaFormatosComponent } from './consulta-formatos.component';

describe('ConsultaFormatosComponent', () => {
  let component: ConsultaFormatosComponent;
  let fixture: ComponentFixture<ConsultaFormatosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultaFormatosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaFormatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
