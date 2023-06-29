import * as generator from "./generator.js";
const tickets = generator.getTickets(10);
const ballStack = generator.generateRandomStack(90);

const playGame = () => {
  // variable for storing the popped ball value and count how many balls popped
  const popedBallValue = [];
  let count = 0;

  // adding property ballMatched to store how many balls have matched in ticket.
  tickets.forEach((ticket) => (ticket.ballMatched = 0));

  // time interval to pop ball every one second
  const timer = setInterval(() => {
    // stop interval if all balls are popped
    if (count === 90) return clearInterval(timer);

    // match the ball value in all tickets
    generator.matchBall(ballStack[count], tickets);

    popedBallValue.push(ballStack[count]);

    // check for winning tickets
    const getWinnerTicket = generator.getWinnerTickets(tickets);

    // if there are winning tickets then stop interval and return the tickets with last ball popped
    if (getWinnerTicket.length !== 0) {
      clearInterval(timer);

      // deleting the property ballMatched and consoling the ticket
      getWinnerTicket.forEach((ticket) => {
        delete ticket.ballMatched;
        console.log("result ticket", ticket);
      });

      // consoling the last Ball Popped value
      console.log(
        "last Ball Popped",
        popedBallValue[popedBallValue.length - 1]
      );
    }
    count++;
  }, 1000);
};
playGame();
