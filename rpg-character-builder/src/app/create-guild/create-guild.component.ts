import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GuildListComponent } from '../guild-list/guild-list.component';

export interface Guild {
  guildName: string;
  description: string;
  type: string;
  acceptTerms: boolean;
  notificationPreference: string;
}

@Component({
  selector: 'app-create-guild',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule, GuildListComponent],
  templateUrl: './create-guild.component.html',
  styleUrl: './create-guild.component.css'
})

export class CreateGuildComponent {
  guildForm: FormGroup;
  types = ['Competitive', 'Casual', 'Social', 'Educational'];
  notificationPreferences = ['Email', 'SMS', 'In-App'];
  guilds: Guild[] = [];

  @Output() guildCreated = new EventEmitter<Guild>();

  constructor(private fb: FormBuilder) {
    this.guildForm = this.fb.group({
      guildName: ['', Validators.required],
      description: ['', Validators.required],
      type: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue],
      notificationPreference: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.guildForm.valid) {
      const newGuild = this.guildForm.value as Guild;
      this.guilds.push(newGuild);

      this.guildCreated.emit(newGuild);

      this.guildForm.reset();
    } else {
      console.warn('Form is invalid. No guild will be added.')
    }
  }
}