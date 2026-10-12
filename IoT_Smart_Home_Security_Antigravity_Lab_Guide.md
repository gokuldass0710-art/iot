# IoT Smart Home Security Project — Antigravity Lab Guide

## 1. Purpose of this file

This file is the master guide for the **Securing Internet of Things (IoT) Devices in Smart Home Environments** project.

Use this Markdown file inside **Google Antigravity** as the project workspace guide.

### Important separation of responsibilities

- **Antigravity** = project workspace, source code, configuration files, documentation, diagrams, checklists, and development assistance.
- **VMware Workstation 17 Pro** = actual virtual laboratory where the IoT security environment runs.
- **Kali Linux** = authorized security testing machine.
- **pfSense** = firewall, router, and network segmentation gateway.
- **Ubuntu** = MQTT broker and IoT simulation.
- **Suricata** = network intrusion detection.
- **Wazuh** = centralized monitoring/SIEM.
- **OpenSSL** = PKI, certificates, TLS/mTLS, and signing demonstrations.

Do not confuse the Markdown project workspace with the virtual security lab.

---

# 2. Project objective

Build a controlled virtual smart-home environment and demonstrate that IoT devices can be:

1. Identified
2. Authenticated
3. Authorized
4. Isolated from critical networks
5. Protected with encrypted communication
6. Protected against unauthorized firmware changes
7. Monitored for suspicious activity
8. Investigated and contained when an incident occurs

The project lifecycle is:

```text
ASSESS
  ↓
DESIGN
  ↓
BUILD
  ↓
SECURE
  ↓
ATTACK / TEST
  ↓
DETECT
  ↓
RESPOND
  ↓
RETEST
  ↓
DOCUMENT
```

---

# 3. Important scope decision

This is a **software-defined IoT security laboratory**.

The project does **not** require manufacturing a physical IoT device.

IoT devices will initially be simulated with Python programs.

Example:

```text
Python program
      ↓
Temperature Sensor
      ↓
MQTT
      ↓
MQTT Broker
```

Optional physical hardware such as Raspberry Pi can be added later.

---

# 4. Final virtual lab

## Architecture

```text
                         INTERNET
                            |
                      +-----+-----+
                      |  pfSense  |
                      | Firewall  |
                      |  Router   |
                      +-----+-----+
                            |
       +--------------------+--------------------+
       |                    |                    |
       ▼                    ▼                    ▼
   ADMIN VLAN           SERVER VLAN            IoT VLAN
   192.168.10.0/24      192.168.20.0/24       192.168.30.0/24
       |                    |                    |
      Kali            +-----+------+      +------+------+
                      |            |      |      |      |
                 MQTT Broker     Wazuh  IoT-01 IoT-02 IoT-03
                 Mosquitto       SIEM
                      |
                   TLS/mTLS
                      |
                   Suricata
```

---

# 5. VM plan

| VM | Purpose | Suggested IP |
|---|---|---|
| pfSense | Firewall/router | 192.168.x.1 per interface |
| Kali Linux | Security testing | 192.168.10.10 |
| Ubuntu MQTT | Mosquitto broker | 192.168.20.20 |
| Ubuntu IoT | Simulated IoT devices | 192.168.30.101+ |
| Ubuntu Wazuh | SIEM/monitoring | 192.168.20.30 |

Resource requirements may vary according to the host computer.

---

# 6. Suggested Antigravity project structure

Create this folder:

```text
IoT-Security-Project/
│
├── README.md
├── LAB-SIMULATION.md
├── PROJECT-STATUS.md
├── architecture/
│   ├── network-diagram.drawio
│   ├── network-diagram.png
│   ├── data-flow.drawio
│   └── threat-model.drawio
│
├── iot-devices/
│   ├── temperature_sensor.py
│   ├── motion_sensor.py
│   ├── door_sensor.py
│   ├── requirements.txt
│   └── README.md
│
├── mqtt/
│   ├── mosquitto.conf
│   ├── acl
│   └── README.md
│
├── pki/
│   ├── README.md
│   ├── ca/
│   ├── server/
│   └── clients/
│
├── encryption/
│   ├── README.md
│   └── examples/
│
├── firmware/
│   ├── README.md
│   ├── sample/
│   └── signatures/
│
├── suricata/
│   ├── README.md
│   └── rules/
│
├── wazuh/
│   ├── README.md
│   ├── rules/
│   └── decoders/
│
├── tests/
│   ├── T01-network-discovery/
│   ├── T02-segmentation/
│   ├── T03-mtls/
│   ├── T04-mqtt-acl/
│   ├── T05-tls/
│   ├── T06-suricata/
│   ├── T07-firmware/
│   └── T08-fim/
│
├── evidence/
│   ├── screenshots/
│   ├── packet-captures/
│   ├── logs/
│   └── test-results/
│
└── documentation/
    ├── current-state-assessment.md
    ├── threat-model.md
    ├── architecture-design.md
    ├── authentication-authorization.md
    ├── encryption-strategy.md
    ├── network-security.md
    ├── firmware-security.md
    ├── monitoring-ir.md
    ├── compliance.md
    └── final-results.md
```

