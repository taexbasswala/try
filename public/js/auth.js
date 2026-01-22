// auth.js

import firebase from 'firebase/app';
import 'firebase/auth';

// Initialize Firebase
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);

// Function for Google Auth
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = async () => {
    try {
        const result = await firebase.auth().signInWithPopup(googleAuthProvider);
        const user = result.user;
        console.log('User signed in:', user);
    } catch (error) {
        console.error('Error signing in with Google:', error);
    }
};

// OTP Verification Functionality
export const sendOTP = async (phoneNumber) => {
    const appVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
    try {
        const confirmationResult = await firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier);
        // SMS sent. Prompt user to enter the code from the message.
        return confirmationResult;
    } catch (error) {
        console.error('Error sending OTP:', error);
    }
};

export const verifyOTP = async (confirmationResult, code) => {
    try {
        const userCredential = await confirmationResult.confirm(code);
        const user = userCredential.user;
        console.log('OTP verified. User:', user);
    } catch (error) {
        console.error('Error verifying OTP:', error);
    }
};