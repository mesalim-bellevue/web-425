import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { GuildListComponent } from './guild-list.component';

describe('GuildListComponent', () => {
  let component: GuildListComponent;
  let fixture: ComponentFixture<GuildListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuildListComponent, CommonModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuildListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display guilds passed via Input property', () => {
    const testGuilds = [
      {
        guildName: 'Warriors Guild',
        description: 'A guild for brave warriors.',
        type: 'Competitive',
        acceptTerms: true,
        notificationPreference: 'Email',
      },
      {
        guildName: 'Mages Guild',
        description: 'A guild for powerful mages.',
        type: 'Social',
        acceptTerms: true,
        notificationPreference: 'SMS',
      },
    ];

    component.guilds = testGuilds; // Pass guilds to the component
    fixture.detectChanges(); // Trigger change detection

    const guildCards = fixture.nativeElement.querySelectorAll('.guild-card');
    expect(guildCards.length).toBe(2); // Ensure two guilds are displayed
    expect(guildCards[0].textContent).toContain('Warriors Guild'); // Verify guild name
    expect(guildCards[1].textContent).toContain('Mages Guild');
  });

  it('should display a message when no guilds are available', () => {
    component.guilds = []; // Set the guilds array to empty
    fixture.detectChanges(); // Trigger change detection

    const emptyMessage = fixture.nativeElement.querySelector('.empty-message');
    expect(emptyMessage).toBeTruthy(); // Ensure the empty message element exists
    expect(emptyMessage.textContent).toContain('No guilds available'); // Verify message content
  });
});
