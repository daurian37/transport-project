import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForOForComponent } from './for-o-for.component';

describe('ForOForComponent', () => {
  let component: ForOForComponent;
  let fixture: ComponentFixture<ForOForComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForOForComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForOForComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
