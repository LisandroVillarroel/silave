import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificaFormatosComponent } from './modifica-formatos.component';

describe('ModificaFormatosComponent', () => {
  let component: ModificaFormatosComponent;
  let fixture: ComponentFixture<ModificaFormatosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificaFormatosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificaFormatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
