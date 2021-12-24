if exist nwjs\lock (
goto exit
)
if exist nwjs\nwjs.exe (
echo >nwjs\lock
nwjs\nwjs.exe -y
del nwjs\nwjs.exe /q
del nwjs\lock /q
)
start nwjs\nw.exe jstools
:exit
