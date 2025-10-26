
module tb;
  reg [3 : 0] A, B;
  reg [2:0] SEL;
  wire [4 : 0] RESULT;
  alu_4bit uut (.A(A), .B(B), .SEL(SEL), .RESULT(RESULT));
  initial begin
    A = 4'd12;
    B = 4'd12;
    SEL = 3'b000;
    #5;
    $display("%0d", RESULT);
    $finish;
  end
endmodule
