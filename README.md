# ⚙️ Digital ALU Visualizer  
An interactive **Arithmetic Logic Unit (ALU) Simulator** built by **Raghavendran Ganesan** to visualize core digital logic operations in real-time.

---

## 🧠 Overview  
This project demonstrates how a **Digital ALU** (Arithmetic Logic Unit) performs essential operations such as:

- **Addition**  
- **Subtraction**  
- **AND**, **OR**, **XOR**  
- **NOT (A)**  
- **Increment / Decrement**

Users can toggle between **4-bit** and **8-bit** modes and visualize binary conversions, arithmetic outputs, and processor flags like **Carry**, **Zero**, and **Overflow** — all within a glowing cyber-themed interface.

---


---

## 🖼️ Project Preview  

| Mode | Operation | Screenshot |
|------|------------|-------------|
| **4-Bit** | Addition | ![ALU 4-bit](assets/preview.png) |
| **8-Bit** | Subtraction | ![ALU 8-bit](assets/preview2.png) |

> *(You can replace these image paths with your own screenshots stored in the `assets/` folder)*
>
> <img width="1639" height="898" alt="image" src="https://github.com/user-attachments/assets/cf7293a4-bd59-46ab-9b6a-c2e8a1501600" />


---

## 🧩 Features  

✅ Real-time binary conversion  
✅ Switch between **4-bit** and **8-bit** computation  
✅ Instant ALU operation output  
✅ Live display of CPU flags (**Carry**, **Zero**, **Overflow**)  
✅ Animated, cyber-style responsive UI  
✅ Works offline (pure frontend), but supports Node backend for realism  

---

## ⚙️ Tech Stack  

| Layer | Technology Used |
|-------|------------------|
| **Frontend** | HTML5, CSS3, JavaScript (Vanilla) |
| **Backend (optional)** | Node.js, Express.js |
| **Version Control** | Git & GitHub |
| **Deployment** | GitHub Pages (Frontend) + Render (Backend) |

---

## 🧠 ALU Logic Summary  

| SEL Code | Operation | Description |
|-----------|------------|-------------|
| `000` | Addition | Adds A + B |
| `001` | Subtraction | A - B |
| `010` | AND | Bitwise AND |
| `011` | OR | Bitwise OR |
| `100` | XOR | Bitwise XOR |
| `101` | NOT (A) | Bitwise Negation of A |
| `110` | Increment | A + 1 |
| `111` | Decrement | A - 1 |

---

## 🖥️ Local Setup  

To run the **frontend only** version (no backend needed):  
```bash
git clone https://github.com/Raghavganesan/Digital-ALU-Visualizer.git
cd Digital-ALU-Visualizer
open index.html