---

# 7. Network plan

## Admin

```text
Network: 192.168.10.0/24
Gateway: 192.168.10.1
Kali:    192.168.10.10
```

## Server

```text
Network: 192.168.20.0/24
Gateway: 192.168.20.1

MQTT:    192.168.20.20
Wazuh:   192.168.20.30
```

## IoT

```text
Network: 192.168.30.0/24
Gateway: 192.168.30.1

IoT-01:  192.168.30.101
IoT-02:  192.168.30.102
IoT-03:  192.168.30.103
```

---

# 8. Firewall policy

The initial security policy should follow least privilege.

| Source | Destination | Required access | Result |
|---|---|---|---|
| Admin | Server | Management | Allow |
| Admin | IoT | Testing/management | Allow |
| IoT | MQTT | MQTT over TLS | Allow |
| IoT | Admin | Any | Deny |
| Guest | IoT | Any | Deny |
| Guest | Admin | Any | Deny |
| IoT | Internet | Only required services | Restrict |

Document every rule and its reason.

---

# 9. Implementation phases

## Phase 0 — Project initialization

### Tasks

- Create the Antigravity project folder.
- Add this file as `LAB-SIMULATION.md`.
- Create `PROJECT-STATUS.md`.
- Create the directory structure.
- Create the initial README.
- Create the architecture diagram.

### Done when

```text
[ ] Project folder created
[ ] LAB-SIMULATION.md added
[ ] README.md created
[ ] Folder structure created
[ ] Initial architecture diagram created
```

---

# Phase 1 — VMware laboratory

## Objective

Build the virtual networking foundation.

### Tasks

- Create/verify VMware custom networks.
- Install pfSense.
- Connect pfSense interfaces to the correct virtual networks.
- Configure management access.
- Verify routing.

### Verification

On Linux:

```bash
ip addr
ip route
```

Test the expected gateway:

```bash
ping -c 4 <gateway>
```

### Evidence

Save:

```text
evidence/screenshots/
├── vmware-network.png
├── pfsense-dashboard.png
└── ip-addresses.png
```

### Done when

```text
[ ] pfSense boots
[ ] Admin network works
[ ] Server network works
[ ] IoT network works
[ ] Expected gateways respond
```

---

# Phase 2 — pfSense segmentation

## Objective

Separate Administration, Server, and IoT traffic.

### Tasks

- Configure interfaces/VLANs as appropriate for the VMware design.
- Assign IP addresses.
- Configure DHCP where appropriate.
- Create firewall rules.
- Enable firewall logging.

### Required result

```text
IoT → MQTT = ALLOW
IoT → Admin = BLOCK
Guest → IoT = BLOCK
Admin → IoT = ALLOW where required
```

### Testing

From Kali:

```bash
nmap -sV <authorized-lab-target>
```

Do not scan external systems.

### Evidence

```text
evidence/screenshots/
├── vlan-configuration.png
├── firewall-rules.png
└── firewall-logs.png
```

---

# Phase 3 — MQTT broker

## Objective

Create the smart-home message broker.

### Tool

Mosquitto

### Ubuntu installation

```bash
sudo apt update
sudo apt install -y mosquitto mosquitto-clients
sudo systemctl enable --now mosquitto
```

Verify:

```bash
systemctl status mosquitto
```

### Basic test

Subscriber:

```bash
mosquitto_sub -h 127.0.0.1 -t test/topic
```

Publisher:

```bash
mosquitto_pub -h 127.0.0.1 -t test/topic -m "Hello IoT"
```

### Done when

```text
[ ] Broker running
[ ] Publish works
[ ] Subscribe works
[ ] Logs available
```

---

