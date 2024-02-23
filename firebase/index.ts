import {auth, db, storage} from './config';
export {auth, db, storage};

import {signUp, login, logOut} from './authentication'
export {signUp, login, logOut};

import {createUser, getUserById, updateUserPropertyById, uploadUserImage, getUsersByNamePrefix} from './users'
export {createUser, getUserById, updateUserPropertyById, uploadUserImage, getUsersByNamePrefix};

import { getAllCourts } from './courts';
export { getAllCourts };