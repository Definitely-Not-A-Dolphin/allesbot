import type { ClientEvents, Message } from "discord.js";

export class Command {
  name: string;
  command: string | RegExp;
  description: string;
  showInHelp: boolean;
  match: (message: Message<true>) => boolean;
  execute: (message: Message<true>) => MaybePromiseVoid;

  constructor(obj: Command) {
    this.name = obj.name;
    this.command = obj.command;
    this.description = obj.description;
    this.showInHelp = obj.showInHelp;
    this.match = obj.match;
    this.execute = obj.execute;
  }
}

export class BotEvent<T extends keyof ClientEvents> {
  type: T;
  once: boolean;
  execute: (...args: ClientEvents[T]) => void;

  constructor(obj: BotEvent<T>) {
    this.type = obj.type;
    this.once = obj.once;
    this.execute = obj.execute;
  }
}

export type MaybePromiseVoid = void | Promise<void>;
