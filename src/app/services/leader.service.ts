import { Injectable } from '@angular/core';
import { Leader  } from '../shared/leader';
import { LEADERS } from '../shared/leaders';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }

  getLeaders() : Promise<Leader[]>{ // getDishes returns array of Dishes
    return Promise.resolve(LEADERS);
  }

  getLeader(id: string): Promise<Leader>{ //function with argument id and return type dish
     return Promise.resolve(LEADERS.filter((leader) => (leader.id === id))[0]); //filter return array we select 0 element
  }

  getFeaturedLeader(): Promise<Leader> {
    return Promise.resolve(LEADERS.filter((leader) => leader.featured)[0]); // return dish for which featured is true

  }
}
