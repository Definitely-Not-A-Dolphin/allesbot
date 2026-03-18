import { Command } from "$src/types.ts";
import env from "$src/env.ts";

export const ping = new Command({
  name: "ping",
  command: "ping",
  description: "Replies with pong and the latency",
  showInHelp: true,
  match(message): boolean {
    return message.content === env.PREFIX + this.command;
  },
  async execute(message): Promise<void> {
    const diff = Date.now() - message.createdTimestamp;
    await message.reply(`Pong! Latency: ${diff}ms`);
  },
});

export const editPing = new Command({
  name: "editPing",
  command: /.editping/i,
  description: "Measures the latency by editing the message",
  showInHelp: true,
  match(message): boolean {
    return (
      Boolean(message.content.match(this.command)) &&
      message.content[0] === env.PREFIX
    );
  },
  async execute(message): Promise<void> {
    await message.channel.send("Pinging...").then((sent) => {
      const diff = Date.now() - sent.createdTimestamp;
      sent.edit(`Pong! Latency: ${diff}ms`);
    });
  },
});
