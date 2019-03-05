import {isValidDate} from "../helpers/isValidDate";

export class Filter {

  constructor(
    private _type: string,
    private _value: any
  ){

  }

  public static create(input: string){

    input = input.trim();

    let type: string,
      value: any;

    if(input.startsWith('@')){
      type = 'category';
      value = input.slice(1);

    }  else if(input.startsWith('#')){
      type = 'to';
      value = input.slice(1);
    } else if(input.startsWith('latest')){
      type = 'latest';
      value = input.replace('latest',' ');
      value = parseInt(value);
      if(isNaN(value)){
        throw new Error("Not valid string to create Filter");
      }
    } else {
      let parts = input.split(' ');

      if(parts.length != 2){
        throw new Error("Not valid string to create Filter");
      }

      type = "date";

      let from = new Date(parts[0]),
        to = new Date(parts[1]);

      if(!isValidDate(from) || !isValidDate(to)){
        throw new Error("Not valid string to create Filter");
      }

      value = [from, to];
    }

    return new Filter(type, value);

  }

  /**
   * Getter for type
   */
  public getType(){
    return this._type;
  }

  /**
   * Getter for value
   */
  public getValue(){
    return this._value;
  }

}