import {auth, db, storage} from './config';
export {auth, db, storage};

import {signUp, login, logOut} from './authentication'
export {signUp, login, logOut};

import {createUser, listenForUserById, getUserByEmail, updateUserPropertyById, uploadUserImage, getUsersByNamePrefix, listenForUsersWithGoals} from './users'
export {createUser, listenForUserById, getUserByEmail, updateUserPropertyById, uploadUserImage, getUsersByNamePrefix, listenForUsersWithGoals};

import { getAllCourts } from './courts';
export { getAllCourts };

import { createMatch, getMatches, getPlayedMatches, updateMatch, getMatchById, listenForMatches, listenForPlayedMatches,listenForMatchById } from './matches';
export { createMatch, getMatches, getPlayedMatches, updateMatch, getMatchById, listenForMatches, listenForPlayedMatches,listenForMatchById };

import { createNotification, deleteNotification, listenForNotificationsByReceiverId, sendPushNotification } from './notifications';
export { createNotification, deleteNotification, listenForNotificationsByReceiverId, sendPushNotification };