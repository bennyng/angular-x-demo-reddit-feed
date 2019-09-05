import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map as rxMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ImageReddit } from './reddit-feed.model';

@Component({
  selector: 'app-reddit-feed',
  templateUrl: './reddit-feed.component.html',
  styleUrls: ['./reddit-feed.component.scss']
})
export class RedditFeedComponent implements OnInit {

  public reddits$: Observable<Array<ImageReddit>>;
  public redditDataUrl = 'http://www.reddit.com/r/9gag.json';

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit() {
    this._initFeed();
    this._logFeed();
  }

  private _initFeed() {
    this.reddits$ = this.httpClient
      .get(this.redditDataUrl)
      .pipe(
        rxMap(response => response as any),
        rxMap(json => json.data.children as Array<any>),
        rxMap(children => children.filter(d => (
          ['png', 'jpg'].indexOf(d.data.url.split('.').pop()) != -1
        ))),
        rxMap(children => children.map(d => new ImageReddit(d.data.id, d.data.title, d.data.url)))
      );
  }

  private _logFeed() {
    this.reddits$.subscribe(data => console.debug('data', data));
  }
}
