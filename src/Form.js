import React, { useState, useEffect } from 'react';

export default function Form() {
  // states
  let currentDate = new Date();
  const [dateOfBooking, setDateOfBooking] = useState(currentDate.toISOString().split("T")[0]);
  const [timeOfBooking, setTimeOfBooking] = useState(currentDate.getHours() + ":" + formatMinutes());
  const [bookingHours, setBookingHours] = useState(0);
  const [weekendHours, setWeekendHours] = useState(0);
  const [weekdayHours, setWeekdayHours] = useState(0);

  // formats the display minutes
  function formatMinutes() {
    if (currentDate.getMinutes() < 10) {
      return "0" + currentDate.getMinutes();
    }
    else {
      return currentDate.getMinutes()
    }
  }

  // sets date input
  function retrieveDate(event) {
    setDateOfBooking(event.target.value);
  }

  // sets time input
  function retrieveTime(event) {
    setTimeOfBooking(event.target.value);
  }

  // sets hours input
  function retrieveHours(event) {
    setBookingHours(Math.max(event.target.value, 0));
  }

  // updates page 
  useEffect(() => {
    getWeekHours(dateOfBooking, timeOfBooking, bookingHours); // semiccolon here?
  }, [timeOfBooking, dateOfBooking, bookingHours]);

  // returns weekend hours
  function getWeekendHours() {
    return Math.round(weekendHours * 100) / 100;;
  }

  // returns weekday hours
  function getWeekdayHours() {
    return Math.round(weekdayHours * 100) / 100;
  }

  // returns weekend price
  function getWeekendPrice() {
    return 150 * Math.round(weekendHours * 100) / 100;
  }

  // returns weekday price
  function getWeekdayPrice() {
    return 100 * Math.round(weekdayHours * 100) / 100;
  }

  // returns total price
  function getTotalPrice() {
    return getWeekdayPrice() + getWeekendPrice();
  }

  // gets numbers of hours to be billed on weekday and weekends
  function getWeekHours(date, time, hours) {
    let hr = parseInt(time.split(":")[0]);
    let min = parseInt(time.split(":")[1]);
    let hoursLeft = hours;
    let weekendHrs = 0;
    let weekdayHrs = 0;

    function addHours(hoursToAdd, dayOfWeek) {
      if (dayOfWeek >= 5) {
        weekendHrs += hoursToAdd;
      } else {
        weekdayHrs += hoursToAdd;
      }
    }

    function incrementDay(day) {
      return (day + 1) % 7;
    }

    let hoursToNextDay = 24 - hr - (min / 60);
    let currentDay = new Date(date).getDay();
    let hoursToAdd = Math.min(hoursToNextDay, hoursLeft);

    addHours(hoursToAdd, currentDay);
    currentDay = incrementDay(currentDay);
    hoursLeft -= hoursToAdd;

    while (hoursLeft > 0) {
      hoursToAdd = Math.min(24, hoursLeft);
      addHours(hoursToAdd, currentDay);
      currentDay = incrementDay(currentDay);
      hoursLeft -= hoursToAdd;
    }

    setWeekendHours(weekendHrs);
    setWeekdayHours(weekdayHrs);
  }

  return (
    <div className="form-container">
      <p className='invite-book' data-aos="fade-right" data-aos-duration="1000"> Ready to book a move? Get a <span className='bold'>free</span> quote below! </p>
      <form data-aos="fade-left" data-aos-duration="1000">
        <label htmlFor="date">
          Start Date:
          <input
            min={new Date()} onInput={retrieveDate}
            type="date"
            required />
        </label>
        <label htmlFor="time">
          Start Time:
          <input
            onInput={retrieveTime}
            type="time"
            name="time"
            required
          />
        </label>
        <label htmlFor="hours">
          Hours:
          <input
            onInput={retrieveHours}
            type="number"
            name="hours"
            step="1"
            required
          />
        </label>
      </form>
      <div className="receipt-container" data-aos="fade-right" data-aos-duration="1000">
        <h2> Receipt for appointment on <span className="underline movemates-color">{dateOfBooking}</span> at <span className="underline movemates-color"> {timeOfBooking}</span> for <span className="underline movemates-color"> {bookingHours} hours</span> </h2>
        <div>
          <table className="receipt-table">
            <thead>
              <tr>
                <th>Service</th>
                <th>Hours</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              { }
              <tr>
                <td>Weekend Hours ($150/hr)</td>
                <td> {(Math.floor(getWeekendHours() * 100) / 100).toFixed(2)}</td>
                <td><span className="money-green">${(Math.floor(getWeekendPrice() * 100) / 100).toFixed(2)}</span></td>
              </tr>
              <tr>
                <td>Weekday Hours ($100/hr)</td>
                <td>{(Math.floor(getWeekdayHours() * 100) / 100).toFixed(2)}</td>
                <td><span className="money-green">${(Math.floor(getWeekdayPrice() * 100) / 100).toFixed(2)}</span></td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td><span className="bold">TOTAL</span></td>
                <td><span className="bold"> {(Math.floor(bookingHours * 100) / 100).toFixed(2)} </span></td>
                <td><span className="bold money-green"> ${(Math.floor(getTotalPrice() * 100) / 100).toFixed(2)} </span></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}

