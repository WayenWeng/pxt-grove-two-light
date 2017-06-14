{
    let light = Grove_Two_Light.create(GROVE_TWO_LIGHT.DEF_I2C_ADDR);
    
    light.turnOnLedFlash();
    basic.pause(3000);
    light.turnOffLedFlash();
    
    while(true)
    {
        light.run();
        if(light.is(LIGHT_EVENT_TYPE.LESS_THAN_THD_0))basic.showString("LESS");
        else if(light.is(LIGHT_EVENT_TYPE.AMONG_THD_0_AND_THD_1))basic.showString("AMONG");
        else if(light.is(LIGHT_EVENT_TYPE.MORE_THAN_THD_1))basic.showString("MORE");
        
        // let lux = light.getLightLux();
        // basic.showNumber(lux);
    }
}