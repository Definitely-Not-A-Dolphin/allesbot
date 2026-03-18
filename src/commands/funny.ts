import { Command } from "$src/types.ts";
import { client } from "$src/client.ts";
import { unwrap } from "$src/utils.ts";

function randomReply(match: string, artist: string): string {
  const replies = [
    `${match}??? is dit een ${artist} reference???`,
    `yoooo, ${match}!!! dat is ook een liedje van ${artist}`,
    `wow ${match} die is echt hard (van ${artist})`,
  ];

  return replies[Math.floor(Math.random() * replies.length)];
}

export const funny = new Command({
  name: "funny",
  command:
    /^(pr dan)|((alles is stuk)|(stomme bot)|(alles( )?bot is stom)|(ik haat alles( )?bot)|(waarom kan alles( )?bot (.*) niet))$/i,
  description: "grappig (geen commando)",
  showInHelp: false,
  match(message): boolean {
    return Boolean(message.content.match(this.command));
  },
  async execute(message): Promise<void> {
    if (
      message.content === "pr dan" &&
      message.reference &&
      message.reference.messageId
    ) {
      const referencedMessage = await message.channel.messages.fetch(
        message.reference.messageId,
      );

      message = referencedMessage;
    }

    await message.reply(
      "maak een pr dan :) <https://github.com/elisaado/allesbot>",
    );
  },
});

export const antiScheld = new Command({
  name: "anti-scheld",
  command: /kanker/i,
  description: "niet schelden met kanker :(",
  showInHelp: false,
  match(message): boolean {
    return (
      Boolean(message.content.match(this.command)) &&
      message.author.id !== client.user.id
    );
  },
  async execute(message): Promise<void> {
    // nie schelde met kanker
    await message.member?.timeout(10000);
    await message.reply("nie schelden met kanker :(");
  },
});

export const liedje1 = new Command({
  name: "liedje",
  command: /(my favorite game)|(erase and rewind)/i,
  description: "grappig (geen commando)",
  showInHelp: false,
  match(message): boolean {
    return (
      Boolean(message.content.match(this.command)) &&
      message.author.id !== client.user.id
    );
  },
  async execute(message): Promise<void> {
    const match = unwrap(message.content.match(this.command))[0];
    await message.reply(randomReply(match, "The Cardigans"));
  },
});

export const liedje2 = new Command({
  name: "liedje",
  command: /(the pretender)/i,
  description: "grappig (geen commando)",
  showInHelp: false,
  match(message): boolean {
    return (
      Boolean(message.content.match(this.command)) &&
      message.author.id !== client.user.id
    );
  },
  async execute(message): Promise<void> {
    const match = unwrap(message.content.match(this.command))[0];
    await message.reply(randomReply(match, "Foo fighters"));
  },
});

export const liedje3 = new Command({
  name: "liedje",
  command:
    /(lonely boy)|(tighten up)|(gold on the ceiling)|(little black submarines)|(fever)|(weight of love)/i,
  description: "grappig (geen commando)",
  showInHelp: false,
  match(message): boolean {
    return (
      Boolean(message.content.match(this.command)) &&
      message.author.id !== client.user.id
    );
  },
  async execute(message): Promise<void> {
    const match = unwrap(message.content.match(this.command))[0];
    await message.reply(randomReply(match, "The Black Keys"));
  },
});