# Phase 4 — IoT simulation

## Objective

Create software-based IoT devices.

### Devices

```text
IoT-001 = Temperature Sensor
IoT-002 = Motion Sensor
IoT-003 = Door Sensor
```

### Topics

```text
home/livingroom/temperature
home/livingroom/motion
home/frontdoor/status
```

### Example message

```json
{
  "device_id": "iot-001",
  "temperature": 28.4,
  "timestamp": "LAB-TIME"
}
```

### Python requirements

Use:

- Python 3
- Paho MQTT

### First goal

Create the temperature sensor before creating the other two.

### Done when

```text
[ ] temperature_sensor.py works
[ ] MQTT message reaches broker
[ ] motion_sensor.py works
[ ] door_sensor.py works
```

---

# Phase 5 — Baseline security assessment

## Objective

Measure the environment before applying all security controls.

### Testing tools

- Kali
- Nmap
- Wireshark

### Nmap

```bash
nmap -sV <authorized-IoT-lab-target>
```

Record:

- Open ports
- Services
- Versions
- Unexpected exposure

### Wireshark

Capture MQTT traffic.

Useful filters:

```text
mqtt
```

```text
tcp.port == 1883
```

### Deliverable

Create:

```text
documentation/current-state-assessment.md
```

Include:

- Finding
- Evidence
- Risk reasoning
- Recommendation

---

# Phase 6 — PKI and TLS

## Objective

Protect MQTT communication and establish device identity.

### Learn

```text
CA
Private key
Public key
CSR
Server certificate
Client certificate
Certificate validation
TLS
Mutual TLS
```

### Lab CA

Use OpenSSL.

Example:

```bash
openssl genrsa -out ca.key 4096
```

Create the CA certificate:

```bash
openssl req -x509 -new -nodes \
  -key ca.key \
  -sha256 \
  -days 3650 \
  -out ca.crt
```

Create individual certificates for:

```text
MQTT server
IoT-001
IoT-002
IoT-003
```

### Security rule

Never reuse one IoT private key for every device.

Do not commit private keys to GitHub.

### Done when

```text
[ ] Lab CA created
[ ] Server certificate created
[ ] IoT certificates created
[ ] Certificate verification understood
```

---

# Phase 7 — MQTT over TLS and mutual TLS

## Objective

Require trusted devices to authenticate to the broker.

Use the Mosquitto configuration appropriate to the installed version.

Conceptual configuration:

```text
listener 8883
cafile <CA certificate>
certfile <server certificate>
keyfile <server private key>
require_certificate true
use_identity_as_username true
```

### Tests

#### Test A — Valid device

```text
IoT-001
   ↓
Trusted certificate
   ↓
MQTT Broker
   ↓
Allowed
```

#### Test B — Invalid/untrusted client

```text
Unknown client
   ↓
Invalid certificate
   ↓
MQTT Broker
   ↓
Rejected
```

### Evidence

```text
evidence/screenshots/
├── valid-mtls.png
└── invalid-mtls.png
```

---

# Phase 8 — MQTT authorization / RBAC

## Objective

Allow devices to perform only the actions they need.

### Example

IoT-001:

```text
ALLOW write home/livingroom/temperature
DENY  write home/admin/config
```

IoT-002:

```text
ALLOW write home/livingroom/motion
```

IoT-003:

```text
ALLOW write home/frontdoor/status
```

Admin:

```text
ALLOW required read/write operations
```

### Test both

```text
AUTHORIZED
```

and:

```text
ACCESS DENIED
```

### Deliverable

```text
documentation/authentication-authorization.md
```

---

# Phase 9 — Encryption at rest

## Objective

Protect stored sensitive IoT data.

Create:

```text
sensor_data.json
```

For a simple lab demonstration:

```bash
openssl enc -aes-256-cbc \
  -salt \
  -pbkdf2 \
  -in sensor_data.json \
  -out sensor_data.enc
```

Decrypt for verification:

```bash
openssl enc -d -aes-256-cbc \
  -pbkdf2 \
  -in sensor_data.enc \
  -out sensor_data_decrypted.json
```

### Report

Explain:

- Algorithm
- Key handling
- Access restriction
- Rotation/management considerations
- Why the lab is only a demonstration

---

# Phase 10 — Firmware integrity

## Objective

Demonstrate that unauthorized firmware modification is detected.

### Workflow

```text
Firmware
   ↓
Hash/sign
   ↓
Signed firmware
   ↓
Verification
```

