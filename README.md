# MonAmie
**CSCD 488 Project - Friend Finding App**

**Christopher Sturm | Craig Zuleski | Graham Baiz**












Table of Contents
1. Introduction
2. Overall Description
3. External Interface Requirements
4. System Features
5. Other Nonfunctional Requirements
6. Other Requirements






















# Introduction

**1.1 Purpose**
	The Mon Amie application is a friend finding software that will allow people of all demographics and backgrounds to connect with other individuals in their area with shared interests. Mon Amie will allow for peer-to-peer connectivity as well as group and event based functionality.

**1.2   Document Conventions**
	Anything marked with TBD is either subject to change or have not been discussed/decided upon. As progress is made on the project, these items will be further addressed.

**1.3   Intended Audience and Reading Suggestions**
This document is intended for developers and project managers, such that they have a better understanding of the groundwork of the Mon Amie application.

**1.4   Product Scope**
	The Scope of this product is to make finding people to do stuff with easily accessible by all ages. The main goal we’re trying to achieve is that those individuals who have had their friends move on, and those individuals who might be new to or visiting an area, can connect with others in that area that they may have otherwise never met.

# Overall Description

**2.1   Product Perspective**
	The Mon Amie application is a new self-contained product. This software may be expanded upon in the future to provide new features and services. Outside of 3rd party systems, all functionality present in the application will be newly created. 

**2.2   Product Functions**
Profile Creation/Customization
Friend Finding
Groups
Messaging
Event Planning





# User Classes and Characteristics
User
Frequent use of the application, most software features are designed around user interaction.
Organization/Team/Group
Frequent use, but slightly less than that of a User. Same general project accessibility as a User but wouldn’t make use of the peer-to-peer functionality, focusing entirely on the group and event functionality instead.
Administrative
Occasional use required when policing users and groups.
Approves suggestions by users and provides support to users.
Overall product management.

**2.4   Operating Environment**
Mon Amie will operate on both an Android OS environment as well as a web-based platform to allow a sufficiently broad range of access to start. An IOS environment nor a desktop application is not currently planned for Mon Amie. 

**2.5   Design and Implementation Constraints**
Limited Funds/Resources
Due to this product being a senior project we lack the funding and backing you would commonly find creating a product at or for a company. A limit will need to be placed on stored messages for this reason. Continued maintenance of the product we hand off to the sponsor will lie in their hands.
3rd Party Reliance
The messaging functionality of the product will specifically rely on the use of a 3rd party API to handle message storage and security meaning storage limits and security limits could be less flexible than desired.
Facebook integration is also planned mainly as a way to allow facebook users a fast and easy start to the product. Any facebook security compromises could also affect the product as a result though.




**2.6   User Documentation**
	Application will ship with an introductory tutorial in order to help those users that are less familiar with Android applications functions. The sign up process should be clearly defined and easy to follow to allow access for a wide range of users.




**2.7   Assumptions and Dependencies**
 	Mon Amie will rely initially on at least two 3rd party APIs. A messaging API that will handle security and message storage for the app as well as the Facebook API to allow for users to integrate their Facebook account with the app. Due to the team’s lack of experience with Android (and mobile) development, it would be ideal that the development of a web-based version of the app is completed first. Since we plan to only develop an Android version of Mon Amie and not an IOS version, no issues should surface with the product due to the operating environment.

# External Interface Requirements

**3.1   User Interfaces**
	
**3.1.1 GUI**
The GUI will allow the user to switch between different features in the application. Every button will either be interactive via tough on mobile platforms or via a click on desktop. The GUI will give visual representations of friends, groups, events, and messaging. The GUI’s will vary slightly from platform to platform but the overall layout and program flow will be the same. The user will interface with a GUI created with the .Net library, javascript, CSS, and any other software needed to integrate those codes bases.

**3.1.2 Display Across Platforms**
	The display will change to adapt the screen size and constraints. Bootstrap will be utilized to allow mobile users to view the web based app in a mobile friendly fashion. The mobile version of the app will be geared more towards mobile users and will have a slightly different display standard then the web based version.

