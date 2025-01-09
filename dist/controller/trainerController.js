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
exports.viewTrainerSchedules = exports.loginTrainer = exports.registerTrainer = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Trainer_1 = __importDefault(require("../models/Trainer"));
const ClassSchedule_1 = __importDefault(require("../models/ClassSchedule"));
const registerTrainer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, expertise } = req.body;
        const existingTrainer = yield Trainer_1.default.findOne({ email });
        if (existingTrainer) {
            res.status(400).send('Trainer already exists');
            return;
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const newTrainer = new Trainer_1.default({ name, email, password: hashedPassword, expertise });
        yield newTrainer.save();
        res.status(201).send('Trainer registered successfully');
    }
    catch (error) {
        res.status(500).send('Error registering trainer');
    }
});
exports.registerTrainer = registerTrainer;
const loginTrainer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const trainer = yield Trainer_1.default.findOne({ email });
        if (!trainer) {
            res.status(404).send('Trainer not found');
            return;
        }
        const isMatch = yield bcryptjs_1.default.compare(password, trainer.password);
        if (!isMatch) {
            res.status(400).send('Invalid credentials');
            return;
        }
        const token = jsonwebtoken_1.default.sign({ email: trainer.email, role: 'trainer' }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({
            success: true,
            message: 'Trainer Login successful',
            data: {
                token,
                user: { name: trainer.name, email: trainer.email }
            }
        });
    }
    catch (error) {
        res.status(500).send('Error logging in');
    }
});
exports.loginTrainer = loginTrainer;
const viewTrainerSchedules = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.user; // Extract email from the authenticated token
    try {
        const schedules = yield ClassSchedule_1.default.find({ trainer: email });
        res.status(200).json({
            success: true,
            message: 'Trainer schedules retrieved successfully',
            schedules,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Error retrieving trainer schedules', error });
    }
});
exports.viewTrainerSchedules = viewTrainerSchedules;