Create a sample file:

```text
firmware_v1.bin
```

Hash:

```bash
sha256sum firmware_v1.bin
```

Create signing key pair:

```bash
openssl genrsa -out firmware_private.key 3072
openssl rsa -in firmware_private.key \
  -pubout -out firmware_public.key
```

Sign:

```bash
openssl dgst -sha256 \
  -sign firmware_private.key \
  -out firmware.sig \
  firmware_v1.bin
```

Verify:

```bash
openssl dgst -sha256 \
  -verify firmware_public.key \
  -signature firmware.sig \
  firmware_v1.bin
```

Modify the firmware and verify again.

Expected:

```text
Original → verification succeeds
Modified → verification fails
```

### Secure Boot

Document a secure-boot control flow:

```text
Power On
  ↓
Bootloader
  ↓
Verify trusted firmware
  ↓
Valid?
 /   \
Yes   No
 |     |
Boot  Reject
```

Do not claim that a file-signing demonstration is the same as a hardware root of trust.

---

# Phase 11 — Wireshark verification

## Objective

Prove the effect of TLS.

Capture:

### Before

```text
MQTT
TCP 1883
```

### After

```text
MQTT over TLS
TCP 8883
```

Useful filters:

```text
mqtt
```

```text
tcp.port == 1883
```

```text
tcp.port == 8883
```

```text
tls
```

### Deliverable

Create:

```text
documentation/encryption-strategy.md
```

Include before/after screenshots.

---

# Phase 12 — Suricata IDS

## Objective

Detect suspicious network behavior.

Install Suricata according to its official documentation for the lab OS.

Verify:

```bash
systemctl status suricata
```

Inspect EVE JSON:

```bash
sudo tail -f /var/log/suricata/eve.json
```

Generate only controlled lab traffic.

### Example test

From Kali:

```bash
nmap -sS <authorized-lab-target>
```

Expected flow:

```text
Kali
 ↓
Scan
 ↓
Suricata
 ↓
Alert
```

---

# Phase 13 — Wazuh

## Objective

Centralize security events.

### Monitor

- Suricata events
- Linux logs
- MQTT logs
- Authentication failures
- Firmware file changes
- Configuration changes

Deploy Wazuh using the official documentation appropriate to the lab.

### Architecture

```text
Logs / Events
     ↓
Wazuh
     ↓
Indexer
     ↓
Dashboard
```

### Suricata integration

```text
Suricata
    ↓
eve.json
    ↓
Wazuh collection
    ↓
Wazuh alert
    ↓
Dashboard
```

---

# Phase 14 — Wazuh File Integrity Monitoring

## Objective

Detect modification of sensitive files.

Monitor a directory such as:

```text
/opt/iot/firmware/
```

Test by changing a monitored file.

Expected:

```text
File modified
     ↓
Wazuh FIM
     ↓
Alert
```

This connects:

```text
Firmware Security
        +
SOC Monitoring
```

---

# Phase 15 — Attack and validation tests

All tests must target only the authorized lab.

## T01 — Network discovery

```bash
nmap -sV <authorized-target>
```

Expected:

```text
Only intended services exposed
```

---

## T02 — IoT to Admin network

Attempt an authorized connectivity test.

Expected:

```text
Blocked
```

---

## T03 — Invalid certificate

Try a device/client without a trusted certificate.

Expected:

```text
mTLS authentication rejected
```

---

## T04 — MQTT ACL violation

IoT-001 tries to publish to:

```text
home/admin/config
```

Expected:

```text
Access denied
```

---

## T05 — TLS traffic

Compare port 1883 and port 8883 behavior.

Expected:

```text
TLS traffic does not expose the same plaintext MQTT payload
```

---

## T06 — Port scan detection

Generate a controlled scan from Kali.

Expected:

```text
Suricata alert
Wazuh event
```

---

## T07 — Firmware tampering

Modify a signed firmware file.

Expected:

```text
Signature verification failure
```

---

## T08 — FIM

Modify a monitored firmware/configuration file.

Expected:

```text
Wazuh FIM alert
```

---

# Phase 16 — Incident response

## Scenario

Assume IoT-001 is compromised.

### Detection

```text
Suricata / Wazuh
       ↓
Alert
```

### Investigation

Collect:

```text
Device ID
IP
Time
Source
Destination
Event
```

### Containment

