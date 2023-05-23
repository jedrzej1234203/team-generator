import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  newMemberName: string = '';
  members: string[] = [];
  errorMessage: string = '';
  errorClass: string = '';
  numberOfTeams: number | string = '';
  teams: string[][] = [[]];
  teamsErrorClass: string = '';

  addMember() {
    if (!this.newMemberName) {
      this.errorClass = 'errorClass';
      this.errorMessage = "Name can't be empty!";
      setTimeout(() => {
        this.errorClass = '';
        this.errorMessage = '';
      }, 2000);
      return;
    }
    this.members.push(this.newMemberName);
    this.newMemberName = '';
    this.errorClass = '';
  }

  onInput(member: string) {
    this.newMemberName = member;
  }

  onNumberOfTeamsInput(value: string) {
    this.numberOfTeams = Number(value);
  }

  clearError() {
    setTimeout(() => {
      this.numberOfTeams = '';
      this.errorMessage = '';
      this.teamsErrorClass = '';
    }, 2000);
  }

  generateTeams() {
    this.numberOfTeams = Number(this.numberOfTeams);
    if (!this.numberOfTeams || this.numberOfTeams <= 0) {
      this.errorMessage = 'Invalid number of teams';
      this.teamsErrorClass = 'errorClass';
      this.clearError();
      return;
    }

    if (this.numberOfTeams > this.members.length) {
      this.errorMessage = 'Not enought members';
      this.teamsErrorClass = 'errorClass';
      this.clearError();
      return;
    }

    if (this.numberOfTeams <= 0) {
      this.errorMessage = 'Invalid number of teams';
      this.teamsErrorClass = 'errorClass';
      this.clearError();
      return;
    }

    const allMembers = [...this.members];
    while (allMembers.length) {
      for (let i = 0; i < this.numberOfTeams; i++) {
        const randomIndex = Math.floor(Math.random() * allMembers.length);
        const member = allMembers.splice(randomIndex, 1)[0];
        if (!member) break;
        if (this.teams[i]) {
          this.teams[i].push(member);
        } else {
          this.teams[i] = [member];
        }
      }
    }
    this.members = [];
    this.numberOfTeams = '';
  }
}
