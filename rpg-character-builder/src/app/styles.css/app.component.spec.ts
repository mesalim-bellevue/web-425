import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { PlayersComponent } from '../players/players.component';
import { Routes } from '@angular/router';

// Define routes for testing
const routes: Routes = [
  { path: 'players', component: PlayersComponent }
];

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes), AppComponent], // Add RouterTestingModule with routes
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Trigger change detection to render the template
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have the 'rpg-character-builder' title`, () => {
    expect(component.title).toEqual('rpg-character-builder');
  });

  it('should render title in the h1 tag', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const h1 = compiled.querySelector('h1');
    expect(h1?.textContent).toContain('rpg-character-builder');
  });
});

describe('AppComponent Routing', () => {
  let fixture: ComponentFixture<AppComponent>;
  let router: Router;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes), AppComponent], // Import standalone component and routing
    }).compileComponents();

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    fixture = TestBed.createComponent(AppComponent);
    router.initialNavigation(); // Start initial navigation
  });

  it('should navigate to PlayersComponent when /players route is clicked', async () => {
    await router.navigate(['/players']);
    expect(location.path()).toBe('/players');
  });
});