import env from "$src/env.ts";
import { Command } from "$src/types.ts";

export const yearprogress = new Command({
  name: "year progress",
  command: "yp",
  description: "hoe ver is het jaar",
  showInHelp: true,
  match(message): boolean {
    return message.content === env.PREFIX + this.command;
  },
  async execute(message): Promise<void> {
    const millisPerDay = 86400000;
    const date = new Date();
    const start = Date.UTC(date.getFullYear(), 0, 0);
    const end = Date.UTC(date.getFullYear() + 1, 0, 0);
    const currentDay =
      (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - start) /
      millisPerDay;
    const maxDay = (end - start) / millisPerDay;

    await message.reply(
      `We zijn al ysu **${((currentDay / maxDay) * 100).toFixed(
        1,
      )}%** in het jaar`,
    );
  },
});
