let mongoose = require("mongoose");

let SubTaskSchema = new mongoose.Schema({
  title: String,
  code: String,
  SLA: Number,
  SLABuffer: Number,
  SLAReferenceDate: String,
  SLAReferencePoint: Number,
  escalation: String,
  isDone: Boolean
});

let CategorySchema = new mongoose.Schema({
  name: String,
  slug: String,
  subTasks: [SubTaskSchema],
  isActive: Boolean
});

let Category = mongoose.model("Category", CategorySchema);
module.exports = {
  SubTaskSchema: SubTaskSchema,
  Category: Category
};

/**
 * const subTask = {
  summary: {
    done: '',
    level1: '',
    level2: '',
    level3: ''
  },
  tasks: [
    {
      name: 'Trainer selection',
      code: 'xxx1',
      SLA: 5,
      SLABuffer: 3,
      SLAReferenceDate: 'eventCreationDate',
      SLAReferencePoint: 1,
      escalation: ''
    },
    {
      name: 'Send invite',
      code: 'xxx2',
      SLA: 5,
      SLABuffer: 3,
      SLAReferenceDate: 'eventDate',
      SLAReferencePoint: -1,
      escalation: ''
    },
    {
      name: 'PPT upload',
      code: 'xxx2',
      SLA: 7,
      SLABuffer: 3,
      SLAReferenceDate: 'eventCreationDate',
      SLAReferencePoint: 1,
      escalation: ''
    },
    {
      name: 'PPT upload',
      code: 'xxx2',
      SLA: 7,
      SLABuffer: 3,
      SLAReferenceDate: 'eventCreationDate',
      SLAReferencePoint: 1,
      escalation: ''
    }
  ]
};
 */
