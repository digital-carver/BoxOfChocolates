BoxOfChocolates
===============

Available as an installable user-script at: http://userscripts.org/scripts/show/177283 

I’m lazy. Or more accurately, easily bored. So easily that, I’d rather spend two days learning some JS and CSS and writing this script, than copy and paste the cinst commands from the very useful http://chocolatey.org.

This script adds a “Chocolate box” near the top of chocolatey.org pages and an “Add to Box” link next to every cinst command. You can keep browsing the site, adding whatever commands you wish to the box, and they’re automatically updated in the Box above and kept synchronized across tabs too (uses localStorage). When you’re done, simply copy the command from the Box at the top and paste it into your Powershell, and watch it unfold its magic (or better leave it to Powershell and go do something useful!).

Currently the resulting command is in the Powershell workaround syntax suggested for versions
0.9.8.20 and below on https://github.com/chocolatey/chocolatey/wiki/CommandsInstall, can be easily modified to use the newer cinst pkg1 pkg2 pkg3 syntax also.

