
/**
 * 
 */
enum GROVE_TWO_LIGHT {
    DEF_I2C_ADDR = 0x05,  // The device i2c address in default
    VID = 0x2886,         // Vender ID of the device
    PID = 0x0005          // Product ID of the device
}

/**
 * 
 */
enum GROVE_TWO_LIGHT_CMD_TYPE {
    I2C_CMD_GET_DEV_ID = 0x00,      // This command gets device ID information
    I2C_CMD_GET_DEV_EVENT = 0x01,   // This command gets device event status
    I2C_CMD_GET_LIGHT = 0x02,       // This command gets light sensor value
    I2C_CMD_SET_THD	= 0x03,         // This command sets light sensor threshold level
    I2C_CMD_LED_ON = 0xb0,          // This command turns on the indicator LED flash mode
    I2C_CMD_LED_OFF = 0xb1,         // This command turns off the indicator LED flash mode
    I2C_CMD_AUTO_SLEEP_ON = 0xb2,   // This command enable device auto sleep mode
    I2C_CMD_AUTO_SLEEP_OFF = 0xb3,  // This command disable device auto sleep mode (default mode)
    I2C_CMD_SET_ADDR = 0xc0,        // This command sets device i2c address
    I2C_CMD_RST_ADDR = 0xc1,        // This command resets device i2c address
}

/**
 * 
 */
enum LIGHT_THD_TYPE {
    THD_0_DEF_NUM = 50, // 
    THD_1_DEF_NUM = 200 //
}

enum LIGHT_EVENT_TYPE // light sensor event define
{
    //% block=<_Threshold_0
    LESS_THAN_THD_0 = 1,          // light intensity < threshold 0
    //% block=>=_Threshold_0_and_<_Threshold_1
	AMONG_THD_0_AND_THD_1 = 2,    // threshold 0 <= light intensity < threshold 1
    //% block=>=_Threshold_1
	MORE_THAN_THD_1 = 3           // light intensity >= threshold 1
};

/**
 * Functions to operate Grove Two Light module.
 */
//% weight=10 color=#9F79EE icon="\uf108"
namespace Grove_Two_Light
{
    let Event = 0;
    let wakePin: DigitalPin = DigitalPin.P8;
    // let wakePin: DigitalPin = DigitalPin.P12;
    
    export function wakeupDevice()
    {
        pins.digitalWritePin(wakePin, 0);
        control.waitMicros(25);
        pins.digitalWritePin(wakePin, 1);
        control.waitMicros(25);
    }
    
    export function i2cSendByte(address: number, data: number)
    {
        let buf: Buffer = pins.createBuffer(1);
        buf[0] = data;
        wakeupDevice();
        pins.i2cWriteBuffer(address, buf, false);
    }
    
    export function i2cSendBytes(address: number, data: Buffer)
    {
        wakeupDevice();
        pins.i2cWriteBuffer(address, data, false);
    }
    
    export function i2cReceiveByte(address: number): number
    {
        let buf: Buffer = pins.createBuffer(1);
        wakeupDevice();
        buf = pins.i2cReadBuffer(address, 1, false);
        return buf[0];
    }
    
    export function i2cReceiveBytes(address: number, len: number): Buffer
    {
        let buf: Buffer = pins.createBuffer(len);
        wakeupDevice();
        buf = pins.i2cReadBuffer(address, len, false);
        return buf;
    }
    
    export class Light
    {
        currentDeviceAddress: number;
        
        /**
         * Get vendor ID of device.
         */
        //% blockId=get_light_vid block="%strip|get device vid"
        //% parts="Grove_Two_Light" advanced=true
        getDeviceVID(): number
        {
            let data: Buffer = pins.createBuffer(4);
            i2cSendByte(this.currentDeviceAddress, GROVE_TWO_LIGHT_CMD_TYPE.I2C_CMD_GET_DEV_ID);
            data = i2cReceiveBytes(this.currentDeviceAddress, 4);
            return (data[0] + data[1] * 256);
        }
        
        /**
         * Get product ID of device.
         */
        //% blockId=get_light_pid block="%strip|get device pid"
        //% parts="Grove_Two_Light" advanced=true
        getDevicePID(): number
        {
            let data: Buffer = pins.createBuffer(4);
            i2cSendByte(this.currentDeviceAddress, GROVE_TWO_LIGHT_CMD_TYPE.I2C_CMD_GET_DEV_ID);
            data = i2cReceiveBytes(this.currentDeviceAddress, 4);
            return (data[2] + data[3] * 256);
        }
        
        /**
         * Change i2c address of device.
         * @param newAddress the new i2c address of device, eg: 5
         */
        //% blockId=change_light_address block="%strip|change device address to|%newAddress"
        //% parts="Grove_Two_Light" advanced=true
        changeDeviceAddress(newAddress: number = 5)
        {
            let data: Buffer = pins.createBuffer(2);
            data[0] = GROVE_TWO_LIGHT_CMD_TYPE.I2C_CMD_SET_ADDR;
            data[1] = newAddress;
            i2cSendBytes(this.currentDeviceAddress, data);
            this.currentDeviceAddress = newAddress;
        }
        
