import * as readline from "readline";
import {InputParser} from "./InputParser/InputParser"
import {EventManager} from "./Events";
import {Filter} from "./Filters";

let reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let inputParser = new InputParser();
let eventManager = new EventManager();

/**
 * Listen for command line input
 */
function waitForCommand(){

  let query = "To add event provide line in next format: \n" +
    "message #category @to. \n" +
    "To filter events please type: \n" +
    "- @category. Filter by category name \n" +
    "- #to. Filter by recipient name \n" +
    "- latest10. Get latest 10 events. 10 can be changed to any number \n" +
    "- date date. Filter by date range. Provide to date srings separated by space \n" +
    "----------------------------------------------------------------------- \n";

  reader.question(query, (value) => {

    let input: Event | any;

    try{
      inputParser.setInput(value);
      input = inputParser.getValue();
    } catch (e) {
      console.log(e.message);
      console.log('------------------------------------');
      return waitForCommand();
    }

    if(input instanceof Filter){
      let events = eventManager.getBy(input);
      console.log(events);
      console.log('------------------------------------');
    } else {
      eventManager.add(input);
      console.log("Successfully added new event");
      console.log('------------------------------------');
    }

    return waitForCommand();
  });
}

waitForCommand();