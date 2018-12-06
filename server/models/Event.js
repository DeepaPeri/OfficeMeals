let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let EventSchema = new mongoose.Schema({
  eventId: String,
  name: String,
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  locations: [{ type: Schema.Types.ObjectId, ref: "Location" }],
  eventShortCode: String,
  createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  tentativeDates: {
    startDate: Date,
    endDate: Date
  },
  parts: [
    {
      description: String,
      trainer: { type: Schema.Types.ObjectId, ref: "User" },
      attendance: [{ type: Schema.Types.ObjectId, ref: "User" }],
      start: Date,
      end: Date
    }
  ],
  isPublished: Boolean,
  isActive: Boolean,
  isMultiSession: Boolean,
  nominations: [{ type: Schema.Types.ObjectId, ref: "User" }],
  createdAt: { type: Date, default: new Date() },
  updatedAt: { type: Date, default: new Date() }
});

let Event = mongoose.model("Event", EventSchema);
module.exports = Event;
