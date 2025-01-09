"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const classScheduleSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    date: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    trainer: { type: String, ref: 'Trainer', required: true }, // Storing trainer email
    trainees: [{ type: String, ref: 'Trainee' }], // Storing trainee emails
}, { timestamps: true });
exports.default = mongoose_1.default.model('ClassSchedule', classScheduleSchema);
