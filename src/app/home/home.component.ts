import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';
import { HasuraService } from '../services/hasura.service';
import { TeamsServiceService } from '../services/teams-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  rates: any;
  loading: any;
  error: any;
  fixtures: any = [{}];

  constructor(
    private teamsService: TeamsServiceService,
    private hasuraService: HasuraService,
    private authService: AuthServiceService
  ) {}

  ngOnInit(): void {
    this.getFixtures();
    this.authService.currentUser();
  }



  getFixtures() {
    this.hasuraService.getFixtures().valueChanges.subscribe(({ data }) => {
      this.fixtures = [];
      data.football_fixture.forEach((a: any) => {
        const awayTeam = data.football_team.find(
          (b: any) => a.awayTeamID === b.teamID
        );
        const homeTeam = data.football_team.find(
          (b: any) => a.homeTeamID === b.teamID
        );
        const temp = {
          awayTeam: awayTeam.name,
          homeTeam: homeTeam.name,
          stadium: homeTeam.stadium,
          data: a.date,
          fixtureId: a.fixtureID,
        };
        this.fixtures.push(temp);
      });
      console.log(this.fixtures);
    });
  }

  async bookTicket(id: any) {
    var userId = await this.authService.currentUser();
    console.log(userId);
    this.hasuraService.buyTicket(id, userId).subscribe((snap) => {
      console.log(snap.data);
    });
  }

}
