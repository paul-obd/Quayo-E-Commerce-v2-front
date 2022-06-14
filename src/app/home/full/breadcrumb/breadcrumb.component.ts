import {
  Component,
  Input,
  OnInit
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: []
})
export class AppBreadcrumbComponent implements OnInit {
  @Input() layout;
  pageInfo;
  isVisible: boolean;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title
  ) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .pipe(map(() => this.activatedRoute))
      .pipe(
        map(route => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          // This part to hide app-breadcrumb if the Breadcrumb in routing data is false (like report)
          route.data.subscribe(data => {
            this.isVisible = true;
            if (data.Breadcrumb != null) {
              if (data.Breadcrumb == false) {
                this.isVisible = false;
              }
            }
          } );

          return route;
        })
      )
      .pipe(filter(route => route.outlet === 'primary'))
      .pipe(mergeMap(route => route.data))
      .subscribe(event => {
        this.titleService.setTitle(event['title']);
        this.pageInfo = event;
      });
  }
  ngOnInit() { }
}
