import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlayersComponent } from './players.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { By } from '@angular/platform-browser';

describe('PlayersComponent', () => {
  let component: PlayersComponent;
  let fixture: ComponentFixture<PlayersComponent>;
  let router: Router;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayersComponent, RouterTestingModule.withRoutes([])], // Setup RouterTestingModule
    }).compileComponents();

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    fixture = TestBed.createComponent(PlayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the PlayersComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to PlayersComponent when the Player’s link is clicked', async () => {
    const playerLink = fixture.debugElement.query(By.css('[data-test-id="players-link"]'));
    expect(playerLink).toBeTruthy();
    playerLink.triggerEventHandler('click', null);

    fixture.whenStable().then(() => {
      expect(location.path()).toBe('');
    });
  });

  it('should display a list of characters', () => {
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
    const characterElements = fixture.debugElement.queryAll(By.css('[data-test-id="character-item"]'));
    expect(characterElements.length).toBe(10); 

    const firstCharacterName = characterElements[0].query(By.css('h3')).nativeElement.textContent;
    expect(firstCharacterName).toContain('Thorn');
  });
});