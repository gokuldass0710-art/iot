export const PROJECT_INFO = {
  title: "IoT Smart Home Security Project",
  subtitle: "Master Antigravity Virtual Lab & Cybersecurity Operations Portal",
  version: "1.0.0 Master Guide",
  objective: "Build a software-defined virtual smart-home laboratory to demonstrate IoT identification, authentication, authorization, network segmentation, mTLS encryption, firmware signing, Suricata IDS, Wazuh SIEM, and automated incident response.",
  lifecycle: ["ASSESS", "DESIGN", "BUILD", "SECURE", "ATTACK / TEST", "DETECT", "RESPOND", "RETEST", "DOCUMENT"]
};

export const VM_PLAN = [
  { name: "pfSense", purpose: "Firewall & Gateway Router", ip: "192.168.x.1 per interface", network: "Gateway for Admin, Server, IoT", status: "Active", icon: "Shield" },
  { name: "Kali Linux", purpose: "Authorized Security Testing", ip: "192.168.10.10", network: "Admin VLAN (192.168.10.0/24)", status: "Active", icon: "Terminal" },
  { name: "Ubuntu MQTT", purpose: "Mosquitto Message Broker & TLS", ip: "192.168.20.20", network: "Server VLAN (192.168.20.0/24)", status: "Active", icon: "Server" },
  { name: "Ubuntu Wazuh", purpose: "SIEM & File Integrity Monitoring", ip: "192.168.20.30", network: "Server VLAN (192.168.20.0/24)", status: "Active", icon: "Activity" },
  { name: "Ubuntu IoT Sim", purpose: "Simulated IoT Device Nodes", ip: "192.168.30.101+", network: "IoT VLAN (192.168.30.0/24)", status: "Active", icon: "Cpu" }
];

export const FIREWALL_RULES = [
  { source: "Admin VLAN", dest: "Server VLAN", service: "SSH / Web / Management", result: "ALLOW", icon: "CheckCircle", color: "text-emerald-400", reason: "Authorized administrative control" },
  { source: "Admin VLAN", dest: "IoT VLAN", service: "Testing / Management", result: "ALLOW", icon: "CheckCircle", color: "text-emerald-400", reason: "Authorized vulnerability testing & updates" },
  { source: "IoT VLAN", dest: "MQTT Broker", service: "MQTT over TLS (Port 8883)", result: "ALLOW", icon: "CheckCircle", color: "text-emerald-400", reason: "Encrypted device telemetry ingest" },
  { source: "IoT VLAN", dest: "Admin VLAN", service: "Any Protocol", result: "DENY", icon: "XCircle", color: "text-rose-400", reason: "Prevents lateral movement from compromised IoT" },
  { source: "Guest Network", dest: "IoT VLAN", service: "Any Protocol", result: "DENY", icon: "XCircle", color: "text-rose-400", reason: "Guest network strict isolation" },
  { source: "Guest Network", dest: "Admin VLAN", service: "Any Protocol", result: "DENY", icon: "XCircle", color: "text-rose-400", reason: "Guest network strict isolation" },
  { source: "IoT VLAN", dest: "Internet", service: "Whitelisted NTP / DNS only", result: "RESTRICT", icon: "AlertTriangle", color: "text-amber-400", reason: "Prevents botnet C2 traffic and unauthorized phone-home" }
];

export const IOT_DEVICES = [
  { id: "IoT-001", name: "Temperature Sensor", topic: "home/livingroom/temperature", samplePayload: '{"device_id":"iot-001", "temperature": 28.4, "unit":"C", "timestamp":"1695000000"}', cert: "iot-001.crt", acl: "ALLOW WRITE home/livingroom/temperature", status: "Active" },
  { id: "IoT-002", name: "Motion Sensor", topic: "home/livingroom/motion", samplePayload: '{"device_id":"iot-002", "motion_detected": true, "timestamp":"1695000005"}', cert: "iot-002.crt", acl: "ALLOW WRITE home/livingroom/motion", status: "Active" },
  { id: "IoT-003", name: "Door Lock Sensor", topic: "home/frontdoor/status", samplePayload: '{"device_id":"iot-003", "door_state": "LOCKED", "tamper": false, "timestamp":"1695000010"}', cert: "iot-003.crt", acl: "ALLOW WRITE home/frontdoor/status", status: "Active" }
];

