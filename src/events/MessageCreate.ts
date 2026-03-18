import { commands } from "$src/collectCommands.ts";
import { BotEvent } from "$src/types.ts";
import { Events, type Message, TextChannel } from "discord.js";

export const commandEvent = new BotEvent<Events.MessageCreate>({
  type: Events.MessageCreate,
  once: false,
  execute(message): void {
    if (!(message.channel instanceof TextChannel)) return;

    const newMessage = message as Message<true>;

    for (const command of commands) {
      if (command.match(newMessage)) command.execute(newMessage);
    }
  },
});
