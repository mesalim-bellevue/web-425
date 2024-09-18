import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

interface Guild {
  guildName: string;
  description: string;
  type: string;
  acceptTerms: boolean;
  notificationPreference: string;
}

@Component({
  selector: 'app-create-guild',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './create-guild.component.html',
  styleUrl: './create-guild.component.css'
})

export class CreateGuildComponent {
  guildForm: FormGroup;
  types = ['Competitive', 'Casual', 'Social', 'Educational'];
  notificationPreferences = ['Email', 'SMS', 'In-App'];
  guilds: Guild [] = [];

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
      this.guilds.push(this.guildForm.value);
      console.log(this.guildForm.value);
      this.guildForm.reset();
    }
  }
}