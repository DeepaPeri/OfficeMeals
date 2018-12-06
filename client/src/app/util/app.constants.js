import React from 'react';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import HomeIcon from '@material-ui/icons/HomeRounded';
import EventsIcon from '@material-ui/icons/EventRounded';
import BlogsIcon from '@material-ui/icons/BookRounded';
import ReportsIcon from '@material-ui/icons/DonutSmallRounded';

export const ListOfEvents = [
  {
    eventName: 'Business Need',
    eventCode: 'acc01'
  },
  {
    eventName: 'Process',
    eventCode: 'acc02'
  },
  {
    eventName: 'Domain',
    eventCode: 'acc03'
  }
];

export const ListOfTrainers = ['Mike', 'Arvind', 'karan', 'Rohit'];

export const ListOfLocations = ['Delhi', 'Hyderabad', 'Banglore', 'Mumbai'];

export const EmailRecords = [
  'gaurav.chaudhary@accoliteinida.com',
  'abac@gmail.com',
  'cvfd@gmail.com',
  'dow@gmail.com',
  '134@gmail.com',
  'kspfks@gmail.com'
];

export const APP_NAVIGATION_CONFIG_PRIMARY = [
  {
    text: 'Home',
    link: '/',
    icon: <HomeIcon />
  },
  {
    text: 'Events',
    link: '/events',
    icon: <EventsIcon />
  },
  {
    text: 'Blogs',
    link: '/blogs',
    icon: <BlogsIcon />
  },
  {
    text: 'Certification',
    link: '/certification',
    icon: <InboxIcon />
  }
];

export const APP_NAVIGATION_CONFIG_SECONDARY = [
  {
    text: 'Reports',
    link: '/reports',
    icon: <ReportsIcon />
  }
];

export const ROUTE_PARAMS = {
  EVENTS: {
    CREATE: 'create'
  }
};

const base = 'http://localhost:3300/api';
export const CREATE_EVENT_API = `${base}/events/create-event`;
export const GET_EMPLOYEE_API = `${base}/users/get-all-employees`;
export const GET_EVENT_BY_ID = ({ eventID }) =>
  `${base}/events/get-event-by-id/${eventID}`;
export const GET_EVENTS_API = ({ quarter, year }) =>
  `${base}/events/get-events/${quarter}/${year}`;
export const GET_ALL_CATEGORIES = `${base}/categories/get-all-categories`;
export const GET_ALL_LOCATION = `${base}/locations/get-all-locations`;

export default ListOfEvents;
