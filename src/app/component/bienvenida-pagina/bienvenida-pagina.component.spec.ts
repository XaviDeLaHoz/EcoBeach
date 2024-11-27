import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BienvenidaPaginaComponent } from './bienvenida-pagina.component';

describe('BienvenidaPaginaComponent', () => {
  let component: BienvenidaPaginaComponent;
  let fixture: ComponentFixture<BienvenidaPaginaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BienvenidaPaginaComponent]
    });
    fixture = TestBed.createComponent(BienvenidaPaginaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
