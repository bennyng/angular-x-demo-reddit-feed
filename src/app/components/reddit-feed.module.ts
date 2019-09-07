import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RedditFeedComponent } from './reddit-feed.component';

@NgModule({
  declarations: [RedditFeedComponent],
  imports: [CommonModule, HttpClientModule],
  exports: [RedditFeedComponent]
})
export class RedditFeedModule { }