Use a firewall/quarantine rule to restrict the device.

### Eradication

- Validate firmware
- Remove unauthorized changes
- Revoke credentials/certificate if appropriate
- Correct the root cause

### Recovery

- Restore trusted firmware
- Reconfigure device
- Restore required network access
- Monitor closely

### Lessons learned

Document:

- Initial weakness
- Detection source
- Response
- Root cause
- Improvement

---

# 17. Test result template

Use this table for every test.

| Test ID | Test | Expected result | Actual result | Evidence |
|---|---|---|---|---|
| T01 | Network discovery | Expected services only | | |
| T02 | Segmentation | IoT → Admin blocked | | |
| T03 | Invalid mTLS | Rejected | | |
| T04 | MQTT ACL | Unauthorized topic denied | | |
| T05 | TLS | Traffic protected | | |
| T06 | Port scan | IDS alert | | |
| T07 | Firmware tamper | Verification fails | | |
| T08 | FIM | File modification detected | | |

---

# 18. Evidence naming convention

Use clear filenames.

```text
E01-vmware-topology.png
E02-pfsense-interfaces.png
E03-pfsense-firewall-rules.png
E04-mqtt-working.png
E05-iot-temperature.png
E06-nmap-baseline.png
E07-ca-certificate.png
E08-valid-mtls.png
E09-invalid-mtls.png
E10-mqtt-acl-denied.png
E11-wireshark-plaintext.png
E12-wireshark-tls.png
E13-firmware-valid-signature.png
E14-firmware-invalid-signature.png
E15-suricata-alert.png
E16-wazuh-alert.png
E17-wazuh-fim.png
E18-incident-response.png
```

---

# 19. Project status file

Maintain `PROJECT-STATUS.md`.

Use:

```markdown
# Project Status

## Infrastructure
- [ ] VMware networks
- [ ] pfSense
- [ ] Admin network
- [ ] Server network
- [ ] IoT network

## IoT
- [ ] MQTT broker
- [ ] Temperature sensor
- [ ] Motion sensor
- [ ] Door sensor

## Security
- [ ] Firewall segmentation
- [ ] PKI
- [ ] TLS
- [ ] Mutual TLS
- [ ] MQTT ACL/RBAC
- [ ] Encryption at rest
- [ ] Firmware signing

## Monitoring
- [ ] Suricata
- [ ] Wazuh
- [ ] Suricata → Wazuh
- [ ] File Integrity Monitoring

## Testing
- [ ] Network discovery
- [ ] Segmentation
- [ ] Invalid certificate
- [ ] ACL violation
- [ ] TLS
- [ ] IDS
- [ ] Firmware tampering
- [ ] FIM

## Documentation
- [ ] Architecture
- [ ] Threat model
- [ ] Assessment
- [ ] Authentication
- [ ] Encryption
- [ ] Network security
- [ ] Firmware security
- [ ] Monitoring
- [ ] Incident response
- [ ] Final results
```

---

# 20. Antigravity operating rules

When using Antigravity for this project:

## Do

- Explain the purpose of every file before creating it.
- Keep configuration files reproducible.
- Create backups before modifying important configuration.
- Use the lab IP plan from this document unless there is a documented reason to change it.
- Keep secrets and private keys out of Git.
- Keep test evidence in the `evidence/` directory.
- Update `PROJECT-STATUS.md` after each completed phase.
- Document commands used and their results.
- Prefer official documentation when resolving version-specific configuration problems.

## Do not

- Scan systems outside the lab.
- Attack public websites.
- Commit private keys, passwords, tokens, or secrets.
- Delete or overwrite the whole project without a backup.
- Claim a security control is implemented without test evidence.
- Claim hardware Secure Boot when only a software signature simulation was performed.
- Claim regulatory compliance merely because some controls were implemented.

---

# 21. Antigravity task format

When asking Antigravity to implement a task, use this pattern:

```text
TASK:
[What needs to be implemented]

CONTEXT:
[Which VM/network/component is involved]

GOAL:
[Expected final state]

CONSTRAINTS:
[Do not change unrelated components]

VALIDATION:
[How to prove it works]

EVIDENCE:
[What screenshot/log/config should be saved]

DOCUMENTATION:
[Which .md file should be updated]
```

## Example

