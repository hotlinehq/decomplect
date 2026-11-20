# Reference numbers (used by E19-E20)

Orders of magnitude for back-of-envelope estimates. Rounded from Dean & Ghemawat, Performance Hints
(2025 update). Dean's 2009 values in brackets where they differ by 2x or more. Re-measure any
number that decides a design.

| Operation | ~Cost (2025) | [2009] |
|---|---|---|
| L1 cache reference | 0.5 ns | |
| Branch mispredict | 5 ns | |
| L2 cache reference | 3 ns | [7 ns] |
| Mutex lock/unlock (uncontended) | 15 ns | [25 ns] |
| Main memory reference | 50 ns | [100 ns] |
| Compress 1 KB (fast codec) | 1 µs | [3 µs] |
| Read 4 KB randomly from SSD | 20 µs | |
| Round trip within a datacenter | 50 µs | [500 µs] |
| Read 1 MB sequentially from memory | 64 µs | [250 µs] |
| Read 1 MB over 100 Gbps network | 100 µs | |
| Read 1 MB sequentially from SSD | 1 ms | |
| Disk seek | 5 ms | [10 ms] |
| Read 1 MB sequentially from disk | 10 ms | [20 ms] |
| Packet California → Netherlands → California | 150 ms | |

Handy conversions and formulas
- 1 day ≈ 86,400 s ≈ 10^5 s. So N per day ÷ 10^5 ≈ N per second (average; peak is often 2-10x).
- Fan-out tail: P(request slow) = 1 − (1 − p)^N for N parallel calls each slow with probability p.
- Failures per day ≈ fleet size ÷ MTBF in days.
- Higher-level costs (SQL point read, cloud API call, LLM call) are not in this table: measure your own and add them with a date.
