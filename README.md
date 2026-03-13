## Overview

This project was developed as a platform for automated vulnerability assessment.  
It allows users to scan target hosts or subnets, detect open ports and running services, and identify known vulnerabilities using both official NSE scripts and custom processing logic.

The platform is designed to provide a simple frontend interface for users, while the backend handles the execution of scans, parsing of results, and formatting of vulnerability reports.

---

## Features

- Network host discovery
- Open port detection
- Service and version detection
- Vulnerability scanning using `Nmap` and `NSE`
- Support for custom vulnerability checks
- Structured vulnerability reporting
- Frontend integration with **Svelte**
- Safe testing using **Docker-based vulnerable environments**

---

## Frontend Functionality

The frontend represents the main interaction point for the user.

Through the web interface, users can:

- enter a target IP address or subnet
- launch a scan
- view detected open ports
- inspect running services
- review identified vulnerabilities
- read short descriptions and risk indicators for each issue

The goal of the interface is to make vulnerability scanning easier to use and easier to understand.

---

## Supported Vulnerability Categories

### SQL Injection
A vulnerability that allows attackers to inject malicious SQL commands into application queries.  
This may lead to unauthorized access, data exposure, or database manipulation.

### Cross-Site Scripting (XSS)
A vulnerability that allows malicious JavaScript code to be injected into a web application and executed in another user's browser.

### Cross-Site Request Forgery (CSRF)
A vulnerability that allows attackers to force authenticated users to perform unwanted actions in a web application.

### Directory Traversal
A vulnerability that allows access to files and directories outside the intended application path using sequences such as `../`.

### SSL/TLS Vulnerabilities
Includes weak SSL/TLS configurations, outdated protocols, weak cipher suites, and vulnerabilities such as **Heartbleed** or **CCS Injection**.

---

## Technologies Used

- **Nmap**
- **Nmap Scripting Engine (NSE)**
- **Bash**
- **Docker**
- **Svelte**
- **Linux (Kali / Ubuntu)**

---

## How It Works

The platform follows this general workflow:

1. **Target input**  
   The user provides a target IP address or subnet through the frontend.

2. **Host discovery**  
   The backend identifies active hosts in the target network.

3. **Port scanning**  
   Open ports are detected for each active target.

4. **Service detection**  
   Running services and versions are identified.

5. **Vulnerability scanning**  
   NSE scripts and custom logic are used to test for known vulnerabilities.

6. **Result parsing**  
   The output is processed into a cleaner and more readable format.

7. **Frontend display**  
   The results are displayed through the web interface.

---

## Docker-Based Testing Environment
 To safely test vulnerability detection, the project uses **Docker containers with intentionally vulnerable applications.**
 
 This approach provides:

- isolation from the host system
- reproducible testing environments
- safer experimentation
- easier deployment of vulnerable services
--

 Examples of vulnerabilities tested in Docker environments:
- Heartbleed
- MySQL authentication bypass
- web application vulnerabilities
- misconfigured HTTP/SSL services
---

## Example Nmap Usage

### General vulnerability scan

```bash
nmap -A -sV --script vuln <target-ip>
```

### Custom script selection

```bash
nmap -sV --script "ssl-heartbleed,http-sql-injection,http-stored-xss,http-csrf" <target-ip>
```

## Example Output Format
```
Open Port: 8443
Vulnerability name: ssl-heartbleed
Verdict: VULNERABLE
Risk factor: HIGH
Description: The Heartbleed Bug is a serious vulnerability in the popular OpenSSL cryptographic software library.
```

## Future Improvements
Planned future improvements include:
- better frontend visualizations
- real-time scan progress display
- support for more open-source security tools
- automated severity scoring
- exportable reports
- improved filtering and search in results
--
