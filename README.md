# Syschain
#### Brett Bloethner | CSCI E-118 Final Prject


## Project Summary
#### Overview
The Syschain project was created to help improve the storage of critical networked device logs using a combination of the syslog utility found in most networked devices and the ethereum blockchain. From a high level, the Syschain application used the blockchain as an immutable storage medium for log file digest hashes. These hashes can then be used to validate the integrity of ingested syslogs for cyber security monitoring and incident response applications. Oftem times, cyber ciminals attempt to cover their tracks through the modification of system logs. This utility is meant to help combat that.

#### Design
The design of this application relies havily on a Typescript/Javascript command line application. This application acts as a Syslong receiving server that ingests syslogs from any server or networked device thats setup to send logs to the machine running this application. Once the a Syslog is received, this application then saves the log to a MongoDB data store solution and creates a digest of the log.  The application then saves the log digest as a transaction in the blockchain. The application interfaces with any Ethereum powered blockchain using the Web3 platform. MongoDB is used in order to allow fast access to log entries. Each log entry includes the transaction ID, that way it's validaity can be varified in the blockchain. In order to demonstrate the application, I've ccreated a simple dashboard in MongoDBs cloud database solution, Atlas. In an ideal operating environment, a dedicated data visualization app like Tablaeu would be used to visualize both the full text log entries from MongoDB as well as the blockchains transactions and the logs' validity in realtion to the blockchain. The application design is realitivly simply despite the implimentation being somewhat complex.

Devices producing he log files must be able to connect to the server running the this application. The can run locally on the same machine, connect over LAN or over a VPN in a WAN. The method of connectivity is really up to the adminstrator. The devices must also be able to stream Syslogs to the application on whichever port is specified in the application.

The application itself has three main requirements. It must be run on a machine with internet access that is capable of running the NodeJS runtime. It must also have access to a blockchain that can interface with the Web3 library. Lastley, it must have access to a MongoDB database. For my demonsration, I chose to use MongoDBs cloud database solution called Atlas. Unfortnatly, I couldnt find a suitable cloud blockchain solution so I had to run the Hyperledger Besu blockchain locally on a small machine at home. In the future, either of the data stores could be living in the cloud, locally, or somewhere in the LAN.

The applications interface provides status updates on the counts of logs and other various metrics. There are no controls beyond the startup command and options flags.

---
## Getting Started (Linux or OSX)
1. Install the NodeJS runtime and NPM package manager
   - https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-18-04
   - use the 'Installing the Distro-Stable Version for Ubuntu' method
2. Install Git
   - https://www.digitalocean.com/community/tutorials/how-to-install-git-on-ubuntu-18-04
   - use the 'Installing Git with Default Packages' method
3. Clone the public github repository
4. Install all the projects dependencies
5. Run the Syslog Generator
   - The syslog generator is what we'll use to send fake syslog to the app
6. Run the Syschain command line application
7. Continue on to the next section, "Verifying Functionality"

---
## Verifying Functionality
This project design is relativly complex when compared to simple contracts. Unfortuantly, this means that verifying the app is also relativly complex. In this section, I will go step by step showing how you can view dashboard data and make conclusions from the data, showing that the application is working as expected.

#### Terminal Dashboard
Ther terminal dashboard is rudiementary dashboard you'll see in the termainl once you start the application. Each parameter is described in the section below the image.

![terminal dashboard](dashboard.png)

- LOG SERVER [information relating the the application (log server) running in the terminal]
  - STATUS: status of the UDP server of the app
  - IP ADDRESS: IP address fo the UDP server of the app
  - LOGS RECEIVED: count of logs received via the UDP server
  - LOGS PROCESSED: count of the logs successfully processed through MongoDB and Besu
  - LAST RECEIVED LOG: readout of the last log received by the UDP server
- DATABASE [information relating to the MongoDB used to store full logs for normal access]
  - STATUS: status of the app's connection to the MongoDB
  - DB NAME: name of the database being used by the app
  - ADDRESS: internet address and port of the database being used the app
- BLOCKCHAIN [information relating to the Besu blockchain used to store log digest hashes]
  - CHAIN ID: the ID of the blockchain
  - CURRENT BLOCK: the current block being worked on by the network
  - ACCOUNT ADDRESS: the address the app is using to send transactions from
  - NODE INFO: various chain details spit out be the Web3 library
  - LAST PROCESSED LOG: readout of the last log successfully processed by the app
  - LAST PROCESSED LOG STATUS: verification status of the log in 'LAST PROCESSED LOG'
  - LAST PROCESSED LOG TRANSACTION ADDRESS: transaction hash of the digest for the log in 'LAST PROCESSED LOG'

#### Mongo Atlas Dashboard
The MongoDB Atlas dashboard would be the closest thing to a standard monitoring dashboard that an engineer might use with this app. With this dashboard we can view the logs saved in the database as well as their status in the blockchain. I've made this dashboard public, it's located at the below address and I use it in the demo video. 

https://charts.mongodb.com/charts-syschian-kecaa/public/dashboards/58659a27-cacc-4a48-bd50-fc993301d554

#### Hyperledger Besu Grafana Dashboard
This dashboard can be used to view various metrics related to the status of the blockchain. There isn't really anything in here that can be used to verify the ingeterity of the logs but it can be used to view the health and status of the blokcchain nodes.

http://159.65.241.85:3000/d/XE4V0WGZz/


#### Hyperledger Besu Block Explorer
The block explorer can be used to veriy the existance of transactions in the blockchain. Unfortunatley the block explorer doesnt allow us to view the data
value of a transaction, so we cant manually verify a log this way (although the logs are programatically verified by hte server). This tool is located at the below address and I use it in the demo video.

http://159.65.241.85:25000/




---
## Cloud Configurations and Locations
#### MongoDB Atlas
- MongoDB Atlas Address               : mongodb+srv://<username>:<password>@syschain-ezqqu.mongodb.net/test?retryWrites=true&w=majority
- MongoDB Atlas Dashboard             : https://charts.mongodb.com/charts-syschian-kecaa/public/dashboards/58659a27-cacc-4a48-bd50-fc993301d554
#### Hyperledger Besu Blockchain
- JSON-RPC HTTP service endpoint      : http://159.65.241.85:8545
- JSON-RPC WebSocket service endpoint : ws://localhost:8546
- GraphQL HTTP service endpoint       : http://localhost:8547
- Web block explorer address          : http://159.65.241.85:25000/
- Prometheus address                  : http://159.65.241.85:9090/graph
- Grafana address                     : http://159.65.241.85:3000/d/XE4V0WGZz/besu-overview?orgId=1&refresh=10s&from=now-30m&to=now&var-system=All

___
## Outside Sources
- https://www.npmjs.com/package/express-generator-typescript
  - this was used to generate the original project scaffolds and configure the typescript transpiler
- https://github.com/dbough/syslog-generator
  - this was used to generate test syslogs to send to the application
- Many other libraries were used in this project, just like in any standard NodeJS project. Below is some of the more important libraries used and a full list can be found in the package.json file.
  - js-sha256 (https://www.npmjs.com/package/js-sha256)
  - Mongoose (https://www.npmjs.com/package/mongoose)
  - syslog-parse (https://www.npmjs.com/package/syslog-parse)
  - Web3 (https://www.npmjs.com/package/web3)
  - Chalk (https://www.npmjs.com/package/chalk)
