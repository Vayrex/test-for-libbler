import {Event} from "../Event";
import {Filter} from "../../Filters";

export class EventManager {

  constructor(
    private _events: Event[] = []
  ){

  }

  public add(event: Event){
    this._events.push(event);
    return this;
  }

  public getAll(){
    return this._events;
  }

  public getBy(filter: Filter){
    let type = filter.getType(),
      value = filter.getValue();

    switch (type) {
      case "category":
        return this.getByCategory(value);

      case "to":
        return this.getByTo(value);

      case "date":
        return this.getByDate(value);

      case "latest":
        return this.getLatest(value);
    }
  }

  /**
   * Get last N events in DESC order.
   */
  public getLatest(value: number){

    let end = this._events.length,
    start = end - value;

    if(start < 0){
      start = 0;
    }

    return this._events.slice(start, end).reverse();
  }

  /**
   * Get events filtered by date range
   * @param range
   */
  public getByDate(range: [Date, Date]){

    let from: number, to: number;

    if(range[0].getTime() <= range[1].getTime()){
      from = range[0].getTime();
      to = range[1].getTime();
    } else {
      from = range[1].getTime();
      to = range[0].getTime();
    }

    return this._events.filter((event) => {
      let time = event.getDate().getTime();
      return from <= time && to >= time;
    });
  }

  /**
   * Get events filtered by recipient
   * @param value
   */
  public getByTo(value: string){
    return this._events.filter((event) => {
      return event.getTo() == value;
    });
  }

  /**
   * Get events filtered by category
   * @param value
   */
  public getByCategory(value: string){
    return this._events.filter((event) => {
      return event.getCategory() == value;
    });
  }
}
