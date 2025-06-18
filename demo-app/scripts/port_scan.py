import socket
import json
from datetime import datetime

def scan_ports(target, start_port=1, end_port=1024):
    open_ports = []
    status = "success"
    message = ""

    print(f"Scanning {target} from port {start_port} to {end_port}...")

    try:
        for port in range(start_port, end_port + 1):
            with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
                sock.settimeout(0.5)
                result = sock.connect_ex((target, port))
                if result == 0:
                    open_ports.append(port)
    except socket.gaierror:
        status = "error"
        message = "Hostname could not be resolved."
    except socket.error:
        status = "error"
        message = "Socket error. Could not connect."
    except KeyboardInterrupt:
        status = "error"
        message = "Scan interrupted by user."

    result_data = {
        "target": target,
        "start_port": start_port,
        "end_port": end_port,
        "open_ports": open_ports,
        "status": status,
        "message": message,
        "timestamp": datetime.now().isoformat()
    }

    print(json.dumps(result_data, indent=2))
    return result_data

if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(description="Simple Port Scanner")
    parser.add_argument("host", help="Target IP or hostname")
    parser.add_argument("start_port", type=int, help="Start of port range")
    parser.add_argument("end_port", type=int, help="End of port range")
    args = parser.parse_args()

    scan_ports(args.host, args.start_port, args.end_port)
