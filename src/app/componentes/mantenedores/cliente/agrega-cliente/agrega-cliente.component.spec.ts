import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregaClienteComponent } from './agrega-cliente.component';

describe('AgregaClienteComponent', () => {
  let component: AgregaClienteComponent;
  let fixture: ComponentFixture<AgregaClienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregaClienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregaClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
