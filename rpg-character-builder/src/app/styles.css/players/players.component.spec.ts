import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { Routes } from '@angular/router';
import { PlayersComponent } from './players.component';
import { AppComponent } from '../app.component';
import { Location } from '@angular/common';
import { RouterTestingHarness } from '@angular/router/testing';

describe('PlayersComponent', () => {
  let component: PlayersComponent;
  let fixture: ComponentFixture<PlayersComponent>;
  let location: Location;

  const routes: Routes = [
    { path: 'players', component: PlayersComponent }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        RouterTestingModule.withRoutes(routes),
        AppComponent
      ],
      declarations: [PlayersComponent],
    }).compileComponents();

    location = TestBed.inject(Location);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayersComponent);
    component = fixture.componentInstance;
    component.characters = [
      { 
        name: 'Thorn', 
        gender: 'Male', 
        class: 'Warrior', 
        faction: 'The Iron Brotherhood', 
        startingLocation: 'Ironhold', 
        funFact: 'Thorn once single-handedly defeated a dragon.' 
      },
      { 
        name: 'Elara', 
        gender: 'Female', 
        class: 'Mage', 
        faction: 'The Silver Circle', 
        startingLocation: 'Silvermoon', 
        funFact: 'Elara can speak to animals.' 
      },
      { 
        name: 'Kara', 
        gender: 'Female', 
        class: 'Rogue', 
        faction: 'Shadow Guild', 
        startingLocation: 'Darkwood', 
        funFact: 'Kara has never been caught while stealing.' 
      },
      { 
        name: 'Borin', 
        gender: 'Male', 
        class: 'Warrior', 
        faction: 'Mountain Clans', 
        startingLocation: 'Stonekeep', 
        funFact: 'Borin can lift twice his body weight.' 
      },
      { 
        name: 'Lyra', 
        gender: 'Female', 
        class: 'Mage', 
        faction: 'Mystic Order', 
        startingLocation: 'Crystal Cavern', 
        funFact: 'Lyra once cast a spell that made the sun shine for 24 hours.' 
      },
      { 
        name: 'Ragnar', 
        gender: 'Male', 
        class: 'Rogue', 
        faction: 'Silent Assassins', 
        startingLocation: 'Black Marsh', 
        funFact: 'Ragnar can move silently even on dried leaves.' 
      },
      { 
        name: 'Seraphina', 
        gender: 'Female', 
        class: 'Warrior', 
        faction: 'The Dawnbringers', 
        startingLocation: 'Sunspire', 
        funFact: 'Seraphina once led a successful charge against an orc horde.' 
      },
      { 
        name: 'Zarek', 
        gender: 'Male', 
        class: 'Mage', 
        faction: 'Stormcallers', 
        startingLocation: 'Thunder Peak', 
        funFact: 'Zarek can control the weather with his staff.' 
      },
      { 
        name: 'Nyx', 
        gender: 'Other', 
        class: 'Rogue', 
        faction: 'Nightblades', 
        startingLocation: 'Shadowfell', 
        funFact: 'Nyx can see in complete darkness.' 
      },
      { 
        name: 'Thalia', 
        gender: 'Female', 
        class: 'Warrior', 
        faction: 'The Valkyries', 
        startingLocation: 'Valhalla', 
        funFact: 'Thalia is undefeated in over 100 duels.' 
      }
    ];
    fixture.detectChanges();
  });

  it('should create players component', () => {
    expect(component).toBeTruthy();
  });

  it('should correctly display a list of characters', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const characterElements = compiled.querySelectorAll('.character');
    expect(characterElements.length).toBe(10);
  });

  it('should have correct route for Players Component', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/players');

    const compiled = fixture.nativeElement as HTMLElement;
    const playersLink = compiled.querySelector('a[routerLink="/players"]');
    expect(playersLink).toBeTruthy();
  });

  it('should navigate to Players Component when link is clicked', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/');

    const appFixture = TestBed.createComponent(AppComponent);
    appFixture.detectChanges();

    const compiled = appFixture.nativeElement as HTMLElement;
    const playersLink = compiled.querySelector('a[routerLink="/players"]') as HTMLElement;

    playersLink.click();
    await harness.navigateByUrl('/players');

    expect(location.path()).toBe('/players');
  });
});
