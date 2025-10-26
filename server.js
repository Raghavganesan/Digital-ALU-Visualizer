import express from "express";
import fs from "fs";
import { exec } from "child_process";

const app = express();
app.use(express.json());
app.use(express.static("public"));

const selMap = {
  "000": "Addition",
  "001": "Subtraction",
  "010": "AND",
  "011": "OR",
  "100": "XOR",
  "101": "NOT (A)",
  "110": "Increment A",
  "111": "Decrement A"
};

app.post("/simulate", (req, res) => {
  const { A, B, SEL, mode } = req.body;
  const file = mode === "4bit" ? "alu_4bit" : "alu_8bit";

  const tb = `
module tb;
  reg [${mode === "4bit" ? 3 : 7} : 0] A, B;
  reg [2:0] SEL;
  wire [${mode === "4bit" ? 4 : 8} : 0] RESULT;
  ${file} uut (.A(A), .B(B), .SEL(SEL), .RESULT(RESULT));
  initial begin
    A = ${mode === "4bit" ? 4 : 8}'d${A};
    B = ${mode === "4bit" ? 4 : 8}'d${B};
    SEL = 3'b${SEL};
    #5;
    $display("%0d", RESULT);
    $finish;
  end
endmodule
`;

  fs.writeFileSync(`verilog/tb_auto.v`, tb);

  exec(`cd verilog && iverilog -o sim ${file}.v tb_auto.v && vvp sim`, (err, stdout, stderr) => {
    if (err) {
      console.error(stderr);
      return res.json({ error: "Simulation failed", raw: stderr });
    }
    const raw = stdout.trim();
    const dec = parseInt(raw);
    const bitWidth = mode === "4bit" ? 5 : 9;
    const bin = dec.toString(2).padStart(bitWidth, "0");
    res.json({ operation: selMap[SEL], result_dec: dec, result_bin: bin });
  });
});

app.listen(3000, () => console.log("✅ Server running on http://localhost:3000"));
