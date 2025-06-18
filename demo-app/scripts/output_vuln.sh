#!/bin/bash

INPUT_FILE="/home/kali/NMAP_output/nmap_results_2025-06-17_16_11_21/scan_10.10.16.131.txt"
OUTPUT_FILE="vuln_report.txt"

if [ ! -f "$INPUT_FILE" ]; then
    echo "Fișierul $INPUT_FILE nu există!"
    exit 1
fi

echo "Extragere vulnerabilitati..."
> "$OUTPUT_FILE"

current_port=""

while IFS= read -r line; do
    # Detectez portul
    if [[ "$line" =~ ^([0-9]+)/tcp ]]; then
        current_port="${BASH_REMATCH[1]}"
    fi

    # Detectez blocurile cu VULNERABILITĂȚI
    if [[ "$line" == *"VULNERABLE:"* ]]; then
        titlu=""
        descriere=""
        risc="Unknown"

        for i in {1..10}; do
            read -r next || break

            # Titlul vulnerabilității (prima linie UPPERCASE)
            if [[ -z "$titlu" && "$next" =~ ^[[:space:]]*\|?[[:space:]]*([A-Z][^|]+)$ ]]; then
                titlu="${BASH_REMATCH[1]}"
                continue
            fi

            # Doar prima linie ca descriere
            if [[ -z "$descriere" && "$next" =~ ^[[:space:]]*\|?[[:space:]]*([A-Za-z0-9].{20,})$ ]]; then
                descriere="${BASH_REMATCH[1]}"
                continue
            fi

            # Dacă n-am setat risc și găsesc un pattern de risc
            if [[ "$risc" == "Unknown" && "$next" =~ (may|could|allows|lead to|result in|vulnerable to|allows attackers to) ]]; then
                risc=$(echo "$next" | sed 's/^[[:space:]]*//')
            fi

            # Dacă apare CVE, forțez HIGH
            if [[ "$next" =~ CVE-[0-9]{4}-[0-9]{4,} ]]; then
                risc="HIGH"
            fi
        done

        echo "[PORT $current_port]" >> "$OUTPUT_FILE"
        echo "  Nume: $titlu" >> "$OUTPUT_FILE"
        echo "  Descriere: $descriere" >> "$OUTPUT_FILE"
        echo "  Risc: $risc" >> "$OUTPUT_FILE"
        echo "" >> "$OUTPUT_FILE"
    fi
done < "$INPUT_FILE"

echo "Vulnerabilitățile au fost extrase în: $OUTPUT_FILE"
