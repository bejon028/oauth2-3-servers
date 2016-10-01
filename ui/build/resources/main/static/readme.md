# How to configure and run ITA-UI in Development environment

## BackEnd Server
ITA-UI is a front-end application for transaction management system (TMS) aka ITA.
so ITA-UI requires transaction management system as backend server.

## Required tools
To run ita-ui, following tools and environments need to be set up
- Visual C++ Run Time Environment x86
- Apache web server (tested with version 2.4)
- its a static front-end project, so one can run this in any application server(e.g wildfly) / htttp server

## How to configure hosts file
 Rather than accessing the ip address directly, it's good idea to access a web application by host name e.g mydomain.com.
 - Open your hosts file. In windows, hosts file path is C:\Windows\System32\drivers\etc\hosts and in linux it's in /etc/hosts
 - Map your host names to corresponding ip address.
 After editing, your hosts file should be like this (if tms ip is 192.168.56.10)
 192.168.56.10			tms.kpp.com
 - If you need to access these applications from any other server e.g integration, you only need to replace the ip address with the corresponding server's ip
 

## Apache web server - Installation and Configuration
- Install Visual C++ Run Time Environment (x86)
- Download the binary distribution of apache web server 2.4. 
- Unzip it in your preferred location.
- Open the conf/httpd.conf file in your favorite text editor. 
- Replace the default apache installation paths everywhere in the file with path in your environment.
- Change the listening port to 8000
- Change the ServerName to localhost e.g ServerName localhost
- Open your terminal/command prompt as administrator/root and go to apache_location/bin. Run the command: httpd.exe -k install
- You should see the message "The Apache2 service is successfully installed."
- Run the command: httpd.exe -k start and go to http://localhost:8000 You should see the default page
- If you want to stop the server, run the command httpd.exe -k stop

Please remember that effect of any change in the configuration files will take place after server restarting the server. 

