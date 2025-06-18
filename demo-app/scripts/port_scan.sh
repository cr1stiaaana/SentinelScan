#!/bin/bash

# Usage: ./port_scanner.sh <host> <start_port> <end_port>

if [ "$#" -ne 3 ]; then
    echo "Usage: $0 <host> <start_port> <end_port>"
    exit 1
fi

host=$1
start_port=$2
end_port=$3

echo "Scanning $host from port $start_port to $end_port..."

for ((port=start_port; port<=end_port; port++)); do
    timeout 1 bash -c "echo > /dev/tcp/$host/$port" 2>/dev/null &&
    echo "Port $port is OPEN" ||
    :
done

echo "Scan complete."
