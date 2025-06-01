import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarHabitoComponent } from './cadastrar-habito.component';

describe('CadastrarHabitoComponent', () => {
  let component: CadastrarHabitoComponent;
  let fixture: ComponentFixture<CadastrarHabitoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastrarHabitoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastrarHabitoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
