# Grove Two Light

A PXT packet for Seeed Studio Grove Two Light

## Basic usage

```blocks
// Create a module driver, specify the i2c address
let light = Grove_Two_Light.create(DEVICE_ID_TYPE.GROVE_TWO_LIGHT_DEF_I2C_ADDR);

// Get light event vaule and display
while(true)
{
    light.run();
    if(light.is(LIGHT_EVENT_TYPE.LESS_THAN_THD_0))basic.showString("LESS");
    else if(light.is(LIGHT_EVENT_TYPE.AMONG_THD_0_AND_THD_1))basic.showString("AMONG");
    else if(light.is(LIGHT_EVENT_TYPE.MORE_THAN_THD_1))basic.showString("MORE");
}
```
More operation

Use ``getDeviceVID()`` to get vendor ID of device.

Use ``getDevicePID()`` to get product ID of device.

Use ``changeDeviceAddress()`` to change i2c address of device.

Use ``defaultDeviceAddress()`` to restore the i2c address of device to default.

Use ``turnOnLedFlash()`` to trun on the indicator LED flash mode.

Use ``turnOffLedFlash()`` to trun off the indicator LED flash mode.

Use ``enableAutoSleep()`` to enable device auto sleep mode.

Use ``disableAutoSleep()`` to disable device auto sleep mode.

Use ``getEventStatus()`` to get the light event status.

Use ``getLightLux()`` to get the light sensor value.

Use ``setThreshold0()`` to set the light threshold level 0.

Use ``setThreshold1()`` to set the light threshold level 1.

## License

MIT

## Supported targets

* for PXT/microbit
(The metadata above is needed for package search.)

