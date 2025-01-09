"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adminController_1 = require("../controller/adminController");
const router = (0, express_1.Router)();
router.post('/admin-register', adminController_1.registerAdmin);
router.post('/admin-login', adminController_1.loginAdmin);
router.post('/assign-trainer', adminController_1.createClassSchedule);
exports.default = router;
