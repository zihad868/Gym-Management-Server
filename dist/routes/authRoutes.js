"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controller/authController");
const router = (0, express_1.Router)();
// POST: Register User
router.post('/register', authController_1.registerUser);
// POST: Login User
router.post('/login', authController_1.loginUser);
exports.default = router;
