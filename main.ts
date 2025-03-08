import {
	App,
	Editor,
	MarkdownView,
	Modal,
	Notice,
	Plugin,
	PluginSettingTab,
	Setting,
	type TFile 
} from 'obsidian';
import moment from 'moment';
import _ from 'lodash';

// Remember to rename these classes and interfaces!

interface MyPluginSettings {
	templateZettelkastenInbox: string;
    templateZettelkastenHub: string;
    pathHubs: string;
    pathZettelkastenInbox: string;
    pathZettelkasten: string;
    pathZettelkastenHubs: string;
    pathArchive: string;
}

const DEFAULT_SETTINGS: MyPluginSettings = {
    templateZettelkastenInbox: "99 Utility/parazettel/zettelkasten.md",
    templateZettelkastenHub: "99 Utility/parazettel/zettelkasten_hub.md",
    pathHubs:  "00 MAPS OF CONTENT/00 Hubs",
    pathZettelkastenInbox: "11 INBOX",
    pathZettelkasten: "21 Zettelkasten",
    pathZettelkastenHubs: "22 NOTES",
    pathArchive: "81 ARCHIVE",
}

export default class MyPlugin extends Plugin {
	settings: MyPluginSettings;

	async onload() {
		console.log("HERE")
		await this.loadSettings();

		// This creates an icon in the left ribbon.
		const ribbonIconEl = this.addRibbonIcon('dice', 'Sample Plugin', (evt: MouseEvent) => {
			// Called when the user clicks the icon.
			new Notice('This is a notice!');
		});
		// Perform additional things with the ribbon
		ribbonIconEl.addClass('my-plugin-ribbon-class');

		// This adds a status bar item to the bottom of the app. Does not work on mobile apps.
		const statusBarItemEl = this.addStatusBarItem();
		statusBarItemEl.setText('Status Bar Text');

		// This adds a simple command that can be triggered anywhere
		this.addCommand({
			id: 'open-sample-modal-simple',
			name: 'Open sample modal (simple)',
			callback: () => {
				new SampleModal(this.app, this).open();
			}
		});
		// This adds an editor command that can perform some operation on the current editor instance
		this.addCommand({
			id: 'sample-editor-command',
			name: 'Sample editor command',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				console.log(editor.getSelection());
				editor.replaceSelection('Sample Editor Command');
			}
		});
		// This adds a complex command that can check whether the current state of the app allows execution of the command
		this.addCommand({
			id: 'open-sample-modal-complex',
			name: 'Open sample modal (complex)',
			checkCallback: (checking: boolean) => {
				// Conditions to check
				const markdownView = this.app.workspace.getActiveViewOfType(MarkdownView);
				if (markdownView) {
					// If checking is true, we're simply "checking" if the command can be run.
					// If checking is false, then we want to actually perform the operation.
					if (!checking) {
						new SampleModal(this.app, this).open();
					}

					// This command will only show up in Command Palette when the check function returns true
					return true;
				}
			}
		});

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new SampleSettingTab(this.app, this));

		// If the plugin hooks up any global DOM events (on parts of the app that doesn't belong to this plugin)
		// Using this function will automatically remove the event listener when this plugin is disabled.
		this.registerDomEvent(document, 'click', (evt: MouseEvent) => {
			console.log('click', evt);
		});

		// When registering intervals, this function will automatically clear the interval when the plugin is disabled.
		this.registerInterval(window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000));
	}

	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

    async createFileWithTitle(title: string, createFolderNote: boolean) {
        const sanitizedTitle = title.replace(/[^a-zA-Z0-9_-]/g, '');
        const dateStr = moment().format('YYYYMMDD');
		const id = `${dateStr}_${sanitizedTitle}`;
        const filename = `${id}.md`;
		const filePath = createFolderNote
			? `${this.settings.pathZettelkastenInbox}/${id}/${filename}`
			: `${this.settings.pathZettelkastenInbox}/${filename}`;

        try {
            const templateContent = await this.app.vault.read(await this.app.vault.getAbstractFileByPath(this.settings.templateZettelkastenInbox) as TFile);
            const template = _.template(templateContent);
            const renderedContent = template({ 
                file: {
					filename,
                    title,
                    path: filePath,
					date: moment().format('YYYY-MM-DD HH:mm:ss'),
                },
				id,
                moment: moment,
            });

			if (createFolderNote) {
				await this.app.vault.createFolder(`${this.settings.pathZettelkastenInbox}/${id}`);
			}

            const file = await this.app.vault.create(filePath, renderedContent);
            const leaf = this.app.workspace.getLeaf(true);
            await leaf.openFile(file);
        } catch (error) {
            new Notice('Failed to create file');
            console.error(error);
        }
    }
}

class SampleModal extends Modal {
	plugin: MyPlugin;
	constructor(app: App, plugin: MyPlugin) {
		super(app);
        this.plugin = plugin;
	}

    onOpen() {
        const {contentEl} = this;
        contentEl.createEl('h2', {text: 'Note Title'});
		contentEl.addClass('pz-modal-container');

        const inputEl = contentEl.createEl('input', {type: 'text'});
        inputEl.addClass('pz-title-input');

        const checkboxContainer = contentEl.createDiv({ cls: 'pz-checkbox-container' });
        const checkboxEl = checkboxContainer.createEl('input', {type: 'checkbox'});
        checkboxEl.addClass('pz-folder-note-checkbox');
        checkboxContainer.createEl('label', {text: 'Create folder note'}).prepend(checkboxEl);

        const submitButton = contentEl.createEl('button', {text: 'Submit'});
		submitButton.addClass('pz-submit-button');
        const submitHandler = async () => {
            const title = inputEl.value;
            const createFolderNote = checkboxEl.checked;
            await this.plugin.createFileWithTitle(title, createFolderNote);
            this.close();
        };

        submitButton.addEventListener('click', submitHandler);
        inputEl.addEventListener('keypress', async (event) => {
            if (event.key === 'Enter') {
                await submitHandler();
            }
        });
    }

	onClose() {
		const {contentEl} = this;
		contentEl.empty();
	}
}

class SampleSettingTab extends PluginSettingTab {
	plugin: MyPlugin;

	constructor(app: App, plugin: MyPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName('Zettelkasten Inbox Path')
			.setDesc('Create new zettels in this folder')
			.addText(text => text
				.setPlaceholder('Put a path here with / delimiter')
				.setValue(this.plugin.settings.pathZettelkastenInbox)
				.onChange(async (value) => {
					this.plugin.settings.pathZettelkastenInbox = value;
					await this.plugin.saveSettings();
				}));
		
		new Setting(containerEl)
			.setName('Zettelkasten Inbox Template File')
			.setDesc('Template file which will be used as base each time')
			.addText(text => text
				.setPlaceholder('Put a path here with / delimiter to the template')
				.setValue(this.plugin.settings.templateZettelkastenInbox)
				.onChange(async (value) => {
					this.plugin.settings.templateZettelkastenInbox = value;
					await this.plugin.saveSettings();
				}));
	}
}
