import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregaFormatosComponent } from './agrega-formatos.component';

describe('AgregaFormatosComponent', () => {
  let component: AgregaFormatosComponent;
  let fixture: ComponentFixture<AgregaFormatosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregaFormatosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregaFormatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
