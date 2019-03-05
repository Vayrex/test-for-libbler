export class Event {

  constructor(
    private _message: string,
    private _category: string,
    private _to: string,
    private _date: Date

  ){

  }


  /**
   * Getter for message
   */
  public getMessage(){
    return this._message;
  }

  /**
   * Getter for category
   */
  public getCategory(){
    return this._category;
  }

  /**
   * Getter for to
   */
  public getTo(){
    return this._to;
  }

  /**
   * Getter for date
   */
  public getDate(){
    return this._date;
  }
}