export const LAB_PHASES = [
  {
    id: 0,
    title: "Phase 0 — Project Initialization",
    category: "Infrastructure",
    description: "Create directory structure, architecture diagrams, and master status trackers.",
    doneWhen: [
      "Project folder created",
      "LAB-SIMULATION.md added",
      "README.md created",
      "Folder structure created",
      "Initial architecture diagram created"
    ]
  },
  {
    id: 1,
    title: "Phase 1 — VMware Laboratory Setup",
    category: "Infrastructure",
    description: "Configure VMware custom virtual networks (VMnet1 Admin, VMnet2 Server, VMnet3 IoT) and install pfSense.",
    doneWhen: [
      "pfSense VM boots and initial wizard complete",
      "Admin network interface responds on 192.168.10.1",
      "Server network interface responds on 192.168.20.1",
      "IoT network interface responds on 192.168.30.1",
      "Expected gateways respond to ping from member VMs"
    ]
  },
  {
    id: 2,
    title: "Phase 2 — pfSense Network Segmentation",
    category: "Infrastructure",
    description: "Implement least privilege firewall rules to isolate IoT devices from Admin networks.",
    doneWhen: [
      "VLAN interface IP assignments verified",
      "Firewall rule IoT -> Admin DENY verified",
      "Firewall rule IoT -> MQTT ALLOW verified",
      "pfSense syslog and firewall logging enabled",
      "Authorized Nmap scan from Kali recorded"
    ]
  },
  {
    id: 3,
    title: "Phase 3 — MQTT Broker Deployment",
    category: "IoT",
    description: "Install Mosquitto MQTT broker on Ubuntu Server (192.168.20.20) and test baseline publishing.",
    doneWhen: [
      "Mosquitto broker service enabled and active",
      "Baseline publish test succeeds (mosquitto_pub)",
      "Baseline subscribe test succeeds (mosquitto_sub)",
      "Mosquitto system logs available at /var/log/mosquitto/mosquitto.log"
    ]
  },
  {
    id: 4,
    title: "Phase 4 — Software IoT Simulation",
    category: "IoT",
    description: "Develop Python Paho-MQTT device scripts for Temperature, Motion, and Door Lock sensors.",
    doneWhen: [
      "temperature_sensor.py publishes JSON telemetry every 5s",
      "motion_sensor.py publishes motion trigger events",
      "door_sensor.py publishes lock state telemetry",
      "MQTT messages successfully reach Mosquitto broker topics"
    ]
  },
  {
    id: 5,
    title: "Phase 5 — Baseline Security Assessment",
    category: "Testing",
    description: "Measure initial unencrypted exposure using Kali Nmap and Wireshark plaintext packet captures.",
    doneWhen: [
      "Nmap baseline scan of 192.168.30.101 saved",
      "Wireshark capture showing plaintext MQTT on TCP 1883 created",
      "documentation/current-state-assessment.md created",
      "Risks and recommendations documented"
    ]
  },
  {
    id: 6,
    title: "Phase 6 — PKI & Certificate Authority Setup",
    category: "Security",
    description: "Establish a dedicated Lab Certificate Authority (CA) using OpenSSL RSA-4096 keys to issue server & client certificates.",
    doneWhen: [
      "Lab Root CA key (ca.key) and certificate (ca.crt) generated",
      "Mosquitto MQTT server certificate and key generated",
      "Individual IoT device client certificates (IoT-001, IoT-002, IoT-003) generated",
      "Key protection rules enforced (private keys excluded from Git)"
    ]
  },
  {
    id: 7,
    title: "Phase 7 — MQTT over TLS & Mutual TLS (mTLS)",
    category: "Security",
    description: "Configure Mosquitto to require client certificates (port 8883) for device identity enforcement.",
    doneWhen: [
      "Mosquitto listener configured for port 8883 with require_certificate true",
      "Valid client certificate connection succeeds",
      "Untrusted/missing client certificate connection rejected by TLS handshake",
      "Wireshark mTLS handshake packet capture saved"
    ]
  },
  {
    id: 8,
    title: "Phase 8 — MQTT Authorization & RBAC ACLs",
    category: "Security",
    description: "Enforce topic-level Access Control Lists (ACLs) so devices can only write to designated home telemetry topics.",
    doneWhen: [
      "Mosquitto ACL configuration file created",
      "IoT-001 allowed to write to home/livingroom/temperature",
      "IoT-001 denied from writing to home/admin/config",
      "documentation/authentication-authorization.md updated"
    ]
  },
  {
    id: 9,
    title: "Phase 9 — Encryption at Rest for Telemetry Logs",
    category: "Security",
    description: "Implement AES-256-CBC with PBKDF2 salt to encrypt sensitive IoT sensor database dumps.",
    doneWhen: [
      "sensor_data.json sample data created",
      "OpenSSL AES-256-CBC encryption script tested (sensor_data.enc)",
      "Decryption verification script tested",
      "Key management and rotation policies documented"
    ]
  },
  {
    id: 10,
    title: "Phase 10 — Firmware Signing & Secure Boot Simulation",
    category: "Security",
    description: "Implement RSA-3072 firmware signature generation and bootloader verification logic to prevent unauthorized code execution.",
    doneWhen: [
      "Firmware binary sample firmware_v1.bin created",
      "RSA-3072 key pair generated (firmware_private.key / public.key)",
      "openssl dgst -sha256 signature generated (firmware.sig)",
      "Signature verification succeeds on authentic binary",
      "Signature verification fails when binary bytes are tampered",
      "Secure boot workflow documented"
    ]
  },
  {
    id: 11,
    title: "Phase 11 — Wireshark Encrypted Traffic Verification",
    category: "Testing",
    description: "Perform side-by-side packet inspection comparing TCP 1883 plaintext vs TCP 8883 TLS encrypted frames.",
    doneWhen: [
      "TCP 1883 capture demonstrating visible JSON payload",
      "TCP 8883 capture demonstrating Application Data encryption",
      "documentation/encryption-strategy.md created with screenshots"
    ]
  },
  {
    id: 12,
    title: "Phase 12 — Suricata Intrusion Detection (IDS)",
    category: "Monitoring",
    description: "Deploy Suricata IDS on the gateway/server VLAN to capture Nmap port scans and anomalous traffic.",
    doneWhen: [
      "Suricata service active on gateway/server node",
      "EVE JSON log output stream operational (/var/log/suricata/eve.json)",
      "Controlled Nmap SYN scan triggers Suricata alert",
      "Alert evidence captured"
    ]
  },
  {
    id: 13,
    title: "Phase 13 — Wazuh SIEM Centralization",
    category: "Monitoring",
    description: "Connect Suricata IDS eve.json, Mosquitto logs, and Linux auth logs into a centralized Wazuh SIEM dashboard.",
    doneWhen: [
      "Wazuh manager and indexer deployed",
      "Wazuh agent installed on MQTT & IoT nodes",
      "Suricata eve.json decoder integration active",
      "Suricata alerts visualized on Wazuh Security Events dashboard"
    ]
  },
  {
    id: 14,
    title: "Phase 14 — Wazuh File Integrity Monitoring (FIM)",
    category: "Monitoring",
    description: "Enable syscheck on /opt/iot/firmware/ directory to alert instantly on firmware or configuration tampering.",
    doneWhen: [
      "Wazuh FIM syscheck configured for /opt/iot/firmware/",
      "Modifying firmware file triggers Wazuh Severity 7+ alert",
      "FIM alert evidence recorded in test logs"
    ]
  },
  {
    id: 15,
    title: "Phase 15 — Security Attack & Validation Suite",
    category: "Testing",
    description: "Execute 8 controlled validation tests (T01 - T08) targeting network isolation, mTLS, ACLs, and IDS.",
    doneWhen: [
      "T01 Network Discovery test completed",
      "T02 IoT-to-Admin Segmentation test completed",
      "T03 Invalid mTLS Certificate test completed",
      "T04 MQTT ACL Violation test completed",
      "T05 TLS Encryption Traffic test completed",
      "T06 Port Scan IDS Alert test completed",
      "T07 Firmware Tamper Signature Failure test completed",
      "T08 Wazuh FIM File Tampering test completed"
    ]
  },
  {
    id: 16,
    title: "Phase 16 — Incident Response & Eradication Workflow",
    category: "Monitoring",
    description: "Simulate a compromised IoT device (IoT-001) and execute the 6-stage IR lifecycle: Detect, Investigate, Contain, Eradicate, Recover, Lessons Learned.",
    doneWhen: [
      "Incident triggered via anomalous scan alert",
      "pfSense quarantine firewall rule applied to block compromised IP",
      "Device firmware hash verified and untrusted binary purged",
      "Device certificate revoked and reissued",
      "Incident response report completed in documentation/monitoring-ir.md"
    ]
  }
];

