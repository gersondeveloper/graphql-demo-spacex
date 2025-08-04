import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavSideBar } from './nav-side-bar';

describe('NavSideBar', () => {
  let component: NavSideBar;
  let fixture: ComponentFixture<NavSideBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavSideBar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavSideBar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
