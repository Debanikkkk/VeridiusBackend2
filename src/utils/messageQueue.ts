import { EventEmitter } from 'events';

export class MessageQueue<T> {
  private queue: T[] = [];
  private emitter = new EventEmitter();

  // Add a message to the queue
  public enqueue(data: T): void {
    this.queue.push(data);
    this.emitter.emit('data');
  }

  // Dequeue a message immediately or wait if empty
  public async dequeue(): Promise<T> {
    if (this.queue.length > 0) {
      return this.queue.shift()!;
    }

    return new Promise<T>((resolve) => {
      this.emitter.once('data', () => {
        resolve(this.queue.shift()!);
      });
    });
  }

  // Dequeue a message with a maximum wait time
  public async dequeueWithWait(timeoutMs: number): Promise<T | null> {
    if (this.queue.length > 0) {
      return this.queue.shift()!;
    }

    return new Promise<T | null>((resolve, reject) => {
      const timeout = setTimeout(() => {
        this.emitter.off('data', onData); // Remove listener to avoid memory leaks
        reject(new Error('Timeout'));
      }, timeoutMs);

      const onData = () => {
        clearTimeout(timeout); // Clear timeout if data is received
        resolve(this.queue.shift()!);
      };

      this.emitter.once('data', onData);
    });
  }
}
