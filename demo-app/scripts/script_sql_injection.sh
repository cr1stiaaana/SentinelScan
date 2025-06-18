#!/bin/bash

# Script custom pentru testare SQL injection
# Autor: ebogdansan - on github

# 1. Detectează IP-ul propriu și subnetul
KALI_IP=$(hostname -I | awk '{print $1}')
SUBNET=$(ip route | grep "$KALI_IP" | awk '{print $1}')
TIMESTAMP=$(date +%Y-%m-%d_%H_%M_%S)
OUTPUT_DIR="nmap_results_$TIMESTAMP"

echo "IP-ul propriu este: $KALI_IP"
echo "Subnet detectat: $SUBNET"
echo "Folder creat: $OUTPUT_DIR"
mkdir -p "NMAP_output/$OUTPUT_DIR"

# 2. Scanare ping pe subnet pentru a găsi IP-uri active
echo "[*] Caut hosturi active în rețea..."
LIVE_HOSTS=$(nmap -sn "$SUBNET" | awk '/Nmap scan report for/ {print $NF}' | grep -vE "($KALI_IP|\.1$|\.254$|\.255$)")

echo "[**] Găsite $(echo "$LIVE_HOSTS" | wc -l) hosturi active:"
echo "$LIVE_HOSTS"

# 4. Scanare vulnerabilități pe IP-urile detectate
COUNTER=1
for IP in $LIVE_HOSTS; do
    	echo "[***] ($COUNTER) Scanez $IP pentru vulnerabilități de tip SQL injection..."
    	sudo nmap -A -sV --script "http-sql-injection,http-vuln-cve2017-8917,mysql-vuln-cve2012-2122,mysql-empty-password,mysql-brute,ms-sql-brut,ms-sql-empty-password,ms-sql-query" "$IP" -oN "NMAP_output/$OUTPUT_DIR/scan_$IP.txt"
    	((COUNTER++))
done

echo "[✓] Scanare completă. Rezultatele sunt salvate în '$OUTPUT_DIR/'"
