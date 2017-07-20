import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApplicationService } from './services/application.service';
import { ProfileService } from './services/profile.service';
import {Idle, DEFAULT_INTERRUPTSOURCES} from '@ng-idle/core';
import {Keepalive} from '@ng-idle/keepalive';
import { MomentModule } from 'angular2-moment';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date = null;


  constructor(
    private applicationService: ApplicationService,
    private router: Router,
    private profileService: ProfileService,
    private idle: Idle, private keepalive: Keepalive
  ) { 
    idle.setIdle(5);
    // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
    idle.setTimeout(5);
    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    idle.onIdleEnd.subscribe(() => this.idleState = 'No longer idle.');
    idle.onTimeout.subscribe(() => {
      this.idleState = 'Timed out!';
      this.timedOut = true;
    });
    idle.onIdleStart.subscribe(() => this.idleState = 'You\'ve gone idle!');
    idle.onTimeoutWarning.subscribe((countdown) => this.idleState = 'You will time out in ' + countdown + ' seconds!');

    // sets the ping interval to 15 seconds
    keepalive.interval(15);

    keepalive.onPing.subscribe(() => this.lastPing = new Date());

    this.reset();
    
  }

  reset() {
    this.idle.watch();
    this.idleState = 'Started.';
    this.timedOut = false;
  
  }

  title = 'app works!';

  ngOnInit() {

    var userPrifile = localStorage.getItem('currentUser');
    
    if (userPrifile) {
        this.profileService.setProfileCollection(userPrifile);
        this.applicationService.setIsLoggedin(true);
        this.router.navigate(['./employee']);
    } else {
       this.applicationService.setIsLoggedin(false);
       this.router.navigate(['./login']);
    }
   
  }
  
  
}
