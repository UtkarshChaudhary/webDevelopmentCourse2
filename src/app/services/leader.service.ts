import { Injectable } from '@angular/core';
import { Leader  } from '../shared/leader';
import { LEADERS } from '../shared/leaders';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }

  getLeaders() : Promise<Leader[]>{ // getDishes returns array of Dishes
    return new Promise( resolve => {
      setTimeout(() => resolve(LEADERS), 2000);
      });
  }

  getLeader(id: string): Promise<Leader>{ //function with argument id and return type dish
    return new Promise( resolve => {
      setTimeout(() => resolve(LEADERS.filter((leader) => (leader.id === id))[0]), 2000);
      }); 
  }

  getFeaturedLeader(): Promise<Leader> {
    return new Promise( resolve => {
      setTimeout(() => resolve(LEADERS.filter((leader) => leader.featured)[0]), 2000);
    });

  }
}
