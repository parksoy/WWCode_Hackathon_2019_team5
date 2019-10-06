// Adafruit IO Feed Reading
// Tutorial Link: https://learn.adafruit.com/adafruit-io-basics-feeds/sharing-a-feed
//
// Adafruit invests time and resources providing this open source code.
// Please support Adafruit and open source hardware by purchasing
// products from Adafruit!
//
// Written by Brent Rubell for Adafruit Industries
// Copyright (c) 2018 Adafruit Industries
// Licensed under the MIT license.
//
// All text above must be included in any redistribution.

/************************** Configuration ***********************************/

// edit the config.h tab and enter your Adafruit IO credentials
// and any additional configuration needed for WiFi, cellular,
// or ethernet clients.
#include "config.h"

#include <Servo.h>


const int servoPin = 12;
const int switchPin = 15;    // pin that the sensor is attached to
const float switchVal = 300; // volt thold
const int vacLedPin = 13;
bool lightsOn = true;    //initial vacation led state
bool winOpen = false;    //initial door state
const int openWin = 0; //
const int closeWin = 180; //
const float breathDel = 3; //
const float closeDel = 1; //
float roomTemp = 78; //
bool firstTime = true;
float currRoomTemp = 0;
int currVacay = 0; // 1 - on vacation
                   // 0 - home
float currRoomTempNameType = 0;
float simuRoomTemp = 81;
char* dfn = "hi";
const int tempLen = 41;
const int vacayLen = 24;


Servo myservo;  // create servo object to control a servo

/************************ Example Starts Here *******************************/

// the Adafruit IO username of whomever owns the feed
#define FEED_OWNER "mabmierau"

// set up the `sharedFeed`
AdafruitIO_Feed *sharedFeed_vacation_mode = io.feed("homeostasis.vacation-mode", FEED_OWNER);
//AdafruitIO_Feed *sharedFeed_outdoor_temperature = io.feed("homeostasis.outdoor-temperature", FEED_OWNER);
AdafruitIO_Feed *sharedFeed_temperature = io.feed("homeostasis.temperature", FEED_OWNER);
//AdafruitIO_Feed *sharedFeed_outdoor_air_quality = io.feed("homeostasis.outdoor-air-quality", FEED_OWNER);
//AdafruitIO_Feed *sharedFeed_door_state = io.feed("homeostasis.door-state", FEED_OWNER);

void setup() {

  myservo.attach(servoPin);  // attaches the servo on pin 9 to the servo object
  analogWrite(vacLedPin,500);
  myservo.write(closeWin);
  
  // start the serial connection
  Serial.begin(115200);

  // wait for serial monitor to open
  while(! Serial);

  // connect to io.adafruit.com
  Serial.print("Connecting to Adafruit IO");
  io.connect();

  // set up a message handler for the 'sharedFeed' feed.
  // the handleMessage function (defined below)
  // will be called whenever a message is
  // received from adafruit io.
  sharedFeed_vacation_mode->onMessage(handleMessage);
  //sharedFeed_outdoor_temperature->onMessage(handleMessage);
  sharedFeed_temperature->onMessage(handleMessage);

  // wait for a connection
  while(io.status() < AIO_CONNECTED) {
    Serial.print(".");
    delay(500);
  }

  // we are connected
  Serial.println();
  Serial.println(io.statusText());
  sharedFeed_vacation_mode->get();
  //sharedFeed_outdoor_temperature->get();
  //sharedFeed_outdoor_air_quality->get();
  sharedFeed_temperature->get();
  

}

void loop() {

  // io.run(); is required for all sketches.
  // it should always be present at the top of your loop
  // function. it keeps the client connected to
  // io.adafruit.com, and processes any incoming data.
  io.run();
  float switchValue = analogRead(switchPin);

  
  // if the analog value is high enough, turn on the LED:
  if (switchValue > switchVal) {
    if (lightsOn) {
      analogWrite(vacLedPin,0);
      lightsOn = false;
      
      } else
      {analogWrite(vacLedPin,500);
      lightsOn = true;
        }
    if (winOpen) {
      myservo.write(closeWin);
      winOpen = false;
      
      } else
      {myservo.write(openWin);
      winOpen = true;
        }
     delay(3000);
     
  } 

//swing open close wildly
  if (false) {
    if (winOpen) {
      myservo.write(closeWin);
      winOpen = false;
      
      } else
      {myservo.write(openWin);
      winOpen = true;
        }
      delay(500);
    }
  //Serial.println(currRoomTemp);
  //Serial.println((roomTemp + breathDel));

  //if (true && true) {}
  if ((currRoomTemp > (roomTemp + breathDel))&&(currVacay==0)) {
     //Serial.print("open sesame");
     myservo.write(openWin);
     winOpen = true;
       
    }
    else if ((currRoomTemp<(roomTemp + closeDel))||(currVacay==1)){
      myservo.write(closeWin);
      winOpen = false;}

  
  
  delay(2);

}

// this function is called whenever an 'sharedFeed' feed message
// is received from Adafruit IO. it was attached to
// the 'digital' feed in the setup() function above.
void handleMessage(AdafruitIO_Data *data) {
  Serial.print("  ");
  Serial.print(data->feedName());
  Serial.print(dfn);
  dfn = data -> feedName();
  //Serial.print(dfn.substr(13, 26));
  Serial.println(strlen(data->feedName()));
  Serial.print("received <-  ");
  Serial.println(data->value());

  if (strlen(data->feedName()) == tempLen) {
    currRoomTemp = data->toFloat();
    if (firstTime) {
      roomTemp = currRoomTemp;
      firstTime = false;}
    
    Serial.println(currRoomTemp);
    //Serial.print("Go Jenny!");
    }
    
  if (strlen(data->feedName()) == vacayLen) {
    currVacay = data->toInt();
    Serial.println(currVacay);
    }

    
  //currRoomTemp = simuRoomTemp;
  
}
