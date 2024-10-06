import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateGuildComponent } from './create-guild.component';
import { GuildListComponent } from '../guild-list/guild-list.component';

describe('CreateGuildComponent', () => {
  let component: CreateGuildComponent;
  let fixture: ComponentFixture<CreateGuildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, CreateGuildComponent, GuildListComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateGuildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();  // Trigger initial data binding
  });

  it('should have invalid form controls when empty', () => {
    const form = component.guildForm;
    expect(form.valid).toBeFalsy();  // The form should be invalid initially

    const guildNameControl = form.controls['guildName'];
    expect(guildNameControl.valid).toBeFalsy();  // Guild name should be invalid initially
    expect(guildNameControl.errors?.['required']).toBeTruthy();  // Guild name should have a required error

    const descriptionControl = form.controls['description'];
    expect(descriptionControl.valid).toBeFalsy();  // Description should be invalid initially
    expect(descriptionControl.errors?.['required']).toBeTruthy();  // Description should have a required error
  });

  it('should add a guild to the guilds array when the form is valid and submitted', () => {
    const form = component.guildForm;
  
    // Fill in the form with valid data
    form.controls['guildName'].setValue('Warriors Guild');
    form.controls['description'].setValue('A guild for brave warriors.');
    form.controls['type'].setValue('Competitive');
    form.controls['acceptTerms'].setValue(true);
    form.controls['notificationPreference'].setValue('Email');
  
    expect(form.valid).toBeTruthy();  // The form should be valid now
  
    // Trigger the submit function
    component.onSubmit();
  
    expect(component.guilds.length).toBe(1);  // The guilds array should now have one guild
    expect(component.guilds[0].guildName).toBe('Warriors Guild');  // Check if the correct guild is added
  });

  it('should not add a guild if the form is invalid', () => {
    const form = component.guildForm;
  
    // Leave some fields empty to ensure the form is invalid
    form.controls['guildName'].setValue('');
    form.controls['description'].setValue('');
    form.controls['type'].setValue('');
    form.controls['acceptTerms'].setValue(false);  // Terms not accepted
    form.controls['notificationPreference'].setValue('');
  
    expect(form.invalid).toBeTruthy();  // The form should be invalid
  
    // Try submitting the form
    component.onSubmit();
  
    expect(component.guilds.length).toBe(0);  // The guilds array should not be updated
  });
});