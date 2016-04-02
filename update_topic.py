#!usr/bin/env python

from firebase.firebase import FirebaseApplication, FirebaseAuthentication

authentication = FirebaseAuthentication('05fRJb4X7uQe8WGbrZh4SvTAG4vJ6WtEL8SGwckK', 'jared.jolton@gmail.com', True, True)
firebase       = FirebaseApplication('https://breezytalk.firebaseio.com', authentication)

