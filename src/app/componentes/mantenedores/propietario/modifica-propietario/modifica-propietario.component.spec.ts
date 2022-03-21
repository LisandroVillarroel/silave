import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificaPropietarioComponent } from './modifica-propietario.component';

describe('ModificaComponent', () => {
  let component: ModificaPropietarioComponent;
  let fixture: ComponentFixture<ModificaPropietarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificaPropietarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificaPropietarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
