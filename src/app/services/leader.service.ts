import { Injectable } from '@angular/core';
import { Leader  } from '../shared/leader';
import { LEADERS } from '../shared/leaders';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }

  getLeaders() : Leader[]{ // getDishes returns array of Dishes
    return LEADERS;
  }

  getLeader(id: string): Leader{ //function with argument id and return type dish
     return LEADERS.filter((leader) => (leader.id === id))[0]; //filter return array we select 0 element
  }

  getFeaturedLeader(): Leader {
    return LEADERS.filter((leader) => leader.featured)[0]; // return dish for which featured is true

  }
}
