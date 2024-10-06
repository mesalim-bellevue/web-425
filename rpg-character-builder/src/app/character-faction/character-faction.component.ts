import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface Faction {
  name: string;
  description: string;
}

@Component({
  selector: 'app-character-faction',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './character-faction.component.html',
  styleUrls: ['./character-faction.component.css']
})

export class CharacterFactionComponent implements OnInit {
  factions: Faction[] = [];
  errorMessage: string = '';
  factionForm: FormGroup;

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.factionForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit(): void {
    this.getFactions();
  }

  onSubmit(): void {
    if (this.factionForm.valid) {
      const newFaction = this.factionForm.value;
      this.factions.push(newFaction);

      this.factionForm.reset();

      
      this.http.post<Faction>('http://localhost:3000/api/character-factions', newFaction)
        .subscribe({
          next: (response) => {
            this.factions.push(response);
            this.factionForm.reset();
          },
          error: (err) => {
            this.errorMessage = 'Failed to create a new faction. Please try again.';
            console.error('Server error: ', err);
          }
        });
    }
  }

  getFactions(): void {
    this.http.get<Faction[]>('http://localhost:3000/api/character-factions')
    .subscribe({
      next: (data) => this.factions = data,
      error: (err) => {
        console.error('Error loading factions:', err);
        this.errorMessage = 'Failed to load factions. Please try again later.'
      }
    });
  }
}
