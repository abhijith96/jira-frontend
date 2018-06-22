import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendHelpComponent } from './send-help.component';

describe('SendHelpComponent', () => {
  let component: SendHelpComponent;
  let fixture: ComponentFixture<SendHelpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendHelpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
