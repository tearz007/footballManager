import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

const GET_Fixtures = gql`
  query MyQuery {
    football_fixture {
      homeTeamID
      fixtureID
      date
      awayTeamID
    }
    football_team {
      name
      stadium
      teamID
    }
  }
`;

const insertDreamTeam = gql`
  mutation MyMutation( $userID: String! , $logo:String! , $name: String!,$players: jsonb!) {
    insert_football_dreamTeam(
      objects: { userID:$userID , logo: $logo, name:$name , players:$players }
    ) {
      returning {
        players
      }
    }
  }
`;

const GET_Users = gql`
  query MyQuery {
    football_user {
      userID
      email
      name
      soccerTeam
      surname
    }
  }
`;

const insertTicket = gql`
  mutation MyMutation($price: Int!, $fixtureId: String!, $email: String!) {
    insert_football_ticket(
      objects: { price: $price, email: $email, fixtureID: $fixtureId }
    ) {
      returning {
        ticketID
      }
    }
  }
`;

const updateUser = gql`
  mutation MyMutation(
    $name: String!
    $surname: String!
    $email: String!
    $soccerTeam: String!
  ) {
    update_football_user(
      where: { email: { _eq: $email } }
      _set: { name: $name, surname: $surname, soccerTeam: $soccerTeam }
    ) {
      returning {
        email
      }
    }
  }
`;

const addUser = gql`
  mutation MyMutation(
    $name: String!
    $surname: String!
    $email: String!
    $soccerTeam: String!
  ) {
    insert_football_user(
      objects: {
        name: $name
        surname: $surname
        email: $email
        soccerTeam: $soccerTeam
      }
    ) {
      returning {
        name
        surname
        email
        soccerTeam
      }
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class HasuraService {
  constructor(private apollo: Apollo) {}
  // private querySubscription: Subscription;

  registerUser(user: any) {
    return this.apollo.mutate({
      mutation: addUser,
      variables: {
        name: user.name,
        surname: user.surname,
        email: user.email,
        soccerTeam: user.soccerTeam,
      },
    });
  }

  updateUser(user: any) {
    console.log(user);
    return this.apollo.mutate({
      mutation: updateUser,
      variables: {
        name: user.value.name,
        surname: user.value.surname,
        email: user.value.email,
        soccerTeam: user.value.soccerTeam,
      },
    });
  }

  getFixtures() {
    return this.apollo.watchQuery<any>({
      query: GET_Fixtures,
    });
  }

  buyTicket(id: any, email: any) {
    return this.apollo.mutate({
      mutation: insertTicket,
      variables: {
        fixtureId: id,
        price: 500,
        email: email,
      },
    });
  }

  addDreamTeam(players: any, userID: String) {
    return this.apollo.mutate({
      mutation: insertDreamTeam,
      variables: {
        logo: '',
        name: 'DreamTeam',
        players: players,
        userID: userID,
      },
    });
  }

  getUser() {
    return this.apollo.watchQuery<any>({
      query: GET_Users,
    });
  }
}
