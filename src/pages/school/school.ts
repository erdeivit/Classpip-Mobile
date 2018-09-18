import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { TranslateService } from 'ng2-translate/ng2-translate';

import { IonicService } from '../../providers/ionic.service';
import { School } from '../../model/school';

declare var google;

@Component({
  selector: 'page-school',
  templateUrl: './school.html'
})
export class SchoolPage {

  @ViewChild('map') mapElement: ElementRef;
  private school: School;
  /* tslint:disable */
  private map: any;
  /* tslint:enable */


  constructor(
    public navParams: NavParams,
    public translateService: TranslateService,
    public ionicService: IonicService) {

    this.school = this.navParams.data.school;
  }

  public ngAfterViewInit(): void {

    this.map = new google.maps.Map(
      this.mapElement.nativeElement, {
        center: new google.maps.LatLng(this.school.latitude, this.school.longitude),
        zoom: 18,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true
      });

    // create the marker
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });

    // create the infowinfow
    let content = '<b>' + this.school.name + '</b><br>' + this.school.address +
      ' ' + this.school.zipCode + '<br>' + this.school.city + ' ' +
      this.school.country;
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });
    infoWindow.open(this.map, marker);

    this.ionicService.removeLoading();
  }

}
