#!/bin/sh

sleep 5 # wep, i know this is not the best way to wait for the database to be ready.

npm run seed

npm start