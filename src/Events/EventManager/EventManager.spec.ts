import * as expect from 'expect';
import {describe, it, suite, beforeEach} from 'mocha';
import {EventManager} from './EventManager';
import {Event} from "../Event";
import {Filter} from "../../Filters";

suite('EventManager', () => {

  let manager: EventManager;
  let filter: Filter;

  beforeEach(()=>{
    manager = new EventManager();
    for (let i = 1; i <= 5; i++){
      let event = new Event(`Awesome event ${i}`, 'category', `user{1}`, new Date(2009+i, 0 ,1));
      manager.add(event);
    }
  });

  suite('latest(N)', () => {

    it('should return events in DESC order', () => {
      let latest = manager.getLatest(3);
      expect(manager.getAll().indexOf(latest[0])).toEqual(4);
      expect(manager.getAll().indexOf(latest[1])).toEqual(3);
      expect(manager.getAll().indexOf(latest[2])).toEqual(2);
    });

    describe('When N is less then or equal to total events count', () => {
      it('should return N events', () => {
        let N = 3;
        expect(manager.getLatest(N).length).toEqual(N);
        N = 4;
        expect(manager.getLatest(N).length).toEqual(N);
        N = 5;
        expect(manager.getLatest(N).length).toEqual(N);
      });
    });

    describe("When N is greater then total number of events", () => {
      it('should return all events', () =>{
        expect(manager.getLatest(5).length).toEqual(manager.getAll().length);
      });
    });
  });

  suite("getBy()", () =>{

    describe("When filter type is date", () => {

      beforeEach(() => {
        filter = new Filter('date', [new Date(2011, 0, 1), new Date(2013, 0, 1)]);
      });

      it("should return events between 2 dates", () => {
        let events = manager.getByDate(filter.getValue());
        expect(events.length).toEqual(3); //11,12,13
        events.forEach((event) => {
          expect(event.getDate().getFullYear()).toBeGreaterThan(2010);
          expect(event.getDate().getFullYear()).toBeLessThan(2014);
        });
      });
    });
  });

});