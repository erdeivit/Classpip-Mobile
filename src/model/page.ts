import { Component } from '@angular/core';

export class Page {

  public title: string;
  public component: Component;

  constructor(component: Component, title?: string) {
    this.component = component;
    this.title = title;
  }

}
