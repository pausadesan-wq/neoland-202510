class Collection {
    constructor() {
        this.count = 0
    }

    add(item) {
        this[this.count] = item
        this.count++
    }

    remove(item) {
        for (var i = 0; i < this.count; i++)
            if (this[i] === item)
                delete this[i]
    }

    removeFirst(item) {
        for (var i = 0; i < this.count; i++)
            if (this[i] === item) {
                delete this[i]

                return
            }
    }

    update(target, replacement) {
        for (var i = 0; i < this.count; i++)
            if (this[i] === target)
                this[i] = replacement
    }

    updateFirst(target, replacement) {
        for (var i = 0; i < this.count; i++)
            if (this[i] === target) {
                this[i] = replacement

                return
            }
    }

    push(item) {
        this[this.count] = item
        this.count++

        return this.count
    }

    pop() {
        const lastItem = this[this.count - 1]
        delete this[this.count - 1]
        this.count--

        return lastItem
    }

    shift() {
        const firstItem = this[0]

        for (let i = 1; i < this.count; i++) {
            const item = this[i]

            this[i - 1] = item
        }

        this.count--

        delete this[this.count]

        return firstItem
    }

    includes(searchItem, fromIndex) {
        if (fromIndex === undefined) fromIndex = 0

        for (let i = fromIndex; i < this.count; i++) {
            const item = this[i]

            if (item === searchItem) return true
        }

        return false
    }

    forEach(callback) {
        for (let i = 0; i < this.count; i++) {
            const element = this[i]

            callback(element)
        }
    }
}