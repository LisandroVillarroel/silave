import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregaPropietarioComponent } from './agrega-propietario.component';

describe('AgregaComponent', () => {
  let component: AgregaPropietarioComponent;
  let fixture: ComponentFixture<AgregaPropietarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregaPropietarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregaPropietarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
