# scanastudio-scripting README

This extension add a sets of snippets templates, and autocompletion features to help writing scripts for [ScanaStudio](https://www.ikalogic.com/scanastudio/).

ScanaStudio scripts are JavaScript (*.js) files that are executed by ScanaStudio. Those scripts have access to the signals captured by logic analyzer devices, and can output data in various ways depending on the task the script has to accomplish. There are various kind of script, the most common type is a protocol decoder script, that is, a script that will decode (interpret) logic signals according to a standard protocol (like I2C, Serial UART, CAN, Etc…). There are also scripts that will allow a logic analyzer device to trigger on a specific word of a protocol, and finally, there are scripts that can build some logic patterns (like a PWM pattern) that can be later generated by devices that support signal generation.


More info about ScanaStudio scripting can be found [here](https://www.ikalogic.com/kb/scripting/ScanaStudio-scripting-manual/).

Current available scripts that can be used as examples can be found [here](https://github.com/ikalogic/ScanaStudio-scripts-v3).