// Dummy event data for demonstration
let events = [];

exports.getEvents = (req, res) => {
 res.json(events);
};

exports.createEvent = (req, res) => {
 const newEvent = {id: Date.now(), ...req.body, userId: req.user.id};
 events.push(newEvent);
 res.json(newEvent);
};

exports.updateEvent = (req, res) => {
 const {id} = req.params;
 const eventIndex = events.findIndex(
  event => event.id == id && event.userId == req.user.id
 );
 if (eventIndex !== -1) {
  events[eventIndex] = {...events[eventIndex], ...req.body};
  res.json(events[eventIndex]);
 } else {
  res.status(404).json({message: 'Event not found'});
 }
};

exports.deleteEvent = (req, res) => {
 const {id} = req.params;
 const eventIndex = events.findIndex(
  event => event.id == id && event.userId == req.user.id
 );
 if (eventIndex !== -1) {
  const deletedEvent = events.splice(eventIndex, 1);
  res.json(deletedEvent);
 } else {
  res.status(404).json({message: 'Event not found'});
 }
};
