import {auth, db, storage} from './config';
export {auth, db, storage};

import {signUp, login, logOut} from './authentication'
export {signUp, login, logOut};

import {createUser, getUserById, updateUserPropertyById, uploadUserImage, getUsersByNamePrefix, getUsersWithGoals} from './users'
export {createUser, getUserById, updateUserPropertyById, uploadUserImage, getUsersByNamePrefix, getUsersWithGoals};

import { getAllCourts } from './courts';
export { getAllCourts };

import { createMatch, getMatches, getPlayedMatches, updateMatch, getMatchById, listenForMatches, listenForPlayedMatches,listenForMatchById } from './matches';
export { createMatch, getMatches, getPlayedMatches, updateMatch, getMatchById, listenForMatches, listenForPlayedMatches,listenForMatchById };

import { createNotification, deleteNotification, listenForNotificationsByReceiverId } from './notifications';
export { createNotification, deleteNotification, listenForNotificationsByReceiverId };