import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuLateralHabitoComponent } from './menu-lateral-habito.component';

describe('MenuLateralHabitoComponent', () => {
  let component: MenuLateralHabitoComponent;
  let fixture: ComponentFixture<MenuLateralHabitoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuLateralHabitoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuLateralHabitoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
