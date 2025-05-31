import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HabitoComponent } from './habito.component';

describe('HabitoComponent', () => {
  let component: HabitoComponent;
  let fixture: ComponentFixture<HabitoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HabitoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HabitoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
