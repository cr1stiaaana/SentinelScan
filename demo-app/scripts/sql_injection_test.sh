#!/bin/bash

ip="$1"

if [ -z "$ip" ]; then
  echo "No IP address provided"
  exit 1
fi

echo "Running SQL Injection test on $ip..."
sleep 3  # simulate test time
echo "Test complete — simulated result: no vulnerabilities found on $ip"
