"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ClassScheduleSchema = new mongoose_1.default.Schema({
    date: { type: Date, required: true },
    time: { type: String, required: true },
    trainer: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Trainer', required: true },
    maxTrainees: { type: Number, default: 10 },
    trainees: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Trainee' }],
});
const ClassSchedule = mongoose_1.default.model('ClassSchedule', ClassScheduleSchema);
exports.default = ClassSchedule;
