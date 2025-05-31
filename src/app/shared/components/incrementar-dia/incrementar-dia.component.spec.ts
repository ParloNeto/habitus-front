import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncrementarDiaComponent } from './incrementar-dia.component';

describe('IncrementarDiaComponent', () => {
  let component: IncrementarDiaComponent;
  let fixture: ComponentFixture<IncrementarDiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncrementarDiaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncrementarDiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
