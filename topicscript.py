from firebase.firebase import FirebaseApplication, FirebaseAuthentication

authentication = FirebaseAuthentication('AFH2c3nhbeT6gvRfjlg7iKHYROYVZmz4CIstByVy', 'em3700@yahoo.com', True, True)
firebase = FirebaseApplication('https://breezytalk.firebaseio.com', authentication)

import time

topics = ["Religion", 
	"Science",
	"Politics",
	"Philosophy",
	"Education",
	"Food",
	"Sports",
	"Ethics",
	"Culture",
	"Music",
	"Hobbies",
	"Movies and Film",
	"Literature",
	"Comedy"
	"Something"]
running = True
i = 0
while running == True:
	topic = topics[i]
	firebase.patch("/topics", topic)
	i += 1
        if i > len(topics):
		i = 0
	time.sleep(3)
