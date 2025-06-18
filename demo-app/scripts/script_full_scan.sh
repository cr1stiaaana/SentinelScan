#!/bin/bash

# Script custom pentru testare full vulnerabilitati
# Autor: ebogdansan - on github

# 1. Detectează IP-ul propriu și subnetul
KALI_IP=$(hostname -I | awk '{print $1}')
SUBNET=$(ip route | grep "$KALI_IP" | awk '{print $1}')
TIMESTAMP=$(date +%Y-%m-%d_%H_%M_%S)
OUTPUT_DIR="nmap_results_$TIMESTAMP"

echo "Host IP is: $KALI_IP"
echo "Subnet detected: $SUBNET"
echo "Folder created: $OUTPUT_DIR"
mkdir -p "NMAP_output/$OUTPUT_DIR"

# 2. Scanare ping pe subnet pentru a găsi IP-uri active
echo "[*] Looking for active hosts inside the network..."
LIVE_HOSTS=$(nmap -sn "$SUBNET" | awk '/Nmap scan report for/ {print $NF}' | grep -vE "($KALI_IP|\.1$|\.254$|\.255$)")

echo "[**] Found $(echo "$LIVE_HOSTS" | wc -l) hosts active:"
echo "$LIVE_HOSTS"

# 3. Scanare vulnerabilități pe IP-urile detectate
COUNTER=1
for IP in $LIVE_HOSTS; do
    echo "[***] ($COUNTER) Scanning $IP for vulnerabilities..."
    sudo nmap -A -sV --script vuln "$IP" -oN "NMAP_output/$OUTPUT_DIR/scan_$IP.txt"
    ((COUNTER++))
done

echo "[✓] The scan is complete. The results are saved in: '$OUTPUT_DIR/'"
