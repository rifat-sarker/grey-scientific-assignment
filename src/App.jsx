import { useState } from "react";
import "./App.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function App() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventName, setEventName] = useState("");
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);


  const Date_Click_Fun = (date) => {
    setSelectedDate(date);
  };

  const Event_Data_Update = (event) => {
    setEventName(event.target.value);
  };

  const Create_Event_Fun = () => {
    if (selectedDate && eventName) {
      const newEvent = {
        id: new Date().getTime(),
        date: selectedDate,
        title: eventName,
      };
      setEvents([...events, newEvent]);
      setSelectedDate(null);
      setEventName("");
      setSelectedDate(newEvent.date);
    }
  };

  const Update_Event_Fun = (eventId, newName) => {
    const updated_Events = events.map((event) => {
      if (event.id === eventId) {
        return {
          ...event,
          title: newName,
        };
      }
      return event;
    });
    setEvents(updated_Events);
  };

  const Delete_Event_Fun = (eventId) => {
    const updated_Events = events.filter((event) => event.id !== eventId);
    setEvents(updated_Events);
  };

  const details_Event_Fun = (eventId) => {
    const event = events.find((event) => event.id === eventId);
    if (event) {
      setCurrentEvent(event);
      setShowModal(true);
    }
  };

  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      <div className="app">
        <h1 className="text-3xl font-bold">Grey Scientific Labs Calendar </h1>
        <div className="container">
          <div className="calendar-container">
            <Calendar
              value={selectedDate}
              onClickDay={Date_Click_Fun}
              tileClassName={({ date }) =>
                selectedDate &&
                date.toDateString() === selectedDate.toDateString()
                  ? "selected"
                  : events.some(
                      (event) =>
                        event.date.toDateString() === date.toDateString()
                    )
                  ? "event-marked"
                  : ""
              }
            />
          </div>
          <div className="event-container">
            {selectedDate && (
              <div className="event-form">
                <h2> Create Event </h2>
                <p className="py-4"> Selected Date: {selectedDate.toDateString()} </p>
                <input
                  type="text"
                  placeholder="Event Name"
                  value={eventName}
                  onChange={Event_Data_Update}
                />
                <button className="create-btn" onClick={Create_Event_Fun}>
                  Click Here to Add Event
                </button>
              </div>
            )}
            {events.length > 0 && selectedDate && (
              <div className="event-list">
                <h2> My Created Event List </h2>
                <div className="event-cards">
                  {events.map((event) =>
                    event.date.toDateString() ===
                    selectedDate.toDateString() ? (
                      <div key={event.id} className="event-card">
                        <div className="event-card-header">
                          <span className="event-date">
                            {event.date.toDateString()}
                          </span>
                          <div className="event-actions">
                            <button
                              className="update-btn"
                              onClick={() =>
                                Update_Event_Fun(
                                  event.id,
                                  prompt("ENTER NEW TITLE")
                                )
                              }
                            >
                              Update 
                            </button>
                            <button
                              className="delete-btn bg-red-600"
                              onClick={() => Delete_Event_Fun(event.id)}
                            >
                              Delete Event
                            </button>

                            <button
                              className="details-btn bg-green-700 "
                              onClick={() => details_Event_Fun(event.id)}
                            >
                          Details 
                            </button>
                          </div>
                        </div>
                        <div className="event-card-body">
                          <p className="event-title"> {event.title} </p>
                        </div>
                      </div>
                    ) : null
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

        {/* Modal for Event Details */}
      {currentEvent && (
        <Modal
          show={showModal}
          onHide={handleCloseModal}
          centered
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 pt-12"
        >
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg mx-auto">
            <Modal.Header className="border-b border-gray-200">
              <Modal.Title className="text-xl font-semibold">
               <span className="font-normal text-sm"> Event Title :</span> {currentEvent.title}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p className="text-lg"> <span className="font-normal text-sm"> Event Date :</span> {currentEvent.date.toDateString()}</p>
            </Modal.Body>
            <Modal.Footer className="border-t border-gray-200">
              <Button
                variant="secondary"
                className="bg-gray-500 text-white p-2 rounded my-6"
                onClick={handleCloseModal}
              >
                Close
              </Button>
             
            </Modal.Footer>
          </div>
        </Modal>
      )}
    </>
  );
}

export default App;
