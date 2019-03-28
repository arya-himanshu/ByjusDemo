import { Component, OnInit, ViewChild } from '@angular/core';
import * as faker from 'faker'
import { TagContentType, IfStmt } from '@angular/compiler';
import { forEach } from '@angular/router/src/utils/collection';

class user {
  id: number;
  name: string;
  image: string;
}
@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.css']
})
export class MultiSelectComponent implements OnInit {
  items = [{ "id": 28361, "image": "https://s3.amazonaws.com/uifaces/faces/twitter/_ragzor/128.jpg", "name": "Otto Pfeffer Price" }, { "id": 54648, "image": "https://s3.amazonaws.com/uifaces/faces/twitter/coderdiaz/128.jpg", "name": "Amos Abbott Roob" }, { "id": 19584, "image": "https://s3.amazonaws.com/uifaces/faces/twitter/bu7921/128.jpg", "name": "Nola Kulas Feeney" }, { "id": 67510, "image": "https://s3.amazonaws.com/uifaces/faces/twitter/ehsandiary/128.jpg", "name": "Tia Hermann Gulgowski" }, { "id": 79847, "image": "https://s3.amazonaws.com/uifaces/faces/twitter/VMilescu/128.jpg", "name": "Thomas Hilll Volkman" }, { "id": 96626, "image": "https://s3.amazonaws.com/uifaces/faces/twitter/jennyyo/128.jpg", "name": "Maverick Murphy Blick" }, { "id": 48496, "image": "https://s3.amazonaws.com/uifaces/faces/twitter/nelsonjoyce/128.jpg", "name": "Myrtie Tromp Kuphal" }, { "id": 68290, "image": "https://s3.amazonaws.com/uifaces/faces/twitter/joshaustin/128.jpg", "name": "Elbert O'Reilly Ritchie" }, { "id": 49606, "image": "https://s3.amazonaws.com/uifaces/faces/twitter/nfedoroff/128.jpg", "name": "Bradley Bergnaum Torphy" }, { "id": 77166, "image": "https://s3.amazonaws.com/uifaces/faces/twitter/ismail_biltagi/128.jpg", "name": "Lourdes Roob McGlynn" }, { "id": 28715, "image": "https://s3.amazonaws.com/uifaces/faces/twitter/magugzbrand2d/128.jpg", "name": "Federico Muller Rath" }, { "id": 68226, "image": "https://s3.amazonaws.com/uifaces/faces/twitter/scottkclark/128.jpg", "name": "Miguel Eichmann Weber" }, { "id": 93119, "image": "https://s3.amazonaws.com/uifaces/faces/twitter/alek_djuric/128.jpg", "name": "Brendan Hodkiewicz MacGyver" }, { "id": 26733, "image": "https://s3.amazonaws.com/uifaces/faces/twitter/thomasschrijer/128.jpg", "name": "Leola Wilderman Oberbrunner" }, { "id": 85200, "image": "https://s3.amazonaws.com/uifaces/faces/twitter/olaolusoga/128.jpg", "name": "Imogene Fay Grant" }, { "id": 3117, "image": "https://s3.amazonaws.com/uifaces/faces/twitter/mrxloka/128.jpg", "name": "Ross Stroman McGlynn" }, { "id": 82506, "image": "https://s3.amazonaws.com/uifaces/faces/twitter/zauerkraut/128.jpg", "name": "Jude Keebler Haag" }, { "id": 61974, "image": "https://s3.amazonaws.com/uifaces/faces/twitter/thomasschrijer/128.jpg", "name": "Ms. Odie Bogan Schimmel" }, { "id": 71351, "image": "https://s3.amazonaws.com/uifaces/faces/twitter/Shriiiiimp/128.jpg", "name": "Fay Hegmann Langworth" }, { "id": 96265, "image": "https://s3.amazonaws.com/uifaces/faces/twitter/jffgrdnr/128.jpg", "name": "Barrett Berge Bayer" }]
  keyword: string;
  mapResult: Array<user> = new Array;
  selectedResult = new Map<number, user>();
  opened: boolean = false;
  tag: string;
  tags = new Map<string, string>();
  constructor() { }

  ngOnInit() {
  }
  searchUser() {
    this.mapResult = new Array;
    if (this.keyword != undefined && this.keyword.length >= 1) {
      for (let it of this.items) {
        if (it.name.match(this.keyword)) {
          this.mapResult.push(it);

        }
      }
    }


  }
  selectUser($event: user) {
    this.selectedResult.set($event.id, $event);
    this.mapResult = this.mapResult.filter(
      user => user.id != $event.id);
  }

  addTag() {

    let comma;
    let prev = 0;
    //himanshu,arya,bhs,bho, 8 13 17 21
    for (let i = 0; i < this.tag.length; i++) {
      if (this.tag[i] == ',') {
        comma = i;
        if (this.tag.substring(comma, prev).length > 0) {
          this.tags.set(this.tag.substring(comma, prev), this.tag.substring(prev, comma));
        }
        prev = comma + 1;

      }
      else {
        if (this.tag.length - 1 == i) {
          console.log(this.tag.substring(this.tag.length, prev))
          this.tags.set(this.tag.substring(this.tag.length, prev), this.tag.substring(prev, this.tag.length));
        }
      }
    }
    this.tag = ""
  }
}