export const SECURITY_TESTS = [
  { id: "T01", title: "Network Discovery", target: "192.168.30.101", command: "nmap -sV 192.168.30.101", expected: "Only intended MQTT port 8883 exposed", status: "PASS", evidence: "E06-nmap-baseline.png" },
  { id: "T02", title: "Segmentation Policy", target: "192.168.10.10 (Admin)", command: "ping -c 3 192.168.10.10", expected: "100% packet loss (Blocked by pfSense)", status: "PASS", evidence: "E03-pfsense-firewall-rules.png" },
  { id: "T03", title: "Invalid mTLS Certificate", target: "192.168.20.20:8883", command: "mosquitto_pub -h 192.168.20.20 -p 8883 --cafile ca.crt -m 'test'", expected: "Connection refused: TLS certificate required", status: "PASS", evidence: "E09-invalid-mtls.png" },
  { id: "T04", title: "MQTT ACL Violation", target: "home/admin/config", command: "mosquitto_pub -h 192.168.20.20 -p 8883 --cert iot-001.crt --key iot-001.key -t home/admin/config -m 'hack'", expected: "Publish denied by ACL rules", status: "PASS", evidence: "E10-mqtt-acl-denied.png" },
  { id: "T05", title: "TLS Payload Inspection", target: "Port 8883 Traffic", command: "tshark -i eth0 -f 'tcp port 8883' -V", expected: "Application Data encrypted (No plaintext JSON)", status: "PASS", evidence: "E12-wireshark-tls.png" },
  { id: "T06", title: "Port Scan Detection", target: "192.168.20.20", command: "nmap -sS 192.168.20.20", expected: "Suricata ET SCAN Nmap alert triggered in Wazuh", status: "PASS", evidence: "E15-suricata-alert.png" },
  { id: "T07", title: "Firmware Tampering Verification", target: "firmware_v1.bin", command: "openssl dgst -sha256 -verify firmware_public.key -signature firmware.sig firmware_v1.bin", expected: "Verification Failure when binary edited", status: "PASS", evidence: "E14-firmware-invalid-signature.png" },
  { id: "T08", title: "File Integrity Monitoring (FIM)", target: "/opt/iot/firmware/", command: "echo 'modified' >> /opt/iot/firmware/config.json", expected: "Wazuh syscheck FIM alert Level 7 triggered", status: "PASS", evidence: "E17-wazuh-fim.png" }
];

