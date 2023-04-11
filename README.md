# Carpoolr Ride Sharing App
Carpoolr is a ride sharing app that connects users with similar destinations and interests to make commuting more enjoyable and eco-friendly. Our app offers a variety of features to ensure a safe and convenient ride sharing experience for our users.



<p align="center">
  <img src="Image/logo.png">
</p>

## Features
*Tour Mode*: Pair carpoolers with similar tour destinations and interests to make commuting more fun and interactive.

*Recurring Rides*: Schedule recurring rides with your preferred carpool partners to save time and reduce the hassle of daily commuting.

*Real-time Matching*: Get matched with riders going to the same place as you and save fare money!

## Project Requirements
Our app is designed with various non-functional requirements to ensure a seamless and reliable user experience. These requirements include:

Speed and Latency Requirements: Our system has a latency of less than 50 milliseconds for all database read and write operations, and is able to match carpoolers with potential matches within 3 seconds of the request.

Safety-Critical Requirements: Our system has an error handling system in place to detect and resolve critical errors within a maximum of 5 seconds, and has encryption and authentication mechanisms to ensure user safety.

Reliability and Availability Requirements: Our system is available 99.9 percent of the time, with a maximum downtime of 30 minutes per month for maintenance, and can handle a minimum of 5 concurrent ride requests without any loss of functionality or data.

Robustness or Fault-Tolerance Requirements: Our system can handle unexpected inputs or invalid data without crashing or producing incorrect results, and can recover from unexpected errors or crashes and continue functioning properly within 1 second.

Capacity Requirements: Our system can store and manage the data of at least 100 users and their associated ride histories, support at least 50 active rides simultaneously without any performance degradation, and can handle a minimum of 100 ride requests per hour during peak times.

Scalability or Extensibility Requirements: Our system can handle 100 riders concurrently without affecting performance or increasing latency, and is designed to allow additional features and functionality to be added without requiring significant changes to the core architecture.

Longevity Requirements: Our system is built with modular components, making it easier to replace or update individual parts as needed.

## Installation and Running of the App

- clone the repository
- Setup android emulator in Android Studio following: https://reactnative.dev/docs/environment-setup
- Cd into root app directory
- `npm install` 
- `export GOOGLE_MAPS_API_KEY=YOUR_API_KEY`
- Have `GOOGLE_MAPS_API_KEY=YOUR_API_KEY` in your .env file
- `npx react-native start`



## Support
If you have any questions or concerns about the Carpoolr Ride Sharing App, please contact our support team at support@carpoolr.com.

## Contributors
Carpoolr was created by a team of experienced developers who are passionate about making commuting more sustainable and enjoyable. Our team includes:

Mohamed Aly
Adam Podolak
Payton Chen
Isra Zahid

## License
This project is licensed under the MIT License - see the LICENSE.md file for details.