        /**
         * Restore the i2c address of device to default.
         */
        //% blockId=default_light_address block="%strip|default device address"
        //% parts="Grove_Two_Light" advanced=true
        defaultDeviceAddress()
        {
            i2cSendByte(this.currentDeviceAddress, GROVE_TWO_LIGHT_CMD_TYPE.I2C_CMD_RST_ADDR);
        }
        
        /**
         * Trun on the indicator LED flash mode.
         */
        //% blockId=turn_on_light_led_flash block="%strip|turn on led flash"
        //% parts="Grove_Two_Light" advanced=true
        turnOnLedFlash()
        {
            i2cSendByte(this.currentDeviceAddress, GROVE_TWO_LIGHT_CMD_TYPE.I2C_CMD_LED_ON);
        }
        
        /**
         * Trun off the indicator LED flash mode.
         */
        //% blockId=turn_off_light_led_flash block="%strip|turn off led flash"
        //% parts="Grove_Two_Light" advanced=true
        turnOffLedFlash()
        {
            i2cSendByte(this.currentDeviceAddress, GROVE_TWO_LIGHT_CMD_TYPE.I2C_CMD_LED_OFF);
        }
        
        /**
         * Enable device auto sleep mode.
         */
        //% blockId=enable_light_auto_sleep block="%strip|enable auto sleep"
        //% parts="Grove_Two_Light" advanced=true
        enableAutoSleep()
        {
            i2cSendByte(this.currentDeviceAddress, GROVE_TWO_LIGHT_CMD_TYPE.I2C_CMD_AUTO_SLEEP_ON);
        }
        
        /**
         * Disable device auto sleep mode.
         */
        //% blockId=disable_light_auto_sleep block="%strip|disable auto sleep"
        //% parts="Grove_Two_Light" advanced=true
        disableAutoSleep()
        {
            i2cSendByte(this.currentDeviceAddress, GROVE_TWO_LIGHT_CMD_TYPE.I2C_CMD_AUTO_SLEEP_OFF);
        }
        
        /**
         * Get the light event status.
         */
        //% blockId=get_light_event_status block="%strip|get event status"
        //% parts="Grove_Two_Light" advanced=true
        getEventStatus(): LIGHT_EVENT_TYPE
        {
            let data: Buffer = pins.createBuffer(4);
            i2cSendByte(this.currentDeviceAddress, GROVE_TWO_LIGHT_CMD_TYPE.I2C_CMD_GET_DEV_EVENT);
            data = i2cReceiveBytes(this.currentDeviceAddress, 4);
            return data[0];
        }
        
        /**
         * Get the light event status.
         */
        //% blockId=run_light_get_event_status block="%strip|run"
        run()
        {
            Event = this.getEventStatus();
        }
        
        /**
         * Check the light event status.
         */
        //% blockId=is_light_event_status block="%strip|is|%status"
        is(status: LIGHT_EVENT_TYPE): boolean
        {
            if(Event == status) return true;
            else return false;
        }
        
        /**
         * Get the light sensor value.
         */
        //% blockId=get_light_lux block="%strip|get light lux"
        getLightLux(): number
        {
            let data: Buffer = pins.createBuffer(2);
            i2cSendByte(this.currentDeviceAddress, GROVE_TWO_LIGHT_CMD_TYPE.I2C_CMD_GET_LIGHT);
            data = i2cReceiveBytes(this.currentDeviceAddress, 2);
            return (data[0] + data[1] * 256);
        }
        
        /**
         * Set the light threshold level 0.
         * @param value the value of light threshold level 0, eg: 50
         */
        //% blockId=set_light_threshold_0 block="%strip|set threshold 0|%value"
        //% parts="Grove_Two_Light" advanced=true
        setThreshold0(value: number = 50)
        {
            let data: Buffer = pins.createBuffer(4);
            data[0] = GROVE_TWO_LIGHT_CMD_TYPE.I2C_CMD_SET_THD;
            data[1] = 0;
            data[2] = value & 0xff;
            data[3] = value >> 8;
            i2cSendBytes(this.currentDeviceAddress, data);
        }
        
        /**
         * Set the light threshold level 1.
         * @param value the value of light threshold level 1, eg: 200
         */
        //% blockId=set_light_threshold_1 block="%strip|set threshold 1|%value"
        //% parts="Grove_Two_Light" advanced=true
        setThreshold1(value: number = 200)
        {
            let data: Buffer = pins.createBuffer(4);
            data[0] = GROVE_TWO_LIGHT_CMD_TYPE.I2C_CMD_SET_THD;
            data[1] = 1;
            data[2] = value & 0xff;
            data[3] = value >> 8;
            i2cSendBytes(this.currentDeviceAddress, data);
        }
    }
    
    /**
     * Create a new driver for light
     * @param address the address of device, eg: 5
     */
    //% blockId=create_light block="create module and set address|%address"
    export function create(address: number = 5): Light
    {
        let light = new Light();
        light.currentDeviceAddress = address;
        return light;
    }
}