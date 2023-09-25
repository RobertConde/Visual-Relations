export class Set<T> {
    readonly elements: T[] = [];

    constructor(listElements: T[] = []) {
        for (const x of listElements) {
            if (!this.contains(x))
                this.elements.push(x);
        }
    }

    toString(): string {
        return `{${this.elements.map(x => {
            // @ts-ignore
            if(x.map)
                { // @ts-ignore
                    return `[${x.toString()}]`;
                }
            // @ts-ignore
            return x.toString();
        }).join(', ')}}`;
    }

    contains(X: T): boolean {
        return this.elements.some(x => x === X);
    }

    get size() {
        return this.elements.length
    };

    intersect(B: Set<T>): Set<T> {
        return new Set(
            this.elements.filter(a => B.contains(a))
        );
    }

    union(B: Set<T>): Set<T> {
        return new Set([...this.elements, ...B.elements]);
    }

    difference(B: Set<T>): Set<T> {
        return new Set(
            this.elements.filter(a => !B.contains(a))
        );
    }

    symmetric_difference(B: Set<T>): Set<T> {
        return this.union(B).difference(this.intersect(B));
    }

    complement(universe: Set<T>): Set<T> {
        // Complement of A with respect to the universe U.
        return universe.difference(this);
    }

    cartesian_product(B: Set<T>): Set<[T, T]> {
        const product: [T, T][] = [];
        for (const a of this.elements)
            for (const b of B.elements)
                product.push([a, b]);
        return new Set(product);
    }

    power_set(): Set<Set<T>> {
        // LINK: https://stackoverflow.com/questions/42773836/how-to-find-all-subsets-of-a-set-in-javascript-powerset-of-array
        const getAllSubarrays =
            (arr: T[]) => arr.reduce(
                (subArrays: T[][], val: T) => subArrays.concat(
                    subArrays.map((subArr: T[]) => [...subArr, val])
                ),
                [[]]
            );

        const subsets: Set<T>[] = getAllSubarrays(this.elements)
            .map(subArr => new Set(subArr));
        return new Set(subsets);
    }
}
