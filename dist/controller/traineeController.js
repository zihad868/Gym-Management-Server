"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelBooking = exports.joinClass = exports.loginTrainee = exports.registerTrainee = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Trainee_1 = __importDefault(require("../models/Trainee"));
const registerTrainee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        const existingTrainee = yield Trainee_1.default.findOne({ email });
        if (existingTrainee) {
            res.status(400).send('Trainee already exists');
            return;
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const newTrainee = new Trainee_1.default({ name, email, password: hashedPassword });
        yield newTrainee.save();
        res.status(201).send('Trainee registered successfully');
    }
    catch (error) {
        res.status(500).send('Error registering trainee');
    }
});
exports.registerTrainee = registerTrainee;
const loginTrainee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const trainee = yield Trainee_1.default.findOne({ email });
        if (!trainee) {
            res.status(404).send('Trainee not found');
            return;
        }
        const isMatch = yield bcryptjs_1.default.compare(password, trainee.password);
        if (!isMatch) {
            res.status(400).send('Invalid credentials');
            return;
        }
        const token = jsonwebtoken_1.default.sign({ email: trainee.email, role: 'trainee' }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({
            success: true,
            message: 'Trainee Login successful',
            data: {
                token,
                user: { name: trainee.name, email: trainee.email }
            }
        });
    }
    catch (error) {
        res.status(500).send('Error logging in');
    }
});
exports.loginTrainee = loginTrainee;
const ClassSchedule_1 = __importDefault(require("../models/ClassSchedule"));
const joinClass = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { classId } = req.body; // classId from the request body
    const { email } = req.user; // email extracted from the JWT token
    try {
        // Find the class schedule
        const classSchedule = yield ClassSchedule_1.default.findById(classId);
        if (!classSchedule) {
            res.status(404).json({ success: false, message: 'Class schedule not found' });
            return;
        }
        // Check if the trainee is already added
        if (classSchedule.trainees.includes(email)) {
            res.status(400).json({ success: false, message: 'Trainee already joined the class' });
            return;
        }
        // Check if the class has room
        if (classSchedule.trainees.length >= 10) {
            res.status(400).json({ success: false, message: 'Class is full' });
            return;
        }
        // Add the trainee to the class
        classSchedule.trainees.push(email);
        yield classSchedule.save();
        res.status(200).json({
            success: true,
            message: 'Trainee successfully joined the class',
            classSchedule,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error', error });
    }
});
exports.joinClass = joinClass;
const cancelBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { classId } = req.body; // Get the class ID from the request body
    const { email } = req.user; // Extract trainee's email from the JWT token
    try {
        // Find the class schedule
        const classSchedule = yield ClassSchedule_1.default.findById(classId);
        if (!classSchedule) {
            res.status(404).json({ success: false, message: 'Class schedule not found' });
            return;
        }
        // Check if the trainee is part of the class
        if (!classSchedule.trainees.includes(email)) {
            res.status(400).json({ success: false, message: 'Trainee not booked in this class' });
            return;
        }
        // Remove the trainee from the class
        classSchedule.trainees = classSchedule.trainees.filter(trainee => trainee !== email);
        yield classSchedule.save();
        res.status(200).json({
            success: true,
            message: 'Booking canceled successfully',
            classSchedule,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error', error });
    }
});
exports.cancelBooking = cancelBooking;
