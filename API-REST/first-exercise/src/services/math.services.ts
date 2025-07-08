// Calculate GCD (Greatest Common Divisor) for later calculate LCM
const gcd = (a: number, b: number): number => {
    return b === 0 ? a : gcd(b, a % b);
};

// Calculate LCM (Least Common Multiple)
const lcm = (numbers: number[]): number => {
    
    if (numbers.length === 0 || numbers.includes(0)) return 0;
    
    numbers = numbers.sort((a, b) => a - b); // Sort numbers in ascending order
    return numbers.reduce((acc, curr) => (acc * curr) / gcd(acc, curr) );
};

const increment = (num: number): number => num + 1;

export { lcm, increment, gcd };