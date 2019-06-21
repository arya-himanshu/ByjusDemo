import { Component, OnInit, ViewChild } from '@angular/core';
import * as faker from 'faker'
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { cleanSession } from 'selenium-webdriver/safari';
import { iterateListLike } from '@angular/core/src/change_detection/change_detection_util';
import { sp } from '@angular/core/src/render3';

class user {
  id: number;
  name: string;
  image: string;
  isSeleted: boolean
}
class TempObj {
  id: number;
  allSelected: boolean;
  userList: Array<user>
}

@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.css']
})
export class MultiSelectComponent implements OnInit {
  items: Array<user> = new Array
  keyword: string;
  mapResult: Array<user> = new Array;
  selectedResult = new Map<number, user>();
  opened: boolean = false;
  tag: string;
  tags = new Map<string, string>();
  manipilateArray: Array<TempObj> = new Array;
  seletedUserCount: number = 0
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getHeroes().subscribe(hero => this.splitData(hero));

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
  getHeroes(): Observable<user[]> {
    return this.http.get<user[]>('src/app/MultipleSearchSelect/multi-select/user.json')
      .pipe(
        tap(_ => console.log()),
      );
  }


  splitData(users: Array<user>) {
    this.items = users;
    let len = this.items.length
    let counter = 0;
    let splitIn: number = 10
    let obj = new TempObj();
    obj.userList = new Array<user>();

    this.splitCalculation(len)

    for (let user of users) {
      ++counter;
      if (counter < splitIn) {
        obj.userList.push(user)
      } else {
        console.log("else")
        obj.userList.push(user)
        this.manipilateArray.push(obj);
        obj = new TempObj();
        obj.userList = new Array<user>()
        counter = 0
      }
    }
    console.log(this.manipilateArray)
  }

  selectUserDynamic(list: user) {
    if (list.isSeleted) {
      list.isSeleted = false;
      if (this.seletedUserCount > 0) {
        this.seletedUserCount--
      }
    } else {
      list.isSeleted = true;
      if (this.seletedUserCount >= 0) {
        this.seletedUserCount++
      }
    }
  }

  splitCalculation(len) {

  }
  selectAllUserInRow($event: TempObj) {
    console.log($event)
    if (!$event.allSelected) {
      for (let t of $event.userList) {
        t.isSeleted = true
        if (this.seletedUserCount >= 0) {
          this.seletedUserCount++
        }
      }
    } else {
      for (let t of $event.userList) {
        t.isSeleted = false
        if (this.seletedUserCount > 0) {
          this.seletedUserCount--
        }
      }
    }
  }
}
