import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map as rxMap, takeUntil } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ImageReddit } from './reddit-feed.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-reddit-feed',
  templateUrl: './reddit-feed.component.html',
  styleUrls: ['./reddit-feed.component.scss']
})
export class RedditFeedComponent implements OnInit, OnDestroy {

  public reddits$: Observable<Array<ImageReddit>>;
  public redditDataUrl = environment.redditDataUrl;
  public destroy$ = new Subject<boolean>();

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit() {
    this._initFeed();
    this._logFeed();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }

  private _initFeed() {
    this.reddits$ = this.httpClient
      .get(this.redditDataUrl)
      .pipe(
        rxMap(response => response as any),
        rxMap(json => json.data.children as Array<any>),
        rxMap(children => children.filter(d => (
          ['png', 'jpg'].indexOf(d.data.url.split('.').pop()) !== -1
        ))),
        rxMap(children => children.map(d => new ImageReddit(d.data.id, d.data.title, d.data.url)))
      );
  }

  private _logFeed() {
    this.reddits$
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(data => console.debug('data', data));
  }
}
