// generate a ticket
const generateTicket = (row = 5, column = 5, diff = 18) => {
  const ticket = new Set();
  let min = 1;
  let max = diff;
  while (ticket.size < row * column) {
    const num = min + Math.round(Math.random() * (max - min));
    ticket.add(num);
    if (ticket.size % row == 0) {
      min += diff;
      max += diff;
    }
  }
  return [...ticket].sort((a, b) => a - b);
};

// generate bulk tickets
export const getTickets = (num) => {
  const result = [];
  for (let i = 0; i < num; i++) {
    result.push({
      ticketId: `tk${i + 1}`,
      ticket: generateTicket(),
    });
  }
  return result;
};

// generating the ball stack with randomly numbers from 1-90.
export const generateRandomStack = (num) => {
  const result = [];
  while (result.length !== num) {
    const value = Math.round(Math.random() * (num - 1) + 1);
    if (!result.includes(value)) result.push(value);
  }
  return result;
};

// match the ball value in ticket and increase ballMatched
export const matchBall = (ballValue, tickets) => {
  tickets.forEach((ticket) => {
    if (ticket.ticket.includes(ballValue)) ticket.ballMatched += 1;
  });
};

// get winner Tickets if the ball Match count is 25
export const getWinnerTickets = (tickets) => {
  const winningTicket = tickets.filter((ticket) => ticket.ballMatched === 25);
  return winningTicket;
};
