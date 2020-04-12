# Syschain
#### Brett Bloethner | CSCI E-118 Final Prject


## Overview

The Syschain project was created to help improve the storage of critical networked device logs using a combination of the syslog utility found in most networked devices and the ethereum blockchain. From a high level, the Syschain application used the blockchain as an immutable storage medium for log file digest hashes. These hashes can then be used to validate the integrity of ingested syslogs for cyber security monitoring and incident response applications. Oftem times, cyber ciminals attempt to cover their tracks through the modification of system logs. This utility is meant to help combat that.

## Application Architechture

The application 

## Requirements
In order to properly run the application and for it to fufill is purpose, you're network must have the following requirements
- Requirements for devices sending logs
  - Each device must be able to establish a connection to the syslog server
  - Each device must be able to send their logs using the syslog standard
  - Each device must be able to stream the syslogs to the syslog server via in real time using a continuous UDP connection to the syslog server on port ****
- Requirements for the syslog server
- An ubuntu device is required to host the application and will act as the syslog server mentioned above
- The ubuntu device must be able to access an Ethereum blockchain
- The ubuntu device must be able to access a mongoDB data store
  
## Getting Started
1. Install Ubuntu on your Syslog server
2. Install Syschain on your syslog server
3. Start Syschain with CLI options
4. Configure network devices for remote syslogging

## Verifying Funcationality

