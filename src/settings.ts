export interface MyPluginSettings {
	templateZettelkastenInbox: string;
    templateZettelkastenHub: string;
    pathHubs: string;
    pathZettelkastenInbox: string;
    pathZettelkasten: string;
    pathZettelkastenHubs: string;
    pathArchive: string;
}

export const DEFAULT_SETTINGS: MyPluginSettings = {
    templateZettelkastenInbox: "99 Utility/parazettel/zettelkasten.md",
    templateZettelkastenHub: "99 Utility/parazettel/zettelkasten_hub.md",
    pathHubs:  "00 MAPS OF CONTENT/00 Hubs",
    pathZettelkastenInbox: "11 INBOX",
    pathZettelkasten: "21 Zettelkasten",
    pathZettelkastenHubs: "22 NOTES",
    pathArchive: "81 ARCHIVE",
}