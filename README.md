# WWCode IOT Hackathon
# Team #5

## Project name : Homeostasis

##### Team member

Jin Yuan,
Jaime Torres,
Emily Alden,
Soyoung Park,
Mary Ann Brennan

##### Summary
Intelligent window control for energy efficiency and health.

### Problem statement:
Limiting IOT climate control to smart thermostat fails to leverage open windows or light blocking shades to save energy


### Strategy:
Current IOT climate control solutions focus on thermostat and ignore energy savings and health benefits of heating and cooling via open windows.

- Intelligent window control
- Internal temperature monitoring
- Outdoor weather and air quality monitoring
- Remote control options for accessibility and convenience
- Forecast monitoring to determine optimal time of day to open windows
- Vacation mode for security

### Implementation: Hardware and Software
##### Part 1. Two Microcontrollers
Purpose:
One Microcontroller is used for measuring internal temperature and humidity, publishing to Adafruit io remote hub. The other is used for controlling servo based on the logic, data subscribed from io hub.

* [Feather Huzzah ESP 8266](https://www.adafruit.com/product/2821)  
* [Pin map link](https://cdn-learn.adafruit.com/assets/assets/000/046/211/original/Huzzah_ESP8266_Pinout_v1.2.pdf?1504807178)
* Code: `adafruitio_21_feed_read_door_control_i.h`

##### Part 2. Switch
Purpose: Manual intervention to open or close window through servo


##### Part 3. Temperature-Humidity sensor
Purpose:
measure and publish internal temperature, and internal humidity every 5sec to io hub.
standalone.

* sensor: [DHT22](https://www.adafruit.com/product/385)
* [pin map](https://learn.adafruit.com/assets/39485)
* Code: `adafruitio_config.h`
+ Required Arduino Libraries:
   - Adafruit MQTT Library
   - ArduinoHttpClient
   - [Adafruit IO Arduino](https://github.com/adafruit/Adafruit_IO_Arduino)
   - DHT sensor library
   - [Adafruit](https://github.com/adafruit/Adafruit_Sensor)


##### Part 4. Servo
Purpose: open or close the window
* [SG92R Micro servo](https://www.adafruit.com/product/169)
+ Required Arduino Libraries:
   - https://www.arduino.cc/en/reference/servo


##### Part 5. IO hub
Purpose:
Web host for receiving internal temperature, humidity, realtime dashboard, sending to second Microcontroller to control servo based on user's logic


[Click here to check out realtime dashboard!](io.adafruit.com/mabmierau/freds)

[Reference for setup](https://learn.adafruit.com/remote-control-with-the-huzzah-plus-adafruit-io/arduino-setup)

##### Part 6. Logic

To be published

##### Wishful thinking(not pursued, but hope to extend in the future):

- Gas sensor
- Temperature/Humidity display
- Magnetic contact switch
