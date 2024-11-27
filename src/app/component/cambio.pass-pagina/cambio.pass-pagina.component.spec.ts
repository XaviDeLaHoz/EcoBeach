import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CambioPassPaginaComponent } from './cambio.pass-pagina.component';

describe('CambioPassPaginaComponent', () => {
  let component: CambioPassPaginaComponent;
  let fixture: ComponentFixture<CambioPassPaginaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CambioPassPaginaComponent]
    });
    fixture = TestBed.createComponent(CambioPassPaginaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