**3.1.3 Common Features**
Users will always have home, friends, groups, events, and option buttons available to them to aid in the ease of navigation. These buttons will allow users to access any of the major features without having to move through multiple tabs or windows. Groups, friends, and events will feature the ability to message. Group and events will allow you to create groups or events and add/invite friends or members.



**3.1.4 Error Messages**
Error messages will either be in the form of a popup or a pageredirect. The error msg will either give a generic msg or a more in depth msg depending on the part where the error occured.

**3.2   Hardware Interfaces**
	The software will need to interact with hardware on users mobile devices and computer systems. The software will also need to interact with the hardware on the applications web server.	

**3.3   Software Interfaces**

**3.3.1 Databases**
The software will interact with the web servers two main databases. The web server features MSSQL, and MySQL as its two main databases. These databases will will store users and their interests, friends, groups, events, and any other data deemed necessary to store.

**3.3.2 Libraries**
The .Net libraries will be utilized by the software as well as CSS, and Javascript libraries. A third party library for messaging will be used by the software to aid in security and user friendliness. Any other software libraries deemed necessary or useful during production will also be utilized.

**3.3.3 Third Party API’s**
Third party libraries will be used by the application to aid in its creation and maintenance. One of the API’s that will be used will be for messaging; the vendor for this API is still being determined based on cost and features. Some of these API’s will help lessen the load on the software and data exchange with the server.

**3.3.4 Server**
	The server will be hosted by Smarterasp.net and the software will interact with the servers databases, libraries, and other features. The server will host most of the software for the web based application. The software on the mobile platform will interact with the host server for data exchanges and some background calculations.

**3.3.5 Coding Platform**
The application will utilize Visual Studio and its features in the development and maintenance of the program. Visual Studio will allow the integration of multiple coding languages and their features. This will allow us to more easily adapt our software in the creation of the desktop and mobile versions of the application. C#, javascript, CSS, and html will be the main coding languages used in the creation of the applications.






**3.4   Communications Interfaces**

**3.4.1 Email**
Email will be utilized in the application for the administrative side. The email will be setup and used from the server on Smarterasp.net. Using this email service provided by the server will create a more professional email address and reduce the cost of creating a business email account. Users will be able to interact with admin via these email address for customer support, feedback, and questions.

**3.4.2 Messaging**
Messaging will use a third party software. This software will handle communication and security of data. The messaging will be handled by the third party’s server and free up resources on our hosting server.

**3.4.3 Server**
The server will handle the communication between the application and the databases. The server will also handle any communication not covered by the third party messaging service.
 
# System Features

**4.1   Profile Creation/Customization**

**4.1.1  Description and Priority**
High Priority. A profile is required for the rest of the product to function. Profiles give a summary of the individual that can be as detailed as the user chooses.

**4.1.2  Stimulus/Response of Sequences**
1. User signs up and creates profile either through Facebook Integration or manually.
	2. Name, DoB/Age, Location, and a brief summary are required.
	3. At least 1 interest/hobby required to create profile
	4. Users can further add to their interests/hobbies at a later date if they choose, picking from a list of curated hobbies/interests that is ever expanding.
  
**4.1.3   Functional Requirements**
	REQ-1: A database table in which we can store users and their profile information.
	REQ-2: A secure way to store user passwords - TBD.
	REQ-3: Facebook Integration set up by means of the Facebook API.
	REQ-4: A database table of all the interests/hobbies a user can select.




**4.2   Friend Finding**

**4.2.1  Description and Priority**
	High Priority. This is main functionality of the app. Without this, Mon Amie isn’t a friend finding app. Users will be able to find friends based on their interests as well as their location.
  
**4.2.2  Stimulus/Response of Sequences**
After their profile is created, users are suggested other users in the same area that share their interests.
Users can filter these other users by age, location, and interests.
If a User feels they’ve made a connection, they can add them to their friend’s list.

**4.2.3   Functional Requirements**
	REQ-1: A relatively simple algorithm that would determine what users to suggest. Users would need to share at least one interest to be suggested to each other.
	REQ-2: This algorithm needs to be flexible and allow for sorting of the results by age, location, and specific interests.
	REQ-3: Allow integration through facebook to find facebook friends that have Mon Amie accounts.
  
**4.3   Groups**

