import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RedditFeedModule } from './components/reddit-feed.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RedditFeedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
