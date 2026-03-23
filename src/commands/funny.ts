import { Command } from "$src/types.ts";
import { unwrap } from "$src/utils.ts";

const musicEntries: { songs: RegExp; artist: string }[] = [
  {
    songs: /(my favorite game)|(erase and rewind)/i,
    artist: "The Cardigans",
  },
  {
    songs: /(the pretender)/i,
    artist: "Foo Fighters",
  },
  {
    songs:
      /(lonely boy)|(tighten up)|(gold on the ceiling)|(little black submarines)|(fever)|(weight of love)/i,
    artist: "The Black Keys",
  },
  {
    songs: /(peliä)|(cha cha cha)|(punainen marli)/i,
    artist: "Käärijä",
  },
  {
    songs: /trafik/i,
    artist: "Käärijä en Joost Klein",
  },
  {
    songs: /ruoska/i,
    artist: "Käärijä en Erika Vikman",
  },
] as const;

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
      !message.author.bot
    );
  },
  async execute(message): Promise<void> {
    // nie schelde met kanker
    await message.member?.timeout(10000);
    await message.reply("nie schelden met kanker :(");
  },
});

export const liedje = new Command({
  name: "liedje",
  command: /.+/,
  description: "grappig (geen commando)",
  showInHelp: false,
  match(message): boolean {
    return (
      Boolean(
        musicEntries.find(({ songs }) => message.content.match(songs)),
      ) &&
      !message.author.bot
    );
  },
  async execute(message): Promise<void> {
    try {
      const { songs, artist } = unwrap(
        musicEntries.find(({ songs }) => message.content.match(songs)),
      );
      const song = unwrap(message.content.match(songs))[0];
      const replies = [
        `${song}??? is dit een ${artist} reference???`,
        `yoooo, ${song}!!! dat is ook een liedje van ${artist}`,
        `wow ${song} die is echt hard (van ${artist})`,
      ];
      await message.reply(replies[Math.floor(Math.random() * replies.length)]);
    } catch (error) {
      await message.reply("Oke wtf ik heb hoofdpijn");
      console.error(error);
    }
  },
});
