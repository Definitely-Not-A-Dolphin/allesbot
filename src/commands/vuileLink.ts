import { client } from "$src/client.ts";
import { Command } from "$src/types.ts";
// thank you for the list, https://stackoverflow.com/questions/76372936/what-is-the-most-efficient-way-to-remove-tracking-marketing-etc-query-parameter
import badKeys from "$static/badKeys.json" with { type: "json" };

export const vuileLink = new Command({
  name: "vuileLink",
  command:
    /(https?:\/\/)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&\/\/="'!]*)/,
  description: "maakt links schoon (geen commando)",
  showInHelp: false,
  match(message): boolean {
    return (
      Boolean(message.content.match(this.command)) &&
      message.author.id !== client.user.id
    );
  },
  async execute(message): Promise<void> {
    const urlsInMessage = message.content.match(this.command);

    if (!urlsInMessage) return;

    const schoneLinkjes: string[] = [];

    for (const urlInMessage of urlsInMessage) {
      const parsedUrl = URL.parse(urlInMessage);
      if (!parsedUrl) continue;

      // we can't delete because the for loop internally keeps an index which will shift we we delete
      const toDelete: string[] = [];
      for (const key of parsedUrl.searchParams.keys()) {
        if (badKeys.includes(key)) toDelete.push(key);
      }

      if (toDelete.length === 0) continue;

      for (const badKey of toDelete) parsedUrl.searchParams.delete(badKey);

      schoneLinkjes.push(parsedUrl.toString());
    }

    let replyMessage = "jij bent VIES en je stomme linkje";

    if (schoneLinkjes.length === 1) {
      replyMessage += ` ook! Hier is een schone versie: <${schoneLinkjes[0]}>`;
    } else {
      replyMessage += "s ook! Hier zijn de schone versies:";
      for (const schoneLink of schoneLinkjes) {
        replyMessage += ` <${schoneLink}>,`;
      }
      replyMessage = replyMessage.slice(0, -1);
    }

    await message.reply(replyMessage);
  },
});
