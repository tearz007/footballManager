import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRippleModule } from '@angular/material/core';
import {MatStepperModule} from '@angular/material/stepper';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { ConfirmCodeComponent } from './confirm-code/confirm-code.component';

import {HttpClientModule, HttpHeaders} from '@angular/common/http';
import {ApolloModule, APOLLO_OPTIONS} from 'apollo-angular';
import {HttpLink} from 'apollo-angular/http';
import {InMemoryCache} from '@apollo/client/core';
import { DreamTeamComponent } from './dream-team/dream-team.component';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  declarations: [AppComponent, AuthComponent, HomeComponent,ConfirmCodeComponent,DreamTeamComponent, ProfileComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatTabsModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    MatRippleModule,
    MatStepperModule,
    MatCardModule,
    MatSelectModule,
    MatProgressSpinnerModule,

    // appolo
    ApolloModule,
     HttpClientModule
  ],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => {
        return {

          link: httpLink.create({
            uri: 'https://sweet-possum-92.hasura.app/v1/graphql',
          //  uri:'https://48p1r2roz4.sse.codesandbox.io',
            headers: new HttpHeaders({
              Authorization: `Bearer ${'3gE6A0194nHe2iX9We2bJ9SEpdyyzk7kWVlRyDdjcrjDmdsoVHvlCJNLobRTrEnB'}`,
              'x-hasura-admin-secret': '3gE6A0194nHe2iX9We2bJ9SEpdyyzk7kWVlRyDdjcrjDmdsoVHvlCJNLobRTrEnB'
           })
          }),
          cache: new InMemoryCache(),
        };
      },
      deps: [HttpLink],

    },

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