```text
TASK:
Configure the first simulated temperature sensor.

CONTEXT:
Ubuntu IoT simulator communicates with the Mosquitto broker.

GOAL:
Publish a JSON temperature reading every 5 seconds.

CONSTRAINTS:
Do not configure TLS yet. This is the initial baseline phase.

VALIDATION:
The MQTT broker must receive messages on:
home/livingroom/temperature

EVIDENCE:
Save the terminal output and MQTT subscriber result.

DOCUMENTATION:
Update iot-devices/README.md and PROJECT-STATUS.md.
```

---

# 22. Antigravity development sequence

Do not ask the agent to create the entire project at once.

Use this sequence:

```text
TASK 01
Create project folders
       ↓
TASK 02
Create architecture documentation
       ↓
TASK 03
Create temperature sensor
       ↓
TASK 04
Create motion sensor
       ↓
TASK 05
Create door sensor
       ↓
TASK 06
Create MQTT configuration
       ↓
TASK 07
Create PKI scripts/configuration
       ↓
TASK 08
Configure TLS/mTLS
       ↓
TASK 09
Create MQTT ACL
       ↓
TASK 10
Create firmware signing demonstration
       ↓
TASK 11
Create testing scripts/documentation
       ↓
TASK 12
Create evidence/report structure
```

The actual network infrastructure remains in VMware.

---

# 23. Definition of done

The project is complete when:

```text
[ ] Virtual smart-home lab works
[ ] IoT devices generate data
[ ] MQTT broker works
[ ] IoT network is segmented
[ ] Firewall rules enforce least privilege
[ ] Device certificates work
[ ] Mutual TLS works
[ ] MQTT authorization works
[ ] Data in transit is protected
[ ] Data at rest is protected
[ ] Firmware integrity is tested
[ ] Suricata detects test activity
[ ] Wazuh receives important events
[ ] FIM detects file changes
[ ] Controlled attacks are tested
[ ] Incident response is documented
[ ] All evidence is collected
[ ] Final report is complete
[ ] Final presentation is ready
```

---

# 24. Final project story

The final project should tell this story:

```text
INSECURE SMART HOME
        ↓
Security Assessment
        ↓
Threat Model
        ↓
Network Segmentation
        ↓
Device Identity
        ↓
Mutual TLS
        ↓
Authorization
        ↓
Encryption
        ↓
Firmware Integrity
        ↓
IDS + SIEM
        ↓
Controlled Attack
        ↓
Detection
        ↓
Incident Response
        ↓
RETEST
        ↓
SECURE SMART HOME
```

---

# 25. First task to execute

Do not start with Wazuh, Suricata, TLS, or firmware.

Start with:

```text
1. Open Antigravity
2. Create IoT-Security-Project
3. Add this file as LAB-SIMULATION.md
4. Create the project folders
5. Create PROJECT-STATUS.md
6. Open VMware
7. Prepare the pfSense VM
8. Build the Admin / Server / IoT network foundation
```

Only after the network foundation works should you move to MQTT.

---

# 26. Core tools reference

| Tool | Role |
|---|---|
| Antigravity | Project workspace / coding / documentation |
| VMware Workstation | Virtual lab platform |
| pfSense | Router / firewall / segmentation |
| Ubuntu | Server and IoT simulation OS |
| Python | IoT device simulation |
| Mosquitto | MQTT broker |
| OpenSSL | PKI / TLS / signing |
| Kali Linux | Authorized security testing |
| Wireshark | Packet analysis |
| Suricata | Network IDS |
| Wazuh | SIEM / monitoring / FIM |
| Git | Version control |
| draw.io | Architecture diagrams |

---

# 27. Primary references

Use official documentation wherever possible:

- NISTIR 8259A — IoT Device Cybersecurity Capability Core Baseline
- NISTIR 8259 Revision 1 — Foundational Cybersecurity Activities for IoT Product Manufacturers
- NIST SP 800-52 Rev. 2 — Guidelines for TLS
- Netgate/pfSense documentation
- Eclipse Mosquitto documentation
- Eclipse Paho MQTT documentation
- OpenSSL documentation
- Suricata documentation
- Wazuh documentation
- ETSI EN 303 645
- OWASP IoT Security Testing Guide / IoTGoat

---

# 28. Key rule for this project

Always maintain this distinction:

```text
ANTIGRAVITY
= Build and manage the project files

VMWARE
= Run the security laboratory

KALI
= Perform authorized security testing

WAZUH + SURICATA
= Detect and investigate activity
```

The Markdown file is the **master project guide** connecting all four.
