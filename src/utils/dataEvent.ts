import { EventEmitter } from 'events';

export class DataEvent<T> {
  private emitter = new EventEmitter();

  /**
   * Sends a message by emitting a 'data' event.
   * @param data The message to send.
   */
  public send(data: T): void {
    this.emitter.emit('data', data);
  }

  /**
   * Receives the next message, waiting for one to arrive.
   * @returns A Promise that resolves with the next message.
   */
  public async receive(): Promise<T> {
    return new Promise<T>((resolve) => {
      this.emitter.once('data', (data: T) => {
        resolve(data);
      });
    });
  }

  /**
   * Receives the next message, waiting up to a specified timeout.
   * @param timeoutMs The maximum time (in milliseconds) to wait for a message.
   * @returns A Promise that resolves with the next message or rejects with a timeout error.
   */
  public async receiveWithWait(timeoutMs: number): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      const timeout = setTimeout(() => {
        this.emitter.off('data', onData); // Cleanup listener
        reject(new Error('Timeout: No message received within the specified time.'));
      }, timeoutMs);

      const onData = (data: T) => {
        clearTimeout(timeout); // Clear timeout if message arrives
        resolve(data);
      };

      this.emitter.once('data', onData); // Listen for a single message
    });
  }
}
