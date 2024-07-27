//2976. Minimum Cost to Convert String I
/**
 * @param {string} source
 * @param {string} target
 * @param {character[]} original
 * @param {character[]} changed
 * @param {number[]} cost
 * @return {number}
 */
var minimumCost = function (source, target, original, changed, cost) {
    class Heap {
        constructor() {
            this.heap = new Array();
            this.heap.push(0);
        }

        enqueue(val) {
            this.heap.push(val);
            let i = this.heap.length - 1;
            while (i > 1 && this.heap[i][1] < this.heap[Math.floor(i / 2)][1]) {
                let tmp = this.heap[i];
                this.heap[i] = this.heap[Math.floor(i / 2)];
                this.heap[Math.floor(i / 2)] = tmp;
                i = Math.floor(i / 2);
            }
        }

        dequeue() {
            if (this.heap.length == 1) {
                return -1;
            }
            if (this.heap.length == 2) {
                return this.heap.pop();
            }

            let res = this.heap[1];
            // Move last value to root
            this.heap[1] = this.heap.pop();
            let i = 1;
            // Percolate down
            while (2 * i < this.heap.length) {
                if (
                    2 * i + 1 < this.heap.length &&
                    this.heap[2 * i + 1][1] < this.heap[2 * i][1] &&
                    this.heap[i][1] > this.heap[2 * i + 1][1]
                ) {
                    // Swap right child
                    let tmp = this.heap[i];
                    this.heap[i] = this.heap[2 * i + 1];
                    this.heap[2 * i + 1] = tmp;
                    i = 2 * i + 1;
                } else if (this.heap[i][1] > this.heap[2 * i][1]) {
                    // Swap left child
                    let tmp = this.heap[i];
                    this.heap[i] = this.heap[2 * i];
                    this.heap[2 * i] = tmp;
                    i = 2 * i;
                } else {
                    break;
                }
            }
            return res;
        }
    }
    let graph = original.reduce((a, c, i) => {
        if (a[c]) {
            a[c].push([changed[i], cost[i]]);
        } else {
            a[c] = [];
            a[c].push([changed[i], cost[i]]);
        }
        return a;
    }, {});
    let data = {};
    for (let key in graph) {
        let h = new Heap();
        h.enqueue([key, 0]);
        let shortest = {};
        while (h.heap[1] !== undefined) {
            let [n1, w1] = h.dequeue();
            if (n1 in shortest) {
                continue;
            }
            shortest[n1] = w1;
            if (n1 in graph) {
                for (let [n2, w2] of graph[n1]) {
                    h.enqueue([n2, w1 + w2]);
                }
            }
        }
        data[key] = shortest;
    }

    let min_cost = 0;
    for (let i = 0; i < source.length; i++) {
        if (source[i] !== target[i]) {
            if (data[source[i]] && data[source[i]][target[i]]) {
                min_cost += data[source[i]][target[i]];
            } else {
                return -1;
            }
        }
    }
    return min_cost;
};
