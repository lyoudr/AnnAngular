import { Component, OnInit } from '@angular/core';
import { LogupdateService } from './services/logupdate-service/logupdate.service';
import { CheckForUpdateService } from './services/checkforupdate-service/check-for-update.service';
import { PromptupdateServiceService } from './services/promptupdate-service/promptupdate-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private logupdateService : LogupdateService,
    private checkupdateService : CheckForUpdateService,
    private promptupdateService : PromptupdateServiceService
  ){}

  title = 'Ann123';

  ngOnInit(){
    // Check available version each min
    this.checkupdateService.checkForupdate();
    this.logupdateService.Available();
    this.logupdateService.Activated();
    // Force update
    this.promptupdateService.forceUpdate();
  }
}
