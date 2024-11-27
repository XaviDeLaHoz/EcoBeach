import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventosUnidosPaginaComponent } from './eventos-unidos-pagina.component';

describe('EventosUnidosPaginaComponent', () => {
  let component: EventosUnidosPaginaComponent;
  let fixture: ComponentFixture<EventosUnidosPaginaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventosUnidosPaginaComponent]
    });
    fixture = TestBed.createComponent(EventosUnidosPaginaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
