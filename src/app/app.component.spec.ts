import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MatFormFieldModule, MatInputModule, MatSelectModule, MatProgressSpinnerModule, MatTableModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule, By } from '@angular/platform-browser';
import { FSAService } from './services/fsa.service';
import { FSAAPIMock } from './mocks/fsapimock';
import { of as observableOf } from 'rxjs';

const FSAServiceStub = {
  getAuthorities: () => {
    return observableOf(FSAAPIMock.getAuthorities());
  },
  getRatingPercentages: (authorityId: number) => {
    return observableOf(FSAAPIMock.getRatingPercentages());
  }
};

describe('AppComponent', () => {

  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
      ],
      imports: [
        BrowserModule,
        MatSelectModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatFormFieldModule,
        MatTableModule,
        BrowserAnimationsModule
      ],
      providers: [
        {provide: FSAService, useValue: FSAServiceStub }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  }));

  it('should create the app', async(() => {
    expect(component).toBeTruthy();
  }));

  it('Should display the rating percentages if when a local authority is selected', async() => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.authority-title').textContent).toContain('Select a local authority');
    expect(compiled.querySelector('.mat-select')).toBeTruthy();
  });

  it('Should display the rating percentages when a local authority is selected', async() => {
    fixture.detectChanges();
    await fixture.whenStable();

    const targetSelect = fixture.debugElement.query(By.css('#authoritySelect'));
    targetSelect.query(By.css('.mat-select-trigger')).nativeElement.click();
    fixture.detectChanges();

    const options = targetSelect.queryAll(By.css('.mat-option'));

    const targetOption = options.map(el => {
      return el.nativeElement;
    }).filter(el => el.textContent.indexOf('Aberdeenshire') !== -1);

    targetOption[0].click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(fixture.debugElement.query(By.css('#percentageRatingTable')).nativeElement).toBeTruthy();
    expect(fixture.debugElement.query(By.css('#loadingIndicator'))).toBeFalsy();

  });

  // it(`should have as title 'app'`, async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app.title).toEqual('app');
  // }));
  // it('should render title in a h1 tag', async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('h1').textContent).toContain('Welcome to fsa-ui-ng!');
  // }));

});
