export class Counter {
  private iterator
  constructor() {
    this.iterator = this.generator(0)
  }

  *generator(count: number): IterableIterator<number> {
    while (true) yield count++
  }

  issueUniqueNumber() {
    return this.iterator.next().value
  }
}

const globalCounter = new Counter()

export function issueGlobalUniqueNumber() {
  return globalCounter.issueUniqueNumber()
}
