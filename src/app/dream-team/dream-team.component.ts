import { HasuraService } from './../services/hasura.service';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AwsS3ServiceService } from '../services/aws-s3-service.service';
import { TeamsServiceService } from '../services/teams-service.service';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-dream-team',
  templateUrl: './dream-team.component.html',
  styleUrls: [
    './dream-team.component.scss',
    '../dream-team/styles/dream-team.responsive.scss',
    '../dream-team/styles/dream-team.scss',
  ],
})
export class DreamTeamComponent implements OnInit {
  isLinear = false;
  keeper: any;

  team = {
    keeper: '',
    defenders: { lb: '', cb1: '', cb2: '', rb: '' },
    midfielder: { lm: '', Dm1: '', Dm2: '', rm: '' },
    forwards: { st1: '', st2: '' },
  };
  players: any = { keeper: [], defenders: [], midfielder: [], forwards: [] };

  constructor(
    private _formBuilder: FormBuilder,
    private s3Service: AwsS3ServiceService,
    private teamsService: TeamsServiceService,
    private hasuraService:HasuraService,
    private authService:AuthServiceService
  ) {}

  ngOnInit(): void {
    this.getTeams();
  }

  getTeams() {
    this.teamsService.getPlayers().subscribe((snap: any) => {
      this.players = {
        keeper: [],
        defenders: [],
        midfielder: [],
        forwards: [],
      };
      snap.data.forEach((a: any) => {
        switch (a.position) {
          case 'G':
            this.players.keeper.push(a);
            break;
          case 'D':
            this.players.defenders.push(a);
            break;

          case 'M':
            this.players.midfielder.push(a);
            break;

          case 'F':
            this.players.forwards.push(a);
            break;
          default:
          // code block
        }
      });

      console.log(this.players);
    });
  }

  postImage(fileInput: any) {
    console.log(fileInput.target.files[0]);
    this.s3Service.fileEvent(fileInput);
  }

  async createDreamTeam() {
    console.log('Team', this.team);
    var userId = await this.authService.currentUser();
    this.hasuraService.addDreamTeam(this.team,userId).subscribe(snap=>{
      console.log(snap.data);
    }),((err:any)=>{
      console.log(err.message);
    })
  }

}
