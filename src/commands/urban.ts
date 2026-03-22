import env from "$src/env.ts";
import { Command } from "$src/types.ts";
import { EmbedBuilder } from "discord.js";

export type UrbanDictionaryEntry = {
  author: string;
  current_vote: string;
  defid: number;
  definition: string;
  example: string;
  permalink: string;
  thumbs_down: number;
  thumbs_up: number;
  word: string;
  written_on: string;
};

export type UrbanDictionaryResponse = {
  list: UrbanDictionaryEntry[];
};

export const urban = new Command({
  name: "Urban Dictionary",
  command: /^.(ud|urban) (\d )?(\w+)$/,
  description: "Get the definition of a word from Urban Dictionary",
  showInHelp: true,
  match(message): boolean {
    return (
      Boolean(message.content.match(this.command)) &&
      message.content[0] === env.PREFIX
    );
  },
  async execute(message): Promise<void> {
    const word = message.content.split(" ").slice(1).join();

    if (!word) {
      await message.reply("geef dan ook een woord jij vage kennis");
      return;
    }

    const response = await fetch(
      `https://api.urbandictionary.com/v0/define?term=${word}`,
    );

    if (!response.ok) {
      await message.reply("Oopsie, something went wrong");
      return;
    }

    const responseData = (await response.json()) as UrbanDictionaryResponse;

    if (!(responseData.list && responseData.list[0])) {
      await message.reply("Definition not found :\\");
      return;
    }

    const embeddedData = responseData.list[0];

    const udEmbed = new EmbedBuilder()
      .setTitle(embeddedData.word)
      .setDescription(embeddedData.definition)
      .setURL(embeddedData.permalink)
      .setFooter({
        text:
          `By ${embeddedData.author}\n👍 ${embeddedData.thumbs_up} | 👎 ${embeddedData.thumbs_down}`,
      })
      .setThumbnail("https://cdn.elisaado.com/ud_logo.jpeg")
      .setColor(0xf2fd60);

    await message.reply({
      embeds: [udEmbed],
    });
  },
});
