import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminaFormatosComponent } from './elimina-formatos.component';

describe('EliminaFormatosComponent', () => {
  let component: EliminaFormatosComponent;
  let fixture: ComponentFixture<EliminaFormatosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EliminaFormatosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminaFormatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
