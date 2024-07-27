//1334. Find the City With the Smallest Number of Neighbors at a Threshold Distance
/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number} distanceThreshold
 * @return {number}
 */
var findTheCity = function (n, edges, distanceThreshold) {
    class Heap {
        constructor() {
            this.heap = new Array();
            this.heap.push(0);
        }

        push(val) {
            this.heap.push(val);
            let i = this.heap.length - 1;
            while (i > 1 && this.heap[i][1] < this.heap[Math.floor(i / 2)][1]) {
                let tmp = this.heap[i];
                this.heap[i] = this.heap[Math.floor(i / 2)];
                this.heap[Math.floor(i / 2)] = tmp;
                i = Math.floor(i / 2);
            }
        }

        pop() {
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
    function buildGraph(edges) {
        let graph = {};
        edges.forEach(([u, v, w]) => {
            if (!(u in graph)) {
                graph[u] = [];
            }
            if (!(v in graph)) {
                graph[v] = [];
            }
            graph[u].push([v, w]);
            graph[v].push([u, w]);
        });

        return graph;
    }

    let graph = buildGraph(edges);
    let a = [];
    let min = n;
    let res = -1;
    for (let i = 0; i < n; i++) {
        const h = new Heap();
        let shortest = {};
        h.push([i, 0]);
        while (h.heap[1] !== undefined) {
            let [n1, w1] = h.pop();
            if (n1 in shortest) {
                continue;
            }
            shortest[n1] = w1;
            if (graph[n1]) {
                for (let [n2, w2] of graph[n1]) {
                    if (w1 + w2 <= distanceThreshold) h.push([n2, w1 + w2]);
                }
            }
        }
        let length = Object.entries(shortest).length - 1;
        if (length <= min) {
            res = i;
            min = length;
        }
    }
    return res;
};
