import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuListItemPerfilComponent } from './menu-list-item-perfil.component';

describe('MenuListItemPerfilComponent', () => {
  let component: MenuListItemPerfilComponent;
  let fixture: ComponentFixture<MenuListItemPerfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuListItemPerfilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuListItemPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
