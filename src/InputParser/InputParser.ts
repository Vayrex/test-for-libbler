import {Event} from "../Events";
import {Filter} from "../Filters";

export class InputParser {

  private static formatValidationRegex = /^(.*)\s#(\S*)\s@(\S*)$/;
  private _value: Event | Filter;

  /**
   * Setter for input.
   * Will try to parse input,
   * @param input
   */
  public setInput(input: string) {
    this._value = this.parse(input);
  }

  /**
   * Detect if input is a filter or an event.
   * In case of invalid input throws an error
   * @param input
   */
  private parse(input: string) {
    input = input.trim().replace(/\s\s+/g, ' ');
    let match = input.match(InputParser.formatValidationRegex);

    if (match) {
      return new Event(match[1], match[2], match[3], new Date());
    }

    try {
      return Filter.create(input);
    } catch (e) {
      throw new Error("Invalid input");
    }

  }

  public getValue(){
    return this._value;
  }
}