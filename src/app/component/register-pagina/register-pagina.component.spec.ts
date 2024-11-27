import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterPaginaComponent } from './register-pagina.component';

describe('RegisterPaginaComponent', () => {
  let component: RegisterPaginaComponent;
  let fixture: ComponentFixture<RegisterPaginaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterPaginaComponent]
    });
    fixture = TestBed.createComponent(RegisterPaginaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
