import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Float, MeshDistortMaterial, Sphere, Box, Torus, Environment, Stars } from '@react-three/drei'

// Animated 3D Sphere
function AnimatedSphere({ position, color, scale = 1 }) {
  const meshRef = useRef()

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005
    }
  })

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere ref={meshRef} position={position} args={[scale, 32, 32]}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.4}
          speed={3}
          roughness={0.2}
          metalness={0.9}
          emissive={color}
          emissiveIntensity={0.3}
        />
      </Sphere>
    </Float>
  )
}

// Animated Torus (Represents Network Rings)
function AnimatedTorus({ position, color }) {
  const meshRef = useRef()

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01
      meshRef.current.rotation.y += 0.008
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1.5}>
      <Torus ref={meshRef} position={position} args={[1.2, 0.3, 16, 32]}>
        <MeshDistortMaterial
          color={color}
          distort={0.2}
          speed={2}
          roughness={0.1}
          metalness={0.8}
        />
      </Torus>
    </Float>
  )
}

// 3D Scene Component
function CNScene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#10b981" />
      <pointLight position={[-10, -10, -10]} intensity={0.8} color="#3b82f6" />
      <spotLight position={[0, 15, 0]} angle={0.3} penumbra={1} intensity={2} color="#10b981" />
      <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
      <Environment preset="night" />
      <AnimatedSphere position={[0, 2, 0]} color="#10b981" scale={1.5} />
      <AnimatedSphere position={[-3, -1, 0]} color="#3b82f6" scale={1} />
      <AnimatedSphere position={[3, -1, 0]} color="#06b6d4" scale={1} />
      <AnimatedTorus position={[-5, 0, -3]} color="#14b8a6" />
      <AnimatedTorus position={[5, 0, -3]} color="#0ea5e9" />
      <AnimatedTorus position={[0, 4, -2]} color="#22d3ee" />
      <Float speed={2} rotationIntensity={1} floatIntensity={3}>
        <Box position={[-4, 3, -2]} args={[0.8, 0.8, 0.8]}>
          <meshStandardMaterial color="#10b981" metalness={0.9} roughness={0.1} />
        </Box>
      </Float>
      <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
        <Box position={[4, 3, -2]} args={[0.8, 0.8, 0.8]}>
          <meshStandardMaterial color="#06b6d4" metalness={0.9} roughness={0.1} />
        </Box>
      </Float>
      <OrbitControls
        enableZoom={true}
        enablePan={true}
        minDistance={8}
        maxDistance={20}
        autoRotate
        autoRotateSpeed={0.4}
      />
    </>
  )
}

