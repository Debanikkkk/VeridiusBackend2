"use strict";
// import { MigrationInterface, QueryRunner } from "typeorm";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateDTCMigration1678923456789 = void 0;
class CreateDTCMigration1678923456789 {
    async up(queryRunner) {
        // Create the DTC table
        // Insert DTC codes into the table
        await queryRunner.query(`
            INSERT INTO dtc (code, description, severity) VALUES
            -- Engine-related DTCs
            ('P0101', 'Mass Air Flow Circuit Range/Performance Problem', 'Moderate'),
            ('P0113', 'Intake Air Temperature Sensor 1 Circuit High', 'Low'),
            ('P0219', 'Engine Over Speed Condition', 'High'),
            ('P0301', 'Cylinder 1 Misfire Detected', 'Moderate'),
            ('P0401', 'EGR Flow Insufficient Detected', 'Moderate'),
            ('P0420', 'Catalytic Converter System Efficiency Below Threshold (Bank 1)', 'High'),
            ('P0455', 'Evaporative Emission Control System Leak Detected (Large Leak)', 'Moderate'),
            ('P0480', 'Cooling Fan 1 Control Circuit', 'Moderate'),
            ('P0500', 'Vehicle Speed Sensor A', 'Low'),

            -- Transmission-related DTCs
            ('P0700', 'Transmission Control System Malfunction', 'High'),
            ('P0710', 'Transmission Fluid Temperature Sensor', 'Moderate'),
            ('P0750', 'Shift Solenoid A Malfunction', 'Moderate'),
            ('P0760', 'Shift Solenoid B Malfunction', 'Moderate'),
            ('P0780', 'Transmission Shift Malfunction', 'High'),
            ('P0793', 'Intermediate Shaft Speed Sensor', 'Moderate'),

            -- ABS-related DTCs
            ('C0031', 'Left Front Wheel Speed Sensor Circuit', 'Moderate'),
            ('C0041', 'Right Front Wheel Speed Sensor Circuit', 'Moderate'),
            ('C0121', 'ABS Wheel Speed Sensor Fault', 'High'),
            ('C0226', 'Right Rear Wheel Speed Sensor Circuit', 'Moderate'),
            ('C0475', 'Steering Angle Sensor Fault', 'Moderate'),

            -- ECM/PCM-related DTCs
            ('U0001', 'High Speed Can Communication Bus', 'High'),
            ('U0100', 'Lost Communication with Engine Control Module', 'High'),
            ('U0401', 'Invalid Data Received from ECM/PCM', 'High'),

            -- Diesel Exhaust Fluid (DEF) related DTCs
            ('P20B9', 'Reductant Pump Module Performance', 'Moderate'),
            ('P204F', 'Reductant Heater Performance', 'Moderate'),
            ('P203F', 'Reductant Quality Error', 'High'),

            -- Miscellaneous DTCs
            ('B1000', 'Body Control Module Fault', 'Moderate'),
            ('B1325', 'Battery Voltage Low', 'High'),
            ('B1494', 'Liftgate Switch Circuit', 'Low'),
            ('C1241', 'Brake Pressure Sensor Circuit', 'Moderate'),

            -- Additional Engine Codes
            ('P0171', 'System Too Lean (Bank 1)', 'Moderate'),
            ('P0131', 'O2 Sensor Circuit Low Voltage (Bank 1, Sensor 1)', 'Moderate'),
            ('P0137', 'O2 Sensor Circuit Low Voltage (Bank 1, Sensor 2)', 'Moderate'),
            ('P0302', 'Cylinder 2 Misfire Detected', 'Moderate'),
            ('P0421', 'Warm Up Catalyst Efficiency Below Threshold (Bank 1)', 'High'),

            -- Additional Transmission Codes
            ('P0740', 'Torque Converter Clutch Circuit Malfunction', 'Moderate'),
            ('P0755', 'Shift Solenoid A Circuit', 'Moderate'),
            ('P0864', 'Transmission Fluid Pressure Sensor Circuit', 'Moderate'),

            -- Additional ABS Codes
            ('C0045', 'Left Rear Wheel Speed Sensor Circuit', 'Moderate'),
            ('C0196', 'ABS Module Communication Fault', 'High'),
            ('C0271', 'ABS Traction Control Malfunction', 'High')
        `);
    }
    async down(queryRunner) {
        // Drop the DTC table
        await queryRunner.query(`DROP TABLE dtc`);
    }
}
exports.CreateDTCMigration1678923456789 = CreateDTCMigration1678923456789;
//# sourceMappingURL=1728631630052-dtcCodes.js.map