**4.3.1  Description and Priority**
	Medium Priority. The main focus of the app is to find friends, but allowing for grouping and larger scale friend-making is a feature that would flesh out the product beyond just peer-to-peer connections.
  
**4.3.2  Stimulus/Response of Sequences**
Users can either create or search for groups
Groups are defined by at least, but no more than 3 interests/hobbies. This is to try and keep groups from being too broad.
Once created groups have similar functionality to a user: messaging and event planning.

**4.3.3   Functional Requirements**
	REQ-1: A database table of groups, as well as a table of interests/categories/hobbies by which to describe the groups. Whether this data table would be the same use for individual users is TBD.
	REQ-2: An algorithm very similar to the one used for finding friends that would suggest groups to users based on their interests.
  
**4.4   Messaging**

**4.4.1  Description and Priority**
	High Priority. It would be kind of difficult to develop any meaningful friendship with another user without some way to communicate. Users will be able to chat peer-to-peer as well as within groups they belong to. Event chat is also a possibility, but its implementation is TBD.


**4.4.2  Stimulus/Response of Sequences**
Assuming a user isn’t blocked. They can message another user regardless of whether they are on each other’s friends list.
Only members of a group can participate in a group chat.
Users can resume chatting at a later time with their message history preserved (to a limit).
Event chat would work similar to group chat in that you would need to RSVP to the event before being able to chat.

**4.4.3   Functional Requirements**
	REQ-1: A secure place to store conversation histories. Due to our limited funding, there would need to be a cap on how many messages are .
	REQ-2: A 3rd Party API would handle the message storage and security.
  
**4.5   Event Planning**

**4.5.1  Description and Priority**
	Medium Priority. Lowest priority of all the features, but still something that would greatly improve the product’s functionality if implemented. Groups (and possibly users) will be able to plan events that other users can rsvp to.
  
**4.5.2  Stimulus/Response of Sequences**
A group or user creates an event with a description, time, location, and a few tagged interests/hobbies.
Users are suggested events that share their interests, prioritizing events that are closer in date. 
Users are automatically notified when a group they are a member of posts an event.
Users RSVP to the group as either going, not going, or interested.
Once users have rsvp’d they are able to chat with others who have also rsvp’d.

**4.5.3   Functional Requirements**
	REQ-1: A database table to store events. Possibly 2 seperate tables for upcoming events and past events. 
	REQ-2: Similar algorithm used for finding groups and friends that suggests events based on a user’s interests/hobbies as well as the groups they belong to.
 
# Other Nonfunctional Requirements

**5.1   Performance Requirements**
	All functionality and tasks should perform at a reasonable speed. Sign up process should be flexible and allow users to either sign up and get right into finding friends, or fill out their profile more delicately to allow for more accurate friend/group/event suggestions. No part of the app should result in excessive loading whether it be loading users from our sql database or stored messages through the 3rd party API. Users should be able to easily flow throughout the product’s layout due to a design that is intuitive and minimal, while still conveying all necessary information.
  
**5.2   Safety Requirements**
This product will require a minimum age requirement. This is to avoid encouraging young children from wandering off to meet strangers. Also all events and activities will require a public gathering place, users may schedule private location events together after meeting in person if they so choose.

**5.3   Security Requirements**
In order to limit user risk, the application will ask for minimal personal information. This will prevent the damage that a would-be hacker could inflict. Also, peoples’ profile information will be inside of a database that has security measures in place by the hosting website.

**5.4   Software Quality Attributes**
The goal with this software is for it to be easily maintainable and reusable. In regards to customer interactions product focuses are ease of use and availability. Ease of use and accessibility will prioritized over user customization in some case such as have defined lists of interests/hobbies for users to select from, but allowing users to suggest future interests/hobbies to be added after admin approval. Additionally, users should be able to switch between mobile and web version of the product with little to no confusion. A concise and intuitive ui should be maintained between all operating systems the app is developed for.

**5.5   Business Rules**
The users and groups will only be able to create an account and access the user interface and general functionality of the application. Administrator roles will be able to remove accounts that appear to be spam or violating site policies as well as provide user support and take in user suggestions.
 
# Other Requirements

Mon Amie requires a hosting server in order to operate its databases. A paid subscription to another third-party chat service is also required in order for chat operations.