// Main CN Page Component
function CN() {
  const navigate = useNavigate()
  const [expandedPractical, setExpandedPractical] = useState(null)

  const courseInfo = {
    code: 'BC03001031',
    name: 'Computer Networking',
    semester: 3,
    credits: 4,
    totalMarks: 150
  }

  const marksBreakdown = [
    { label: 'Theory (ESE)', marks: 70, color: 'from-green-500 to-emerald-500' },
    { label: 'Mid Term (PA/CA)', marks: 30, color: 'from-blue-500 to-cyan-500' },
    { label: 'Internal (PA/CA)', marks: 20, color: 'from-purple-500 to-pink-500' },
    { label: 'Viva (ESE)', marks: 30, color: 'from-teal-500 to-cyan-500' }
  ]

  const practicals = [
    {
      id: 1,
      title: 'IT/Network Infrastructure Awareness',
      objective: 'Make the students aware about the IT/Network infrastructure of their parent institute.',
      theory: 'Understanding the physical and logical layout of network infrastructure is crucial for network administration. This includes servers, switches, routers, cables, access points, and network topology.',
      steps: [
        'Visit the institute\'s server room or IT department',
        'Identify various networking devices (routers, switches, servers)',
        'Understand the network topology used in the institute',
        'Document the types of cables and connections used',
        'Learn about the internet service provider and bandwidth',
        'Understand the security measures implemented'
      ],
      commands: [],
      output: 'Documentation report including:\n- Network topology diagram\n- List of networking devices with their specifications\n- Types of cables and media used\n- Internet bandwidth and ISP details\n- Security measures (firewall, antivirus, access control)',
      learningOutcome: 'Understanding of real-world network infrastructure and its components'
    },
    {
      id: 2,
      title: 'Basic Network Commands',
      objective: 'Study the basic network commands and Network configuration commands.',
      theory: 'Network commands are essential tools for network troubleshooting, configuration, and monitoring. They help diagnose connectivity issues and understand network status.',
      steps: [
        'Open Command Prompt (Windows) or Terminal (Linux)',
        'Learn and execute basic network commands',
        'Understand the output of each command',
        'Document the purpose and usage of each command'
      ],
      commands: [
        { cmd: 'ipconfig', desc: 'Display IP configuration (Windows)' },
        { cmd: 'ipconfig /all', desc: 'Display detailed IP configuration' },
        { cmd: 'ifconfig', desc: 'Display IP configuration (Linux)' },
        { cmd: 'ping google.com', desc: 'Test connectivity to a host' },
        { cmd: 'tracert google.com', desc: 'Trace route to destination (Windows)' },
        { cmd: 'traceroute google.com', desc: 'Trace route to destination (Linux)' },
        { cmd: 'netstat -an', desc: 'Display all connections and listening ports' },
        { cmd: 'nslookup google.com', desc: 'Query DNS for domain information' },
        { cmd: 'arp -a', desc: 'Display ARP cache' },
        { cmd: 'route print', desc: 'Display routing table' }
      ],
      output: `Example Output:

ipconfig
-------------------
Ethernet adapter Ethernet:
   IPv4 Address. . . . . . : 192.168.1.100
   Subnet Mask . . . . . . : 255.255.255.0
   Default Gateway . . . . : 192.168.1.1

ping google.com
-------------------
Pinging google.com [142.250.192.46] with 32 bytes of data:
Reply from 142.250.192.46: bytes=32 time=14ms TTL=117
Reply from 142.250.192.46: bytes=32 time=13ms TTL=117
Ping statistics: Packets: Sent = 4, Received = 4, Lost = 0 (0% loss)`,
      learningOutcome: 'Ability to use basic network commands for troubleshooting and configuration'
    },
    {
      id: 3,
      title: 'Network Cable Implementation',
      objective: 'Study of different types of Network cables and practically implement the cross-wired cable and straight through cable using clamping tool.',
      theory: 'Network cables are the physical medium for data transmission. Straight-through cables connect different devices (PC to switch), while crossover cables connect similar devices (PC to PC, switch to switch).',
      steps: [
        'Identify different types of cables: UTP, STP, Coaxial, Fiber Optic',
        'Learn about RJ45 connector and pin configurations',
        'Understand T568A and T568B standards',
        'Practice crimping straight-through cable (T568B both ends)',
        'Practice crimping crossover cable (T568A one end, T568B other end)',
        'Test cables using cable tester'
      ],
      commands: [],
      output: `Straight-Through Cable (T568B both ends):
Pin 1: White-Orange → Pin 1: White-Orange
Pin 2: Orange → Pin 2: Orange
Pin 3: White-Green → Pin 3: White-Green
Pin 4: Blue → Pin 4: Blue
Pin 5: White-Blue → Pin 5: White-Blue
Pin 6: Green → Pin 6: Green
Pin 7: White-Brown → Pin 7: White-Brown
Pin 8: Brown → Pin 8: Brown

Crossover Cable:
End 1 (T568A)     →     End 2 (T568B)
Pin 1: White-Green → Pin 1: White-Orange
Pin 2: Green → Pin 2: Orange
Pin 3: White-Orange → Pin 3: White-Green
Pin 6: Orange → Pin 6: Green

Cable Tester: All lights should blink sequentially (1-8) for successful cable`,
      learningOutcome: 'Practical skills in cable crimping and understanding cable standards'
    },
    {
      id: 4,
      title: 'Initial Switch Configuration',
      objective: 'Performing an Initial Switch Configuration.',
      theory: 'Switches operate at Layer 2 of OSI model and forward frames based on MAC addresses. Initial configuration involves setting hostname, passwords, and basic security.',
      steps: [
        'Connect to switch using console cable',
        'Enter privileged EXEC mode',
        'Enter global configuration mode',
        'Configure hostname and passwords',
        'Configure management IP address',
        'Save configuration'
      ],
      commands: [
        { cmd: 'enable', desc: 'Enter privileged EXEC mode' },
        { cmd: 'configure terminal', desc: 'Enter global configuration mode' },
        { cmd: 'hostname Switch1', desc: 'Set hostname' },
        { cmd: 'enable secret cisco123', desc: 'Set encrypted enable password' },
        { cmd: 'line console 0', desc: 'Enter console line configuration' },
        { cmd: 'password console123', desc: 'Set console password' },
        { cmd: 'login', desc: 'Enable login' },
        { cmd: 'interface vlan 1', desc: 'Enter VLAN interface' },
        { cmd: 'ip address 192.168.1.10 255.255.255.0', desc: 'Set IP address' },
        { cmd: 'no shutdown', desc: 'Enable interface' },
        { cmd: 'exit', desc: 'Exit configuration mode' },
        { cmd: 'copy running-config startup-config', desc: 'Save configuration' }
      ],
      output: `Switch>enable
Switch#configure terminal
Switch(config)#hostname Switch1
Switch1(config)#enable secret cisco123
Switch1(config)#line console 0
Switch1(config-line)#password console123
Switch1(config-line)#login
Switch1(config-line)#exit
Switch1(config)#interface vlan 1
Switch1(config-if)#ip address 192.168.1.10 255.255.255.0
Switch1(config-if)#no shutdown
Switch1(config-if)#exit
Switch1(config)#exit
Switch1#copy running-config startup-config
[OK]`,
      learningOutcome: 'Understanding of basic switch configuration and management'
    },
    {
      id: 5,
      title: 'Initial Router Configuration',
      objective: 'Performing an Initial Router Configuration.',
      theory: 'Routers operate at Layer 3 of OSI model and route packets based on IP addresses. Configuration involves setting interfaces, routing protocols, and security.',
      steps: [
        'Connect to router using console cable',
        'Enter privileged EXEC mode',
        'Configure hostname and security',
        'Configure interfaces with IP addresses',
        'Enable routing protocols if needed',
        'Save configuration'
      ],
      commands: [
        { cmd: 'enable', desc: 'Enter privileged EXEC mode' },
        { cmd: 'configure terminal', desc: 'Enter global configuration mode' },
        { cmd: 'hostname Router1', desc: 'Set hostname' },
        { cmd: 'enable secret cisco123', desc: 'Set enable password' },
        { cmd: 'interface GigabitEthernet0/0', desc: 'Enter interface configuration' },
        { cmd: 'ip address 192.168.1.1 255.255.255.0', desc: 'Set IP address' },
        { cmd: 'no shutdown', desc: 'Enable interface' },
        { cmd: 'interface GigabitEthernet0/1', desc: 'Enter second interface' },
        { cmd: 'ip address 192.168.2.1 255.255.255.0', desc: 'Set IP address' },
        { cmd: 'no shutdown', desc: 'Enable interface' },
        { cmd: 'exit', desc: 'Exit configuration mode' },
        { cmd: 'copy running-config startup-config', desc: 'Save configuration' }
      ],
      output: `Router>enable
Router#configure terminal
Router(config)#hostname Router1
Router1(config)#enable secret cisco123
Router1(config)#interface GigabitEthernet0/0
Router1(config-if)#ip address 192.168.1.1 255.255.255.0
Router1(config-if)#no shutdown
%LINK-5-CHANGED: Interface GigabitEthernet0/0, changed state to up
Router1(config-if)#exit
Router1(config)#interface GigabitEthernet0/1
Router1(config-if)#ip address 192.168.2.1 255.255.255.0
Router1(config-if)#no shutdown
%LINK-5-CHANGED: Interface GigabitEthernet0/1, changed state to up
Router1(config-if)#exit
Router1(config)#exit
Router1#copy running-config startup-config
[OK]`,
      learningOutcome: 'Basic router configuration and interface management skills'
    },
    {
      id: 6,
      title: 'Configuring and Troubleshooting a Switched Network',
      objective: 'Configuring and Troubleshooting a Switched Network.',
      theory: 'Switched networks require proper VLAN configuration, port security, and troubleshooting skills to ensure efficient operation.',
      steps: [
        'Create and name VLANs',
        'Assign ports to VLANs',
        'Configure trunk ports',
        'Test connectivity between devices',
        'Troubleshoot common issues',
        'Verify configuration'
      ],
      commands: [
        { cmd: 'vlan 10', desc: 'Create VLAN 10' },
        { cmd: 'name Sales', desc: 'Name the VLAN' },
        { cmd: 'vlan 20', desc: 'Create VLAN 20' },
        { cmd: 'name Engineering', desc: 'Name the VLAN' },
        { cmd: 'interface FastEthernet0/1', desc: 'Enter interface config' },
        { cmd: 'switchport mode access', desc: 'Set as access port' },
        { cmd: 'switchport access vlan 10', desc: 'Assign to VLAN 10' },
        { cmd: 'interface FastEthernet0/24', desc: 'Enter trunk interface' },
        { cmd: 'switchport mode trunk', desc: 'Configure as trunk port' },
        { cmd: 'show vlan brief', desc: 'Display VLAN information' },
        { cmd: 'show interfaces trunk', desc: 'Display trunk information' }
      ],
      output: `Switch(config)#vlan 10
Switch(config-vlan)#name Sales
Switch(config-vlan)#vlan 20
Switch(config-vlan)#name Engineering
Switch(config-vlan)#exit
Switch(config)#interface FastEthernet0/1
Switch(config-if)#switchport mode access
Switch(config-if)#switchport access vlan 10
Switch(config-if)#exit

Switch#show vlan brief
VLAN Name                             Status    Ports
---- -------------------------------- --------- -------------------------------
1    default                          active    Fa0/2, Fa0/3, Fa0/4
10   Sales                            active    Fa0/1
20   Engineering                      active    Fa0/5, Fa0/6`,
      learningOutcome: 'VLAN configuration and switched network troubleshooting skills'
    },
    {
      id: 7,
      title: 'Connecting a Switch',
      objective: 'Connecting a Switch.',
      theory: 'Physical connectivity of switches involves understanding port types, cable selection, and proper connection procedures.',
      steps: [
        'Identify switch ports (access and trunk)',
        'Select appropriate cables',
        'Connect end devices to access ports',
        'Connect switches using trunk ports',
        'Verify link status LEDs',
        'Test connectivity using ping'
      ],
      commands: [
        { cmd: 'show interfaces status', desc: 'Display interface status' },
        { cmd: 'show mac address-table', desc: 'Display MAC address table' },
        { cmd: 'show cdp neighbors', desc: 'Display connected Cisco devices' }
      ],
      output: `Switch#show interfaces status
Port      Name               Status       Vlan       Duplex  Speed Type
Fa0/1     PC1                connected    10         a-full  a-100 10/100BaseTX
Fa0/2     PC2                connected    10         a-full  a-100 10/100BaseTX
Fa0/24    Trunk to SW2       connected    trunk      a-full  a-100 10/100BaseTX

Switch#show mac address-table
Mac Address Table
-------------------------------------------
Vlan    Mac Address       Type        Ports
----    -----------       --------    -----
10      0001.9641.2345    DYNAMIC     Fa0/1
10      0002.1634.5678    DYNAMIC     Fa0/2`,
      learningOutcome: 'Understanding of switch connectivity and verification commands'
    },
    {
      id: 8,
      title: 'Configuring WEP on a Wireless Router',
      objective: 'Configuring WEP on a Wireless Router.',
      theory: 'WEP (Wired Equivalent Privacy) is an older wireless security protocol. Though deprecated, understanding it helps learn wireless security evolution. Modern networks use WPA2/WPA3.',
      steps: [
        'Access wireless router web interface (usually 192.168.1.1)',
        'Navigate to wireless security settings',
        'Select WEP security mode',
        'Choose encryption level (64-bit or 128-bit)',
        'Enter WEP key (hexadecimal or ASCII)',
        'Apply and save settings',
        'Connect wireless device using WEP key'
      ],
      commands: [],
      output: `Router Web Interface Configuration:
-----------------------------------------
Wireless Security Settings:
Security Mode: WEP
Encryption: 128-bit
WEP Key Format: Hexadecimal
Key 1: 1234567890ABCDEF1234567890

Status after applying:
Wireless Security: Enabled (WEP)
Connected Clients: 2
Network Name (SSID): MyNetwork_WEP

Note: WEP is deprecated due to security vulnerabilities.
Recommended: Use WPA2-PSK or WPA3 instead.

Connection on Client Device:
Network: MyNetwork_WEP
Security: WEP
Password: 1234567890ABCDEF1234567890
Status: Connected`,
      learningOutcome: 'Understanding of wireless security protocols and their configuration'
    },
    {
      id: 9,
      title: 'Interpreting Ping and Traceroute Output',
      objective: 'Interpreting Ping and Traceroute Output.',
      theory: 'Ping uses ICMP Echo Request/Reply to test connectivity and measure latency. Traceroute shows the path packets take to reach destination.',
      steps: [
        'Use ping command to test connectivity',
        'Analyze ping statistics (packet loss, RTT)',
        'Use traceroute to trace packet path',
        'Analyze each hop in the route',
        'Identify network bottlenecks or failures'
      ],
      commands: [
        { cmd: 'ping 8.8.8.8', desc: 'Ping Google DNS' },
        { cmd: 'ping -t 8.8.8.8', desc: 'Continuous ping (Windows)' },
        { cmd: 'ping -c 10 8.8.8.8', desc: 'Ping 10 times (Linux)' },
        { cmd: 'tracert google.com', desc: 'Trace route (Windows)' },
        { cmd: 'traceroute google.com', desc: 'Trace route (Linux)' }
      ],
      output: `C:\\>ping 8.8.8.8

Pinging 8.8.8.8 with 32 bytes of data:
Reply from 8.8.8.8: bytes=32 time=14ms TTL=117
Reply from 8.8.8.8: bytes=32 time=13ms TTL=117
Reply from 8.8.8.8: bytes=32 time=15ms TTL=117
Reply from 8.8.8.8: bytes=32 time=14ms TTL=117

Ping statistics for 8.8.8.8:
    Packets: Sent = 4, Received = 4, Lost = 0 (0% loss),
Approximate round trip times in milli-seconds:
    Minimum = 13ms, Maximum = 15ms, Average = 14ms

C:\\>tracert google.com

Tracing route to google.com [142.250.192.46]
over a maximum of 30 hops:

  1    <1 ms    <1 ms    <1 ms  192.168.1.1
  2     2 ms     2 ms     2 ms  10.0.0.1
  3     5 ms     5 ms     4 ms  172.16.0.1
  4    12 ms    11 ms    12 ms  142.250.192.46

Trace complete.

Analysis:
- 0% packet loss indicates good connectivity
- Average RTT of 14ms shows good latency
- 4 hops to reach destination
- No timeout (*) indicates stable path`,
      learningOutcome: 'Ability to diagnose network connectivity issues using ping and traceroute'
    },
    {
      id: 10,
      title: 'Configuring a Cisco Router as a DHCP Server',
      objective: 'Configuring a Cisco Router as a DHCP Server.',
      theory: 'DHCP (Dynamic Host Configuration Protocol) automatically assigns IP addresses to network devices. Routers can act as DHCP servers to manage IP address allocation.',
      steps: [
        'Define DHCP pool name',
        'Specify network and subnet mask',
        'Set default gateway',
        'Configure DNS servers',
        'Exclude reserved IP addresses',
        'Verify DHCP bindings'
      ],
      commands: [
        { cmd: 'ip dhcp excluded-address 192.168.1.1 192.168.1.10', desc: 'Exclude IP range' },
        { cmd: 'ip dhcp pool LAN_POOL', desc: 'Create DHCP pool' },
        { cmd: 'network 192.168.1.0 255.255.255.0', desc: 'Define network' },
        { cmd: 'default-router 192.168.1.1', desc: 'Set default gateway' },
        { cmd: 'dns-server 8.8.8.8 8.8.4.4', desc: 'Set DNS servers' },
        { cmd: 'lease 7', desc: 'Set lease duration (days)' },
        { cmd: 'show ip dhcp binding', desc: 'Display DHCP bindings' },
        { cmd: 'show ip dhcp pool', desc: 'Display DHCP pool info' }
      ],
      output: `Router(config)#ip dhcp excluded-address 192.168.1.1 192.168.1.10
Router(config)#ip dhcp pool LAN_POOL
Router(dhcp-config)#network 192.168.1.0 255.255.255.0
Router(dhcp-config)#default-router 192.168.1.1
Router(dhcp-config)#dns-server 8.8.8.8 8.8.4.4
Router(dhcp-config)#lease 7
Router(dhcp-config)#exit

Router#show ip dhcp binding
IP address       Client-ID/              Lease expiration        Type
                 Hardware address
192.168.1.11     0001.9641.2345          Dec 25 2024 10:30 AM    Automatic
192.168.1.12     0002.1634.5678          Dec 25 2024 11:45 AM    Automatic

Router#show ip dhcp pool LAN_POOL
Pool LAN_POOL :
 Utilization mark (high/low)    : 100 / 0
 Subnet size (first/next)       : 0 / 0
 Total addresses                : 254
 Leased addresses               : 2
 Excluded addresses             : 10
 Pending event                  : none`,
      learningOutcome: 'Configuration and management of DHCP services on Cisco routers'
    },
    {
      id: 11,
      title: 'Installation and Introduction of Simulation Tools',
      objective: 'Installation and introduction of simulation tools packet tracer/GNS3.',
      theory: 'Network simulation tools allow practicing network configuration without physical hardware. Packet Tracer (Cisco) and GNS3 are popular network simulators.',
      steps: [
        'Download Packet Tracer from Cisco NetAcad',
        'Install Packet Tracer on your system',
        'Learn the Packet Tracer interface',
        'Add devices to workspace',
        'Connect devices using appropriate cables',
        'Configure devices and test connectivity',
        'Save and share network topology'
      ],
      commands: [],
      output: `Packet Tracer Features:
-----------------------
1. Device Support:
   - Routers (2901, 4331, etc.)
   - Switches (2960, 3650, etc.)
   - PCs, Servers, IoT devices
   - Wireless devices

2. Cable Types:
   - Copper Straight-Through
   - Copper Cross-Over
   - Fiber Optic
   - Console Cable
   - Wireless Connections

3. Simulation Modes:
   - Realtime Mode: Normal operation
   - Simulation Mode: Step-by-step packet flow

4. Available Protocols:
   - Routing: RIP, EIGRP, OSPF, BGP
   - Switching: VLANs, STP, VTP
   - Application: HTTP, DNS, DHCP, FTP
   - Security: ACLs, NAT, VPN

Sample Exercise:
Create a simple network:
- 1 Router
- 1 Switch
- 3 PCs
- Configure DHCP
- Test connectivity with ping

Result: All PCs can communicate`,
      learningOutcome: 'Proficiency in using network simulation tools for lab practice'
    },
    {
      id: 12,
      title: 'Recognize Physical Topology and Cabling',
      objective: 'Recognize the physical topology and cabling (coaxial, OFC, UTP, STP) of a network.',
      theory: 'Physical topology defines how devices are physically connected. Different cable types have different characteristics, costs, and use cases.',
      steps: [
        'Study different physical topologies',
        'Examine various cable types',
        'Compare cable specifications',
        'Identify use cases for each cable type',
        'Create network topology diagrams'
      ],
      commands: [],
      output: `Physical Topologies:
--------------------
1. Bus Topology:
   - Single cable backbone
   - Terminators at both ends
   - Legacy technology

2. Star Topology:
   - Central switch/hub
   - Most common today
   - Easy troubleshooting

3. Ring Topology:
   - Circular connection
   - Token passing
   - Used in FDDI, Token Ring

4. Mesh Topology:
   - Full connectivity
   - High redundancy
   - Expensive

Cable Types Comparison:
-----------------------
UTP (Unshielded Twisted Pair):
- Categories: Cat5e, Cat6, Cat6a, Cat7
- Distance: Up to 100 meters
- Speed: 1 Gbps (Cat5e), 10 Gbps (Cat6a)
- Cost: Low
- Use: Most common for LANs

STP (Shielded Twisted Pair):
- Additional shielding for EMI protection
- Distance: Up to 100 meters
- Cost: Medium
- Use: Industrial environments

Coaxial Cable:
- Single copper core with shielding
- Distance: Up to 500 meters
- Use: Cable TV, legacy networks

Fiber Optic (OFC):
- Single-mode: Long distance (100km+)
- Multi-mode: Short distance (2km)
- Speed: Up to 100 Gbps
- Cost: High
- Use: Backbone, long distances`,
      learningOutcome: 'Understanding of network topologies and cable selection criteria'
    },
    {
      id: 13,
      title: 'Install and Configure a Network Interface Card',
      objective: 'Install and configure a network interface card in a workstation.',
      theory: 'Network Interface Cards (NICs) provide the physical interface between computers and networks. Installation involves hardware setup and driver configuration.',
      steps: [
        'Power off the workstation',
        'Open the computer case',
        'Insert NIC into PCI/PCIe slot',
        'Secure the NIC with screw',
        'Close the case and power on',
        'Install NIC drivers',
        'Configure IP settings',
        'Test connectivity'
      ],
      commands: [
        { cmd: 'ipconfig /all', desc: 'View NIC configuration (Windows)' },
        { cmd: 'ifconfig -a', desc: 'View NIC configuration (Linux)' },
        { cmd: 'ethtool eth0', desc: 'Check NIC status (Linux)' },
        { cmd: 'lspci | grep Ethernet', desc: 'List network adapters (Linux)' }
      ],
      output: `Windows Device Manager:
-----------------------
Network adapters:
  └─ Realtek PCIe GbE Family Controller
     Status: This device is working properly
     Driver: Version 10.45.1026.2021

C:\\>ipconfig /all

Ethernet adapter Ethernet:
   Connection-specific DNS Suffix  :
   Description . . . . . . . . . . : Realtek PCIe GbE Family Controller
   Physical Address. . . . . . . . : 00-1A-2B-3C-4D-5E
   DHCP Enabled. . . . . . . . . . : Yes
   Autoconfiguration Enabled . . . : Yes
   IPv4 Address. . . . . . . . . . : 192.168.1.100(Preferred)
   Subnet Mask . . . . . . . . . . : 255.255.255.0
   Default Gateway . . . . . . . . : 192.168.1.1
   DNS Servers . . . . . . . . . . : 8.8.8.8

Linux:
------
$ lspci | grep Ethernet
02:00.0 Ethernet controller: Realtek Semiconductor RTL8111/8168/8411

$ ifconfig eth0
eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
      inet 192.168.1.100  netmask 255.255.255.0  broadcast 192.168.1.255
      ether 00:1a:2b:3c:4d:5e  txqueuelen 1000  (Ethernet)
      RX packets 1245  bytes 156789 (153.1 KiB)
      TX packets 890   bytes 98765 (96.4 KiB)`,
      learningOutcome: 'Hardware installation and NIC configuration skills'
    },
    {
      id: 14,
      title: 'Managing User Accounts in Windows and LINUX',
      objective: 'Managing user accounts in windows and LINUX.',
      theory: 'User account management is crucial for network security and access control. Different operating systems have different commands and procedures.',
      steps: [
        'Create new user accounts',
        'Set passwords and policies',
        'Assign permissions and groups',
        'Modify existing accounts',
        'Delete user accounts',
        'View user information'
      ],
      commands: [
        { cmd: 'net user', desc: 'List all users (Windows)' },
        { cmd: 'net user john password123 /add', desc: 'Add user (Windows)' },
        { cmd: 'net user john /delete', desc: 'Delete user (Windows)' },
        { cmd: 'cat /etc/passwd', desc: 'View users (Linux)' },
        { cmd: 'sudo useradd john', desc: 'Add user (Linux)' },
        { cmd: 'sudo passwd john', desc: 'Set password (Linux)' },
        { cmd: 'sudo userdel john', desc: 'Delete user (Linux)' },
        { cmd: 'groups john', desc: 'View user groups (Linux)' }
      ],
      output: `Windows Commands:
-----------------
C:\\>net user

User accounts for \\\\DESKTOP-PC
-------------------------------------------------------------------------------
Administrator            Guest                    John
The command completed successfully.

C:\\>net user john password123 /add
The command completed successfully.

C:\\>net localgroup administrators john /add
The command completed successfully.

Linux Commands:
---------------
$ cat /etc/passwd | grep john
john:x:1001:1001:John Doe:/home/john:/bin/bash

$ sudo useradd -m -s /bin/bash john
$ sudo passwd john
Enter new UNIX password:
Retype new UNIX password:
passwd: password updated successfully

$ groups john
john : john sudo

$ id john
uid=1001(john) gid=1001(john) groups=1001(john),27(sudo)`,
      learningOutcome: 'User account management across Windows and Linux platforms'
    },
    {
      id: 15,
      title: 'Sharing Hardware Resources in the Network',
      objective: 'Sharing of Hardware resources in the network.',
      theory: 'Resource sharing allows multiple users to access shared printers, folders, and other hardware over the network, improving efficiency and reducing costs.',
      steps: [
        'Enable file and printer sharing',
        'Share a folder on the network',
        'Set share permissions',
        'Share a network printer',
        'Access shared resources from other computers',
        'Map network drives'
      ],
      commands: [
        { cmd: 'net share', desc: 'View shared resources (Windows)' },
        { cmd: 'net share ShareName=C:\\Folder /grant:everyone,full', desc: 'Create share' },
        { cmd: 'net use Z: \\\\ComputerName\\ShareName', desc: 'Map network drive' },
        { cmd: 'net use Z: /delete', desc: 'Disconnect network drive' }
      ],
      output: `Windows File Sharing:
---------------------
Right-click folder → Properties → Sharing → Advanced Sharing
☑ Share this folder
Share name: SharedDocs
Permissions: Everyone - Full Control

C:\\>net share
Share name   Resource                        Remark
-------------------------------------------------------------------------------
SharedDocs   C:\\Users\\Public\\Documents
IPC$                                         Remote IPC
ADMIN$       C:\\Windows                      Remote Admin

C:\\>net use Z: \\\\SERVER\\SharedDocs
The command completed successfully.

Access from client:
-------------------
File Explorer:
\\\\SERVER\\SharedDocs
or
Z:\\ (mapped drive)

Network Printer Sharing:
------------------------
Control Panel → Devices and Printers
Right-click printer → Printer properties → Sharing
☑ Share this printer
Share name: HP_LaserJet

Accessing shared printer from client:
Add Printer → Network printer
\\\\SERVER\\HP_LaserJet

Linux Samba Sharing:
--------------------
$ sudo apt install samba
$ sudo nano /etc/samba/smb.conf

[SharedFolder]
   path = /home/shared
   browseable = yes
   writable = yes
   guest ok = yes

$ sudo systemctl restart smbd`,
      learningOutcome: 'Configuration of shared network resources and access management'
    },
    {
      id: 16,
      title: 'Use of Netstat and Its Options',
      objective: 'Use of Netstat and its options.',
      theory: 'Netstat (Network Statistics) displays network connections, routing tables, interface statistics, and protocol statistics. Essential for network troubleshooting.',
      steps: [
        'Display all active connections',
        'View listening ports',
        'Check routing table',
        'Display protocol statistics',
        'Identify processes using ports'
      ],
      commands: [
        { cmd: 'netstat', desc: 'Display active connections' },
        { cmd: 'netstat -a', desc: 'Display all connections and listening ports' },
        { cmd: 'netstat -n', desc: 'Display addresses in numerical form' },
        { cmd: 'netstat -r', desc: 'Display routing table' },
        { cmd: 'netstat -s', desc: 'Display protocol statistics' },
        { cmd: 'netstat -b', desc: 'Display executable (Windows, admin required)' },
        { cmd: 'netstat -ano', desc: 'Display with PID (Windows)' },
        { cmd: 'netstat -tulpn', desc: 'Display listening ports with PID (Linux)' }
      ],
      output: `C:\\>netstat -an

Active Connections

  Proto  Local Address          Foreign Address        State
  TCP    0.0.0.0:80             0.0.0.0:0              LISTENING
  TCP    0.0.0.0:443            0.0.0.0:0              LISTENING
  TCP    127.0.0.1:3306         0.0.0.0:0              LISTENING
  TCP    192.168.1.100:49152    142.250.192.46:443     ESTABLISHED
  TCP    192.168.1.100:49153    172.217.160.10:80      TIME_WAIT
  UDP    0.0.0.0:53             *:*
  UDP    192.168.1.100:137      *:*

C:\\>netstat -r

IPv4 Route Table
===========================================================================
Active Routes:
Network Destination        Netmask          Gateway       Interface  Metric
          0.0.0.0          0.0.0.0      192.168.1.1   192.168.1.100     25
        127.0.0.0        255.0.0.0         On-link       127.0.0.1    331
      192.168.1.0    255.255.255.0         On-link   192.168.1.100    281

C:\\>netstat -s

IPv4 Statistics
  Packets Received                   = 1234567
  Received Header Errors             = 0
  Received Address Errors            = 123
  Datagrams Forwarded                = 0

TCP Statistics for IPv4
  Active Opens                       = 456
  Passive Opens                      = 789
  Failed Connection Attempts         = 12
  Reset Connections                  = 34
  Current Connections                = 15

Linux:
------
$ netstat -tulpn
Active Internet connections (only servers)
Proto Recv-Q Send-Q Local Address           Foreign Address         State       PID/Program name
tcp        0      0 0.0.0.0:22              0.0.0.0:*               LISTEN      1234/sshd
tcp        0      0 0.0.0.0:80              0.0.0.0:*               LISTEN      5678/apache2
tcp6       0      0 :::3306                 :::*                    LISTEN      9012/mysqld`,
      learningOutcome: 'Network monitoring and troubleshooting using netstat command'
    },
    {
      id: 17,
      title: 'Connectivity Troubleshooting Using PING, IPCONFIG, IFCONFIG',
      objective: 'Connectivity troubleshooting using PING, IPCONFIG, IFCONFIG.',
      theory: 'Systematic troubleshooting approach using diagnostic commands helps identify and resolve network connectivity issues efficiently.',
      steps: [
        'Check local IP configuration',
        'Ping localhost (127.0.0.1)',
        'Ping local IP address',
        'Ping default gateway',
        'Ping DNS server',
        'Ping external host',
        'Analyze results and identify problem'
      ],
      commands: [
        { cmd: 'ipconfig', desc: 'Check IP config (Windows)' },
        { cmd: 'ifconfig', desc: 'Check IP config (Linux)' },
        { cmd: 'ping 127.0.0.1', desc: 'Test TCP/IP stack' },
        { cmd: 'ping <local-ip>', desc: 'Test NIC' },
        { cmd: 'ping <gateway>', desc: 'Test local network' },
        { cmd: 'ping 8.8.8.8', desc: 'Test internet connectivity' },
        { cmd: 'ping google.com', desc: 'Test DNS resolution' },
        { cmd: 'ipconfig /release', desc: 'Release IP address' },
        { cmd: 'ipconfig /renew', desc: 'Renew IP address' },
        { cmd: 'ipconfig /flushdns', desc: 'Clear DNS cache' }
      ],
      output: `Troubleshooting Process:
------------------------

Step 1: Check IP Configuration
C:\\>ipconfig
Ethernet adapter Ethernet:
   IPv4 Address. . . . . . . . : 192.168.1.100
   Subnet Mask . . . . . . . . : 255.255.255.0
   Default Gateway . . . . . . : 192.168.1.1
Status: ✓ IP configured properly

Step 2: Test TCP/IP Stack
C:\\>ping 127.0.0.1
Reply from 127.0.0.1: bytes=32 time<1ms TTL=128
Status: ✓ TCP/IP stack is working

Step 3: Test NIC
C:\\>ping 192.168.1.100
Reply from 192.168.1.100: bytes=32 time<1ms TTL=128
Status: ✓ Network card is working

Step 4: Test Default Gateway
C:\\>ping 192.168.1.1
Reply from 192.168.1.1: bytes=32 time=2ms TTL=64
Status: ✓ Can reach gateway (local network OK)

Step 5: Test External Connectivity
C:\\>ping 8.8.8.8
Reply from 8.8.8.8: bytes=32 time=14ms TTL=117
Status: ✓ Internet connectivity working

Step 6: Test DNS
C:\\>ping google.com
Pinging google.com [142.250.192.46]
Reply from 142.250.192.46: bytes=32 time=15ms TTL=117
Status: ✓ DNS resolution working

Conclusion: Network is fully operational

Common Issues and Solutions:
----------------------------
Problem: "Request timed out" when pinging gateway
Solution: Check physical cable connection, switch port

Problem: "Destination host unreachable"
Solution: Check IP configuration, subnet mask

Problem: Can ping IP but not domain name
Solution: Check DNS server settings, flush DNS cache

Problem: "APIPA address" (169.254.x.x)
Solution: DHCP server issue, ipconfig /renew`,
      learningOutcome: 'Systematic network troubleshooting methodology'
    },
    {
      id: 18,
      title: 'Installation of Network Operating System',
      objective: 'Installation of Network Operating System (NOS).',
      theory: 'Network Operating Systems like Windows Server and Linux distributions provide centralized management, authentication, file sharing, and other network services.',
      steps: [
        'Prepare installation media (USB/DVD/ISO)',
        'Boot from installation media',
        'Select installation type',
        'Configure disk partitions',
        'Set administrator password',
        'Configure network settings',
        'Complete installation and updates'
      ],
      commands: [],
      output: `Windows Server 2019 Installation:
----------------------------------
1. Boot from installation media
2. Select: Windows Server 2019 Standard (Desktop Experience)
3. Accept license terms
4. Choose: Custom Installation
5. Partition disk (100 GB minimum)
6. Installation Progress:
   - Copying files...
   - Installing features...
   - Installing updates...
7. Set Administrator password: **********
8. Initial Configuration:
   - Computer name: SERVER01
   - Domain: WORKGROUP
   - IP Address: 192.168.1.10
   - Subnet Mask: 255.255.255.0
   - Gateway: 192.168.1.1
   - DNS: 8.8.8.8

Ubuntu Server 22.04 Installation:
----------------------------------
1. Boot from USB drive
2. Select language: English
3. Update installer: Yes
4. Keyboard layout: English (US)
5. Network configuration:
   - Interface: enp0s3
   - IP: 192.168.1.20/24
   - Gateway: 192.168.1.1
   - DNS: 8.8.8.8
6. Disk setup:
   - Use entire disk: 100GB
   - File system: ext4
7. Profile setup:
   - Name: Administrator
   - Server name: ubuntu-server
   - Username: admin
   - Password: **********
8. SSH Setup: ☑ Install OpenSSH server
9. Installation Progress:
   - Installing base system...
   - Installing packages...
   - Configuring system...
10. Reboot

Post-Installation:
------------------
$ sudo apt update
$ sudo apt upgrade -y
$ sudo apt install net-tools openssh-server samba -y

System is ready for network services!`,
      learningOutcome: 'Installation and basic configuration of network operating systems'
    },
    {
      id: 19,
      title: 'Visit Nearby Industries for Latest Networking Techniques',
      objective: 'Visit nearby industries for the latest networking techniques.',
      theory: 'Industry visits provide practical insights into real-world network implementations, current technologies, and professional practices.',
      steps: [
        'Contact local IT companies or data centers',
        'Schedule visit with network administrators',
        'Prepare questions about their infrastructure',
        'Observe network equipment and topology',
        'Learn about security measures',
        'Document findings and technologies used'
      ],
      commands: [],
      output: `Industry Visit Report:
----------------------

Company: TechCorp Solutions Pvt. Ltd.
Date: [Visit Date]
Duration: 2 hours

Network Infrastructure Observed:
---------------------------------

1. Data Center:
   - Cisco Catalyst 9000 Series Switches
   - Cisco ISR 4000 Series Routers
   - Palo Alto Firewall PA-5220
   - VMware ESXi Cluster (5 hosts)
   - NetApp Storage Arrays

2. Network Topology:
   - Three-tier architecture
   - Core Layer: High-speed switches (10 Gbps)
   - Distribution Layer: Layer 3 switches
   - Access Layer: Layer 2 switches (1 Gbps)
   - Redundant connections with HSRP

3. Connectivity:
   - Primary ISP: 1 Gbps Fiber
   - Backup ISP: 500 Mbps (different provider)
   - MPLS connection to branch offices

4. Wireless Network:
   - Cisco Wireless Controller
   - 50+ Access Points (802.11ax/WiFi 6)
   - Guest network isolated via VLAN

5. Security Measures:
   - Next-Gen Firewall with IPS
   - Network Access Control (NAC)
   - VPN for remote access
   - SIEM for log monitoring
   - Regular penetration testing

6. Monitoring Tools:
   - SolarWinds Network Performance Monitor
   - Cisco DNA Center
   - Grafana dashboards
   - 24/7 NOC (Network Operations Center)

7. Latest Technologies:
   - Software-Defined Networking (SDN)
   - Network Function Virtualization (NFV)
   - Zero Trust Architecture
   - Cloud integration (AWS, Azure)
   - IoT device management

Key Learnings:
--------------
✓ Redundancy is critical for business continuity
✓ Automation reduces manual configuration errors
✓ Security is implemented in multiple layers
✓ Monitoring and alerting are essential
✓ Documentation is maintained for all changes
✓ Regular backups of configurations
✓ Disaster recovery plans are tested quarterly

Career Insights:
----------------
- Network Administrator roles
- Security Analyst positions
- Cloud Network Engineer opportunities
- Average salary: ₹4-8 LPA for freshers
- Certifications valued: CCNA, CCNP, CompTIA Network+

Questions Asked:
----------------
Q: How do you handle network outages?
A: Redundant paths, automated failover, 24/7 monitoring

Q: What certifications do you require?
A: CCNA is baseline, CCNP for senior roles

Q: How often do you upgrade infrastructure?
A: Hardware: 5 years, Software: As needed`,
      learningOutcome: 'Understanding of real-world network implementations and industry practices'
    },
    {
      id: 20,
      title: 'Create a Network of at Least 6 Computers',
      objective: 'Create a network of at least 6 computers.',
      theory: 'Building a small LAN involves physical connectivity, IP addressing, switch configuration, and testing connectivity between all nodes.',
      steps: [
        'Gather hardware: 6 computers, 1 switch, Ethernet cables',
        'Connect all computers to the switch',
        'Configure IP addresses on each computer',
        'Verify physical connections',
        'Test connectivity using ping',
        'Share resources and test file transfer'
      ],
      commands: [
        { cmd: 'ipconfig /all', desc: 'View network configuration' },
        { cmd: 'ping <ip-address>', desc: 'Test connectivity' },
        { cmd: 'arp -a', desc: 'View ARP cache' },
        { cmd: 'net view', desc: 'View network computers' }
      ],
      output: `Network Configuration:
----------------------

Physical Setup:
- 1x 24-port Gigabit Switch
- 6x Computers (PC1-PC6)
- 6x Cat6 Ethernet cables
- 1x Router (for internet access)

IP Addressing Scheme:
Network: 192.168.10.0/24
Gateway: 192.168.10.1 (Router)

Computer IP Configurations:
---------------------------
PC1:
IP: 192.168.10.11
Subnet: 255.255.255.0
Gateway: 192.168.10.1
DNS: 8.8.8.8

PC2:
IP: 192.168.10.12
Subnet: 255.255.255.0
Gateway: 192.168.10.1
DNS: 8.8.8.8

PC3:
IP: 192.168.10.13
Subnet: 255.255.255.0
Gateway: 192.168.10.1
DNS: 8.8.8.8

PC4:
IP: 192.168.10.14
Subnet: 255.255.255.0
Gateway: 192.168.10.1
DNS: 8.8.8.8

PC5:
IP: 192.168.10.15
Subnet: 255.255.255.0
Gateway: 192.168.10.1
DNS: 8.8.8.8

PC6:
IP: 192.168.10.16
Subnet: 255.255.255.0
Gateway: 192.168.10.1
DNS: 8.8.8.8

Connectivity Testing from PC1:
-------------------------------
C:\\>ping 192.168.10.12
Reply from 192.168.10.12: bytes=32 time<1ms TTL=128
✓ PC1 → PC2 Connected

C:\\>ping 192.168.10.13
Reply from 192.168.10.13: bytes=32 time<1ms TTL=128
✓ PC1 → PC3 Connected

C:\\>ping 192.168.10.14
Reply from 192.168.10.14: bytes=32 time<1ms TTL=128
✓ PC1 → PC4 Connected

C:\\>ping 192.168.10.15
Reply from 192.168.10.15: bytes=32 time<1ms TTL=128
✓ PC1 → PC5 Connected

C:\\>ping 192.168.10.16
Reply from 192.168.10.16: bytes=32 time<1ms TTL=128
✓ PC1 → PC6 Connected

All computers successfully connected!

Switch Port Status:
-------------------
Port 1: PC1 - Link Up (1000 Mbps)
Port 2: PC2 - Link Up (1000 Mbps)
Port 3: PC3 - Link Up (1000 Mbps)
Port 4: PC4 - Link Up (1000 Mbps)
Port 5: PC5 - Link Up (1000 Mbps)
Port 6: PC6 - Link Up (1000 Mbps)
Port 24: Router - Link Up (1000 Mbps)

Shared Folder Setup:
--------------------
PC1: Shared folder "Documents" - \\\\192.168.10.11\\Documents
PC2: Shared printer "HP_Printer" - \\\\192.168.10.12\\HP_Printer

File Transfer Test:
From PC1 to PC2:
- Transfer 100 MB file
- Speed: 950 Mbps (near gigabit speed)
- Time: ~1 second
✓ File transfer successful

Network Diagram:
----------------
       [Router] 192.168.10.1
            |
       [Switch]
      /  |  |  \\  |  \\
    PC1 PC2 PC3 PC4 PC5 PC6
    .11 .12 .13 .14 .15 .16`,
      learningOutcome: 'Practical skills in building and configuring a small LAN'
    },
    {
      id: 21,
      title: 'Study and Use of Wireshark',
      objective: 'Study and use of wireshark to capture and analyze the network traffic.',
      theory: 'Wireshark is a network protocol analyzer that captures and displays packet data in real-time. Essential for network troubleshooting, security analysis, and protocol learning.',
      steps: [
        'Download and install Wireshark',
        'Select network interface to capture',
        'Start packet capture',
        'Generate network traffic',
        'Stop capture and analyze packets',
        'Apply filters to find specific traffic',
        'Export and save capture files'
      ],
      commands: [],
      output: `Wireshark Installation:
-----------------------
Download from: https://www.wireshark.org
Version: 4.0.x
Install with: NPcap (Windows) or libpcap (Linux)

Starting Capture:
-----------------
1. Launch Wireshark
2. Select Interface: Ethernet (or WiFi)
3. Click Start button (shark fin icon)
4. Packets start appearing in real-time

Sample Captured Packets:
------------------------
No. | Time    | Source          | Destination     | Protocol | Info
--------------------------------------------------------------------
1   | 0.000   | 192.168.1.100   | 8.8.8.8         | DNS      | Standard query A google.com
2   | 0.015   | 8.8.8.8         | 192.168.1.100   | DNS      | Standard query response A 142.250.192.46
3   | 0.020   | 192.168.1.100   | 142.250.192.46  | TCP      | 52341 → 443 [SYN] Seq=0
4   | 0.035   | 142.250.192.46  | 192.168.1.100   | TCP      | 443 → 52341 [SYN, ACK] Seq=0 Ack=1
5   | 0.036   | 192.168.1.100   | 142.250.192.46  | TCP      | 52341 → 443 [ACK] Seq=1 Ack=1
6   | 0.040   | 192.168.1.100   | 142.250.192.46  | TLSv1.3  | Client Hello
7   | 0.055   | 142.250.192.46  | 192.168.1.100   | TLSv1.3  | Server Hello
8   | 0.100   | 192.168.1.100   | 142.250.192.46  | HTTP     | GET / HTTP/1.1

Common Display Filters:
-----------------------
ip.addr == 192.168.1.100        → Show packets to/from specific IP
tcp.port == 80                  → Show HTTP traffic
http                            → Show only HTTP packets
dns                             → Show only DNS queries
tcp.flags.syn == 1              → Show TCP SYN packets
ip.src == 192.168.1.100         → Show packets from specific source
!(arp or icmp or dns)           → Exclude ARP, ICMP, DNS

Packet Details (Example HTTP GET):
-----------------------------------
Frame 8: 74 bytes on wire
Ethernet II
  Source: 00:1a:2b:3c:4d:5e
  Destination: 00:50:56:c0:00:08
  Type: IPv4 (0x0800)
Internet Protocol Version 4
  Source: 192.168.1.100
  Destination: 142.250.192.46
  Protocol: TCP (6)
Transmission Control Protocol
  Source Port: 52341
  Destination Port: 80
  Seq: 1
  Ack: 1
  Flags: PSH, ACK
Hypertext Transfer Protocol
  GET / HTTP/1.1
  Host: google.com
  User-Agent: Mozilla/5.0

Analysis Features:
------------------
1. Statistics → Protocol Hierarchy
   - Shows distribution of protocols
   - IPv4: 75%, TCP: 60%, HTTP: 15%, DNS: 5%

2. Statistics → Conversations
   - Shows all communications between hosts
   - Top talker: 192.168.1.100 ↔ 142.250.192.46

3. Statistics → IO Graph
   - Visual representation of traffic over time

4. Follow TCP Stream
   - Right-click packet → Follow → TCP Stream
   - Shows complete conversation

Practical Use Cases:
--------------------
✓ Identify bandwidth-hungry applications
✓ Detect network security issues
✓ Troubleshoot slow connections
✓ Analyze protocol behavior
✓ Verify proper encryption (HTTPS/TLS)
✓ Detect malware communication
✓ Debug application network issues

Sample Analysis Report:
-----------------------
Capture Duration: 5 minutes
Total Packets: 1,247
Protocols:
  - TCP: 62%
  - UDP: 20%
  - ICMP: 3%
  - ARP: 5%
  - DNS: 10%

Top Talkers:
1. 192.168.1.100 → 142.250.192.46 (Google): 450 packets
2. 192.168.1.100 → 8.8.8.8 (DNS): 89 packets
3. 192.168.1.100 → 172.217.160.10 (YouTube): 320 packets

Findings:
- All HTTP traffic should be upgraded to HTTPS
- DNS queries are going to external server (8.8.8.8)
- No suspicious or malicious traffic detected`,
      learningOutcome: 'Network traffic analysis and protocol troubleshooting skills using Wireshark'
    }
  ]

  const togglePractical = (practicalId) => {
    setExpandedPractical(expandedPractical === practicalId ? null : practicalId)
  }

  return (
    <div className="relative min-h-screen bg-slate-950 overflow-hidden">
      {/* 3D Background Scene */}
      <div className="fixed inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
          <CNScene />
        </Canvas>
      </div>

      {/* Gradient Overlay */}
      <div className="fixed inset-0 bg-gradient-to-b from-green-950/30 via-transparent to-slate-950/60 z-10 pointer-events-none" />

      {/* Scrollable Content */}
      <div className="relative z-20 min-h-screen">
        {/* Header */}
        <header className="bg-slate-900/30 backdrop-blur-xl border-b border-green-500/20 sticky top-0 z-30">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/')}
                className="p-3 rounded-xl bg-green-500/20 hover:bg-green-500/30 transition-all border border-green-500/50 backdrop-blur-sm hover:scale-110"
              >
                <svg className="w-6 h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400">
                  🌐 Computer Networking
                </h1>
                <p className="text-slate-300 mt-2 text-base md:text-lg">
                  Complete Practical Guide & Reference
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Master Computer Networking Practicals
            </h2>
            <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto">
              Complete solutions with commands, outputs, and learning outcomes for all 21 practicals
            </p>
          </div>

          {/* Quick Course Info */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
            <div className="bg-slate-900/60 backdrop-blur-xl rounded-xl p-4 border border-slate-700/50 text-center">
              <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
                {courseInfo.semester}
              </div>
              <div className="text-slate-400 text-sm">Semester</div>
            </div>
            <div className="bg-slate-900/60 backdrop-blur-xl rounded-xl p-4 border border-slate-700/50 text-center">
              <div className="text-3xl font-bold text-green-400">
                {courseInfo.credits}
              </div>
              <div className="text-slate-400 text-sm">Credits</div>
            </div>
            <div className="bg-slate-900/60 backdrop-blur-xl rounded-xl p-4 border border-slate-700/50 text-center">
              <div className="text-3xl font-bold text-emerald-400">
                {courseInfo.totalMarks}
              </div>
              <div className="text-slate-400 text-sm">Total Marks</div>
            </div>
            <div className="bg-slate-900/60 backdrop-blur-xl rounded-xl p-4 border border-slate-700/50 text-center">
              <div className="text-3xl font-bold text-teal-400">
                {practicals.length}
              </div>
              <div className="text-slate-400 text-sm">Practicals</div>
            </div>
            <div className="bg-slate-900/60 backdrop-blur-xl rounded-xl p-4 border border-slate-700/50 text-center">
              <div className="text-3xl font-bold text-cyan-400">
                50
              </div>
              <div className="text-slate-400 text-sm">Practical Marks</div>
            </div>
          </div>

          {/* Marks Breakdown */}
          <div className="mb-12">
            <h3 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="text-4xl">📊</span> Marks Distribution
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {marksBreakdown.map((item, index) => (
                <div key={index} className="group relative">
                  <div className={`absolute inset-0 bg-gradient-to-r ${item.color}/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all`} />
                  <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50 group-hover:border-green-500/50 transition-all text-center">
                    <div className={`text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${item.color} mb-2`}>
                      {item.marks}
                    </div>
                    <div className="text-slate-300 text-sm font-semibold">{item.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Practicals List */}
          <div className="mb-12">
            <h3 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="text-4xl">💻</span> All 21 Practicals with Solutions
            </h3>
            <div className="space-y-4">
              {practicals.map((practical) => (
                <div key={practical.id} className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-teal-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
                  <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50 group-hover:border-green-500/50 transition-all">
                    <div
                      className="flex items-center justify-between cursor-pointer"
                      onClick={() => togglePractical(practical.id)}
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <span className="text-3xl px-4 py-2 bg-green-500/20 rounded-lg font-bold text-green-400 border border-green-500/50">
                          {practical.id}
                        </span>
                        <div>
                          <h4 className="text-xl font-bold text-white mb-1">
                            {practical.title}
                          </h4>
                          <p className="text-slate-400 text-sm">
                            {practical.objective}
                          </p>
                        </div>
                      </div>
                      <button className="p-2 bg-green-500/20 hover:bg-green-500/30 rounded-lg transition-all">
                        <svg
                          className={`w-6 h-6 text-green-400 transition-transform ${expandedPractical === practical.id ? 'rotate-180' : ''}`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    </div>

                    {expandedPractical === practical.id && (
                      <div className="mt-6 pt-6 border-t border-slate-700/50 space-y-6">
                        {/* Theory */}
                        <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                          <h5 className="text-blue-400 font-bold mb-2 flex items-center gap-2">
                            <span>📚</span> Theory
                          </h5>
                          <p className="text-slate-300 text-sm leading-relaxed">{practical.theory}</p>
                        </div>

                        {/* Steps */}
                        {practical.steps && practical.steps.length > 0 && (
                          <div>
                            <h5 className="text-white font-bold mb-3 flex items-center gap-2">
                              <span>📝</span> Steps to Perform
                            </h5>
                            <ol className="space-y-2">
                              {practical.steps.map((step, index) => (
                                <li key={index} className="text-slate-300 text-sm flex items-start gap-3">
                                  <span className="text-green-400 font-bold min-w-[24px]">{index + 1}.</span>
                                  <span>{step}</span>
                                </li>
                              ))}
                            </ol>
                          </div>
                        )}

                        {/* Commands */}
                        {practical.commands && practical.commands.length > 0 && (
                          <div>
                            <h5 className="text-white font-bold mb-3 flex items-center gap-2">
                              <span>⚡</span> Commands Used
                            </h5>
                            <div className="space-y-2">
                              {practical.commands.map((cmd, index) => (
                                <div key={index} className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
                                  <code className="text-green-400 font-mono text-sm">{cmd.cmd}</code>
                                  <p className="text-slate-400 text-xs mt-1">{cmd.desc}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Output */}
                        <div>
                          <h5 className="text-white font-bold mb-3 flex items-center gap-2">
                            <span>🖥️</span> Expected Output / Result
                          </h5>
                          <div className="bg-slate-950/80 border border-slate-700/50 rounded-xl p-4">
                            <pre className="text-green-400 text-xs font-mono whitespace-pre-wrap overflow-x-auto">
                              {practical.output}
                            </pre>
                          </div>
                        </div>

                        {/* Learning Outcome */}
                        <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
                          <h5 className="text-green-400 font-bold mb-2 flex items-center gap-2">
                            <span>🎯</span> Learning Outcome
                          </h5>
                          <p className="text-slate-300 text-sm">{practical.learningOutcome}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Study Tips */}
          <div className="mb-12">
            <h3 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="text-4xl">💡</span> Tips for Practical Exam
            </h3>
            <div className="bg-gradient-to-r from-green-500/10 to-teal-500/10 border border-green-500/30 rounded-2xl p-6">
              <ul className="space-y-3 text-slate-300">
                <li className="flex items-start gap-3">
                  <span className="text-yellow-400">★</span>
                  <span>Practice all commands multiple times before the exam</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-yellow-400">★</span>
                  <span>Use Packet Tracer/GNS3 for simulation practice at home</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-yellow-400">★</span>
                  <span>Remember the difference between Windows and Linux commands</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-yellow-400">★</span>
                  <span>Always verify your configuration before submitting</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-yellow-400">★</span>
                  <span>Document your steps as you perform the practical</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CN