export const INCIDENT_STEPS = [
  { step: "1. Detection", action: "Suricata detects abnormal scanning from IoT-001 (192.168.30.101). Wazuh generates Level 10 alert.", status: "Triggered" },
  { step: "2. Investigation", action: "SOC analyst extracts device IP, MAC, TLS serial number, and timestamp log correlation.", status: "Analyzed" },
  { step: "3. Containment", action: "pfSense firewall quarantine rule applied: IoT-001 isolated into drop-all network rule.", status: "Isolated" },
  { step: "4. Eradication", action: "Verify firmware hash, purge modified scripts, revoke compromised client certificate iot-001.crt.", status: "Cleansed" },
  { step: "5. Recovery", action: "Flash authentic signed firmware v1.0.2, issue new client cert, restore MQTT port 8883 access.", status: "Restored" },
  { step: "6. Lessons Learned", action: "Document root cause in documentation/monitoring-ir.md and update IDS rules.", status: "Completed" }
];

export const TOOLS_REFERENCE = [
  { tool: "Antigravity", role: "Project workspace, code, documentation & orchestration", icon: "Sparkles" },
  { tool: "VMware Workstation 17 Pro", role: "Virtual virtualization host platform", icon: "Box" },
  { tool: "pfSense", role: "Stateful firewall, gateway router & VLAN segmentation", icon: "Shield" },
  { tool: "Mosquitto", role: "Lightweight MQTT v5 / TLS message broker", icon: "Radio" },
  { tool: "OpenSSL", role: "PKI, Root CA, RSA-4096 certs & firmware RSA-3072 signing", icon: "Key" },
  { tool: "Kali Linux", role: "Authorized penetration testing & port scanning machine", icon: "Terminal" },
  { tool: "Wireshark", role: "Packet analyzer for PCAP mTLS verification", icon: "Search" },
  { tool: "Suricata", role: "Network Intrusion Detection System (IDS)", icon: "Eye" },
  { tool: "Wazuh", role: "Centralized SIEM, log analytics & FIM monitoring", icon: "Activity" }
];

export const NIST_REFERENCES = [
  { code: "NISTIR 8259A", title: "IoT Cybersecurity Capability Core Baseline", desc: "Covers device identification, data protection, logical access, software updates, and security state awareness." },
  { code: "NIST SP 800-52 Rev. 2", title: "Guidelines for TLS Implementations", desc: "Mandates TLS 1.3/1.2 strong cipher suites and client certificate validation for IoT mTLS." },
  { code: "ETSI EN 303 645", title: "Cyber Security for Consumer IoT", desc: "Prohibits default universal passwords, requires vulnerability reporting & secure update mechanisms." },
  { code: "OWASP IoT Top 10", title: "IoT Security Vulnerabilities Standard", desc: "Focuses on weak passwords, insecure network services, insecure ecosystem interfaces & lack of update mechanisms." }
];
