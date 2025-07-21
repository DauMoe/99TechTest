const readline = require('node:readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const sum_to_n_a = (n) => {
  if (n <= 1) return n;
  return n * 0.5 * (1 + n);
}

const sum_to_n_b = (n) => {
  if (n <= 1) return n;

  let sum = 1;

  for (let i = 2; i <= n; i++) {
    sum += i;
  }
  return sum;
}

const _bitwiseAdd = (a, b) => {
  while (b !== 0) {
    const carry = a & b;
    a = a ^ b;
    b = carry << 1;
  }
  return a;
}

const sum_to_n_c = (n) => {
  if (n <= 1) return n;
  
  return Array.from({ length: n }, (_, i) => i+1).reduce((prevVal, currVal) => prevVal + currVal, 0);
}

rl.question(`N = `, n => {
  const num = parseInt(n);
  if (isNaN(num) || !Number.isInteger(num)) {
    console.log("N must be an integer");
  } else {
    console.log("Sum to N (Solution A): ", sum_to_n_a(num));
    console.log("Sum to N (Solution B): ", sum_to_n_b(num));
    console.log("Sum to N (Solution C): ", sum_to_n_c(num));
  }
  rl.close();
});