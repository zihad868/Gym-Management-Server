import mongoose from 'mongoose';

const classScheduleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  trainer: { type: String, ref: 'Trainer', required: true }, // Storing trainer email
  trainees: [{ type: String, ref: 'Trainee' }],             // Storing trainee emails
}, { timestamps: true });

export default mongoose.model('ClassSchedule', classScheduleSchema);
