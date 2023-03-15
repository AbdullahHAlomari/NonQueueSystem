import validate from "../middleware/validate";
import express, { Router } from "express";
import { auth } from "./../middleware/auth";
let router = express.Router();
import { z } from "zod";
import {
  createReservation,
  createTicket,
  deleteAllReservations,
  deleteAllSelectedUsers,
  deleteAllTickets,
  deleteReservation,
  deleteReservationByUserId,
  getAllReservations,
  getTickets,
  getUserReservations,
} from "../controller/ticketCont";
import {
  deleteAllUsers,
  deleteUserByEmail,
  getSelectedUserEmails,
  login,
  signup,
} from "../controller/userCont";
import { LoginTypes, RegisterTypes } from "../zod/zodSchema";

// Ticket section
router.get("/tickets", getTickets);
router.post("/ticket", createTicket);
router.get("/getAllReservations", getAllReservations);
router.get("/getUserReservations/:id", getUserReservations);
router.post("/reserve", createReservation);
router.delete("/deletereservation/:id", deleteReservation);
router.delete("/deletereserve", deleteReservationByUserId);
router.delete("/deleteallreservation", deleteAllReservations);
router.delete("/deleteAllSelectedUsers", deleteAllSelectedUsers);
router.delete("/deleteAllTickets", deleteAllTickets);

// User Section
router.post("/signup", validate(RegisterTypes), signup);
router.post("/login", validate(LoginTypes), login);
router.delete("/deleteuser", deleteUserByEmail);
router.get("/getemails", getSelectedUserEmails);
router.delete("/deleteAllUsers", deleteAllUsers);

export default router;
