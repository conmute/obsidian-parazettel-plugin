import { PluginSettingTab, Setting, App } from 'obsidian';
import { MyPlugin } from '@/src/plugin';

export class SampleSettingTab extends PluginSettingTab {
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
